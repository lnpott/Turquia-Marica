import process from 'node:process'
import { Buffer } from 'node:buffer'
import { createClient } from '@supabase/supabase-js'
import { validateOrderPayload } from './lib/orderPayload.js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

const ERRORS = {
  INVALID_JSON: [400, 'JSON inválido.'],
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

async function readBody(request) {
  if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body)) {
    return request.body
  }
  if (typeof request.body === 'string' && request.body.length > 0) {
    try {
      return JSON.parse(request.body)
    } catch {
      return null
    }
  }
  if (typeof request.json === 'function') {
    try {
      return await request.json()
    } catch {
      return null
    }
  }
  return {}
}

function mapRpcError(error) {
  const text = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''}`
  const business = Object.keys(ERRORS).find((key) => key !== 'INVALID_JSON' && text.includes(key))
  if (business) {
    const [status, message] = ERRORS[business]
    return { status, message, reason: business, pgCode: error?.code || null }
  }

  if (/permission denied/i.test(text) || error?.code === '42501') {
    return {
      status: 503,
      message: 'Sem permissão para gravar pedido. Confira SUPABASE_SERVICE_ROLE_KEY e o GRANT da RPC create_order.',
      reason: 'RPC_PERMISSION_DENIED',
      pgCode: error?.code || null,
    }
  }

  if (/Could not find the function/i.test(text) || /schema cache/i.test(text) || error?.code === 'PGRST202') {
    return {
      status: 503,
      message: 'RPC create_order ausente ou fora do schema cache. Aplique a migration no Supabase e recarregue o schema.',
      reason: 'RPC_NOT_FOUND',
      pgCode: error?.code || null,
    }
  }

  if (/Invalid API key|JWT|expired/i.test(text)) {
    return {
      status: 503,
      message: 'Chave do Supabase inválida no servidor. Confira SUPABASE_SERVICE_ROLE_KEY na Vercel.',
      reason: 'INVALID_SERVICE_KEY',
      pgCode: error?.code || null,
    }
  }

  return {
    status: 500,
    message: 'Não foi possível gravar o pedido.',
    reason: 'RPC_FAILED',
    pgCode: error?.code || null,
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: 'METHOD_NOT_ALLOWED' })
  }

  if (!supabaseUrl || !supabaseServiceRole) {
    return sendJson(response, 503, { error: 'SUPABASE_NOT_CONFIGURED', reason: 'MISSING_ENV' })
  }

  const body = await readBody(request)
  if (body == null) {
    const [status, message] = ERRORS.INVALID_JSON
    return sendJson(response, status, { error: 'ORDER_REJECTED', message, reason: 'INVALID_JSON' })
  }

  const checked = validateOrderPayload(body)
  if (!checked.ok) {
    const [status, message] = ERRORS[checked.code] || [400, 'Pedido inválido.']
    return sendJson(response, status, {
      error: 'ORDER_REJECTED',
      message,
      reason: checked.code,
    })
  }

  const supabaseServer = createClient(supabaseUrl, supabaseServiceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabaseServer.rpc('create_order', { payload: checked.payload })

  if (error) {
    const mapped = mapRpcError(error)
    return sendJson(response, mapped.status, {
      error: 'ORDER_REJECTED',
      message: mapped.message,
      reason: mapped.reason,
      pgCode: mapped.pgCode,
    })
  }

  const result = typeof data === 'string' ? JSON.parse(data) : data

  const items = Array.isArray(result?.items)
    ? result.items.map((item) => ({
        productId: item.product_id,
        name: item.product_name,
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
        lineCents: item.total_price_cents,
      }))
    : []

  return sendJson(response, result?.replay ? 200 : 201, {
    success: true,
    replay: Boolean(result?.replay),
    orderId: result.orderId,
    orderNumber: result.orderNumber,
    subtotalCents: result.subtotalCents,
    deliveryFeeCents: result.deliveryFeeCents,
    totalCents: result.totalCents,
    createdAt: result.createdAt,
    items,
  })
}
