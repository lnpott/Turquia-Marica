import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

function sendJson(response, statusCode, payload) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  return response.status(statusCode).json(payload)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: 'METHOD_NOT_ALLOWED' })
  }

  if (!supabaseUrl || !supabaseServiceRole) {
    return sendJson(response, 503, { error: 'SUPABASE_NOT_CONFIGURED' })
  }

  const supabaseServer = createClient(supabaseUrl, supabaseServiceRole)

  const {
    customerName,
    customerPhone,
    deliveryAddress,
    deliveryReference,
    deliveryRadiusKm,
    paymentMethod,
    paymentChangeFor,
    notes,
    items,
  } = request.body || {}

  // 1. Validação dos campos obrigatórios
  if (!customerName || !customerPhone || !deliveryAddress || !deliveryReference) {
    return sendJson(response, 400, {
      error: 'MISSING_CUSTOMER_FIELDS',
      message: 'Nome, Telefone, Endereço e Ponto de referência são obrigatórios.',
    })
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return sendJson(response, 400, {
      error: 'EMPTY_CART',
      message: 'A sacola de pedidos não pode estar vazia.',
    })
  }

  const validPayments = ['card_delivery', 'cash_delivery', 'pix_delivery']
  if (!paymentMethod || !validPayments.includes(paymentMethod)) {
    return sendJson(response, 400, {
      error: 'INVALID_PAYMENT_METHOD',
      message: 'Forma de pagamento inválida.',
    })
  }

  try {
    // 2. Consulta autoritativa no banco dos produtos solicitados
    const productIds = items.map((i) => i.productId)
    const { data: dbProducts, error: prodError } = await supabaseServer
      .from('products')
      .select('id, name, price_cents, status')
      .in('id', productIds)

    if (prodError || !dbProducts) {
      return sendJson(response, 500, { error: 'FAILED_TO_FETCH_PRODUCTS' })
    }

    const productsMap = new Map(dbProducts.map((p) => [p.id, p]))

    let subtotalCents = 0
    const snapshotItems = []

    for (const item of items) {
      const dbProd = productsMap.get(item.productId)
      if (!dbProd || dbProd.status !== 'active') {
        return sendJson(response, 400, {
          error: 'PRODUCT_UNAVAILABLE',
          message: `O produto ${item.name || item.productId} não está disponível.`,
        })
      }

      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1)
      const unitPriceCents = dbProd.price_cents
      const totalItemPriceCents = unitPriceCents * quantity

      subtotalCents += totalItemPriceCents

      snapshotItems.push({
        product_id: dbProd.id,
        product_name: dbProd.name,
        unit_price_cents: unitPriceCents,
        quantity,
        total_price_cents: totalItemPriceCents,
        selected_options: item.options || [],
      })
    }

    // 3. Cálculo autoritativo da taxa de entrega
    let deliveryFeeCents = 500 // fallback até 3km
    if (deliveryRadiusKm != null) {
      const radius = parseFloat(deliveryRadiusKm)
      const { data: zones } = await supabaseServer
        .from('delivery_zones')
        .select('*')
        .eq('active', true)
        .order('max_radius_km', { ascending: true })

      if (zones && zones.length > 0) {
        const matched = zones.find((z) => radius <= Number(z.max_radius_km))
        if (!matched) {
          return sendJson(response, 400, {
            error: 'OUT_OF_DELIVERY_RADIUS',
            message: 'O endereço informado está fora do raio de entrega atendido.',
          })
        }
        deliveryFeeCents = matched.fee_cents
      }
    }

    const totalCents = subtotalCents + deliveryFeeCents

    // 4. Criação atômica do pedido
    const { data: newOrder, error: orderError } = await supabaseServer
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        delivery_reference: deliveryReference,
        delivery_radius_km: deliveryRadiusKm || null,
        delivery_fee_cents: deliveryFeeCents,
        subtotal_cents: subtotalCents,
        total_cents: totalCents,
        payment_method: paymentMethod,
        payment_change_for: paymentChangeFor || null,
        notes: notes || null,
        status: 'pending',
      })
      .select('id, order_number, created_at')
      .single()

    if (orderError || !newOrder) {
      return sendJson(response, 500, {
        error: 'ORDER_CREATION_FAILED',
        details: orderError?.message,
      })
    }

    // 5. Inserção dos itens do pedido vinculados
    const itemsToInsert = snapshotItems.map((si) => ({
      ...si,
      order_id: newOrder.id,
    }))

    const { error: itemsError } = await supabaseServer
      .from('order_items')
      .insert(itemsToInsert)

    if (itemsError) {
      // Rollback se falhar
      await supabaseServer.from('orders').delete().eq('id', newOrder.id)
      return sendJson(response, 500, { error: 'ORDER_ITEMS_CREATION_FAILED' })
    }

    return sendJson(response, 201, {
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.order_number,
      subtotalCents,
      deliveryFeeCents,
      totalCents,
      createdAt: newOrder.created_at,
    })
  } catch (err) {
    return sendJson(response, 500, { error: 'SERVER_ERROR', message: err.message })
  }
}
