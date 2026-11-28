import process from 'node:process'
import { Buffer } from 'node:buffer'
import { timingSafeEqual } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

/** Remove BOM (U+FEFF) e espaços de env vars — evita TypeError ByteString. */
function cleanEnv(value) {
  if (typeof value !== 'string') return value
  return value.replace(/^\uFEFF/, '').trim()
}

const supabaseUrl = cleanEnv(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL)
const supabaseServiceRole = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY)
const adminToken = cleanEnv(process.env.ADMIN_TOKEN)

function sendJson(response, statusCode, payload) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  return response.status(statusCode).json(payload)
}

/** Compara o Bearer com ADMIN_TOKEN sem vazar tamanho via early-return óbvio. */
function isValidAdminToken(provided) {
  if (!adminToken || typeof provided !== 'string' || provided.length === 0) return false
  const expected = Buffer.from(adminToken)
  const actual = Buffer.from(provided)
  if (expected.length !== actual.length) {
    // Mantém trabalho similar em tamanho errado
    timingSafeEqual(expected, expected)
    return false
  }
  return timingSafeEqual(expected, actual)
}

export default async function handler(request, response) {
  if (!supabaseUrl || !supabaseServiceRole) {
    return sendJson(response, 503, { error: 'SUPABASE_NOT_CONFIGURED' })
  }

  if (!adminToken) {
    return sendJson(response, 503, { error: 'ADMIN_TOKEN_NOT_CONFIGURED' })
  }

  const authHeader = request.headers.authorization || ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()

  if (!isValidAdminToken(token)) {
    return sendJson(response, 401, { error: 'UNAUTHORIZED' })
  }

  // Service role só depois da autenticação. O Bearer do cliente NUNCA é a service role.
  const supabaseServer = createClient(supabaseUrl, supabaseServiceRole)

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
      return sendJson(response, 500, {
        error: 'FETCH_FAILED',
        ordersMessage: ordersErr?.message || null,
        productsMessage: prodErr?.message || null,
        ordersCode: ordersErr?.code || null,
        productsCode: prodErr?.code || null,
      })
    }

    return sendJson(response, 200, { orders, products })
  }

  if (request.method === 'PATCH') {
    const { entity, id, updates } = request.body || {}

    if (entity === 'product' && id && updates) {
      const allowed = {}
      if (updates.price_cents != null) allowed.price_cents = Math.max(0, parseInt(updates.price_cents, 10))
      if (updates.status) allowed.status = updates.status

      if (Object.keys(allowed).length === 0) {
        return sendJson(response, 400, { error: 'INVALID_PATCH_REQUEST' })
      }

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

      if (Object.keys(allowed).length === 0) {
        return sendJson(response, 400, { error: 'INVALID_PATCH_REQUEST' })
      }

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
