const PAYMENTS = new Set(['card_delivery', 'cash_delivery', 'pix_delivery'])

/**
 * Valida e normaliza o body de POST /api/orders antes da RPC.
 * Não confia em preço enviado pelo cliente.
 */
export function validateOrderPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, code: 'INVALID_JSON' }
  }

  const idempotencyKey = typeof body.idempotencyKey === 'string' ? body.idempotencyKey.trim() : ''
  if (!idempotencyKey || idempotencyKey.length < 8 || idempotencyKey.length > 80) {
    return { ok: false, code: 'INVALID_IDEMPOTENCY_KEY' }
  }

  const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : ''
  const customerPhone = typeof body.customerPhone === 'string' ? body.customerPhone.trim() : ''
  const deliveryAddress = typeof body.deliveryAddress === 'string' ? body.deliveryAddress.trim() : ''
  const deliveryReference = typeof body.deliveryReference === 'string' ? body.deliveryReference.trim() : ''

  if (
    customerName.length < 2 || customerName.length > 120 ||
    customerPhone.length < 8 || customerPhone.length > 20 ||
    deliveryAddress.length < 5 || deliveryAddress.length > 240 ||
    deliveryReference.length < 2 || deliveryReference.length > 160
  ) {
    return { ok: false, code: 'MISSING_CUSTOMER_FIELDS' }
  }

  if (!PAYMENTS.has(body.paymentMethod)) {
    return { ok: false, code: 'INVALID_PAYMENT_METHOD' }
  }

  const zoneId = typeof body.zoneId === 'string' ? body.zoneId.trim() : ''
  if (!zoneId) {
    return { ok: false, code: 'DELIVERY_ZONE_UNAVAILABLE' }
  }

  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) {
    return { ok: false, code: 'EMPTY_CART' }
  }

  const items = []
  for (const item of body.items) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, code: 'PRODUCT_UNAVAILABLE' }
    }

    const productId = typeof item.productId === 'string' ? item.productId.trim() : ''
    if (!productId) return { ok: false, code: 'PRODUCT_UNAVAILABLE' }

    const quantity = Number(item.quantity)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return { ok: false, code: 'INVALID_QUANTITY' }
    }

    if (item.optionIds != null && !Array.isArray(item.optionIds)) {
      return { ok: false, code: 'INVALID_OPTIONS' }
    }

    const optionIds = (item.optionIds ?? []).map((id) => (
      typeof id === 'string' ? id.trim() : ''
    ))
    if (optionIds.some((id) => !id)) {
      return { ok: false, code: 'INVALID_OPTIONS' }
    }

    items.push({ productId, quantity, optionIds })
  }

  const paymentChangeFor = body.paymentChangeFor == null ? null : String(body.paymentChangeFor).trim()
  const notes = body.notes == null ? null : String(body.notes).trim()

  return {
    ok: true,
    payload: {
      idempotencyKey,
      customerName,
      customerPhone,
      deliveryAddress,
      deliveryReference,
      zoneId,
      paymentMethod: body.paymentMethod,
      paymentChangeFor: paymentChangeFor || null,
      notes: notes || null,
      items,
    },
  }
}
