import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

const ERRORS = {
  INVALID_IDEMPOTENCY_KEY: [400, 'Identificador do pedido inválido.'],
  MISSING_CUSTOMER_FIELDS: [400, 'Nome, telefone, endereço e referência são obrigatórios.'],
  INVALID_PAYMENT_METHOD: [400, 'Forma de pagamento inválida.'],
  EMPTY_CART: [400, 'A sacola não pode estar vazia.'],
  INVALID_QUANTITY: [400, 'Quantidade inválida.'],
  DELIVERY_ZONE_UNAVAILABLE: [400, 'A zona de entrega não está ativa.'],
  PRODUCT_UNAVAILABLE: [400, 'Um produto da sacola não está disponível.'],
  OPTION_UNAVAILABLE: [400, 'Um opcional da sacola não está disponível.'],
  INVALID_OPTIONS: [400, 'Opcionais inválidos.'],
}

function sendJson(response, statusCode, payload) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  return response.status(statusCode).json(payload)
}

function mapRpcError(error) {
  const text = `${error?.message || ''} ${error?.details || ''}`
  const code = Object.keys(ERRORS).find((key) => text.includes(key))
  if (!code) return [500, 'Não foi possível gravar o pedido.']
  return ERRORS[code]
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: 'METHOD_NOT_ALLOWED' })
  }

  if (!supabaseUrl || !supabaseServiceRole) {
    return sendJson(response, 503, { error: 'SUPABASE_NOT_CONFIGURED' })
  }

  const body = request.body || {}
  const payload = {
    idempotencyKey: body.idempotencyKey,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    deliveryAddress: body.deliveryAddress,
    deliveryReference: body.deliveryReference,
    zoneId: body.zoneId,
    paymentMethod: body.paymentMethod,
    paymentChangeFor: body.paymentChangeFor || null,
    notes: body.notes || null,
    items: Array.isArray(body.items)
      ? body.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          optionIds: Array.isArray(item.optionIds) ? item.optionIds : [],
        }))
      : [],
  }

  const supabaseServer = createClient(supabaseUrl, supabaseServiceRole)
  const { data, error } = await supabaseServer.rpc('create_order', { payload })

  if (error) {
    const [status, message] = mapRpcError(error)
    return sendJson(response, status, { error: 'ORDER_REJECTED', message })
  }

  const items = Array.isArray(data?.items)
    ? data.items.map((item) => ({
        productId: item.product_id,
        name: item.product_name,
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
        lineCents: item.total_price_cents,
      }))
    : []

  return sendJson(response, data?.replay ? 200 : 201, {
    success: true,
    replay: Boolean(data?.replay),
    orderId: data.orderId,
    orderNumber: data.orderNumber,
    subtotalCents: data.subtotalCents,
    deliveryFeeCents: data.deliveryFeeCents,
    totalCents: data.totalCents,
    createdAt: data.createdAt,
    items,
  })
}
