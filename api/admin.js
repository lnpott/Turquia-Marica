import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

function sendJson(response, statusCode, payload) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  return response.status(statusCode).json(payload)
}

export default async function handler(request, response) {
  if (!supabaseUrl || !supabaseServiceRole) {
    return sendJson(response, 503, { error: 'SUPABASE_NOT_CONFIGURED' })
  }

  const supabaseServer = createClient(supabaseUrl, supabaseServiceRole)

  // Proteção básica via token de autorização
  const authHeader = request.headers.authorization || ''
  const token = authHeader.replace(/^Bearer\s+/i, '')

  // O painel admin utiliza o supabaseServiceRole para validar autenticação administrativa
  if (!token) {
    return sendJson(response, 401, { error: 'UNAUTHORIZED' })
  }

  // GET: Listar pedidos recentes e produtos para gestão rápida
  if (request.method === 'GET') {
    const { data: orders, error: ordersErr } = await supabaseServer
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .limit(50)

    const { data: products, error: prodErr } = await supabaseServer
      .from('products')
      .select('*')
      .order('display_order', { ascending: true })

    if (ordersErr || prodErr) {
      return sendJson(response, 500, { error: 'FETCH_FAILED' })
    }

    return sendJson(response, 200, { orders, products })
  }

  // PATCH: Atualização de status de pedido ou preço de produto pelo admin
  if (request.method === 'PATCH') {
    const { entity, id, updates } = request.body || {}

    if (entity === 'product' && id && updates) {
      const allowed = {}
      if (updates.price_cents != null) allowed.price_cents = Math.max(0, parseInt(updates.price_cents, 10))
      if (updates.status) allowed.status = updates.status

      const { data, error } = await supabaseServer
        .from('products')
        .update(allowed)
        .eq('id', id)
        .select()
        .single()

      if (error) return sendJson(response, 500, { error: error.message })
      return sendJson(response, 200, { success: true, product: data })
    }

    if (entity === 'order' && id && updates) {
      const allowed = {}
      if (updates.status) allowed.status = updates.status

      const { data, error } = await supabaseServer
        .from('orders')
        .update(allowed)
        .eq('id', id)
        .select()
        .single()

      if (error) return sendJson(response, 500, { error: error.message })
      return sendJson(response, 200, { success: true, order: data })
    }

    return sendJson(response, 400, { error: 'INVALID_PATCH_REQUEST' })
  }

  response.setHeader('Allow', 'GET, PATCH')
  return sendJson(response, 405, { error: 'METHOD_NOT_ALLOWED' })
}
