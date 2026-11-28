import { describe, it, expect } from 'vitest'
import { validateOrderPayload } from '../api/lib/orderPayload.js'

const base = {
  idempotencyKey: 'test-key-123456',
  customerName: 'Cliente Teste',
  customerPhone: '21999999999',
  deliveryAddress: 'Rua Canarinhos, 663',
  deliveryReference: 'Portao verde',
  zoneId: 'zone-1',
  paymentMethod: 'pix_delivery',
  items: [{ productId: 'combo-1', quantity: 1, optionIds: [] }],
}

describe('validateOrderPayload', () => {
  it('aceita payload mínimo válido', () => {
    const result = validateOrderPayload(base)
    expect(result.ok).toBe(true)
    expect(result.payload.items).toHaveLength(1)
    expect(result.payload).not.toHaveProperty('unitPriceCents')
  })

  it('recusa sacola vazia e zona ausente', () => {
    expect(validateOrderPayload({ ...base, items: [] }).code).toBe('EMPTY_CART')
    expect(validateOrderPayload({ ...base, zoneId: '' }).code).toBe('DELIVERY_ZONE_UNAVAILABLE')
  })

  it('recusa idempotency curta e pagamento inválido', () => {
    expect(validateOrderPayload({ ...base, idempotencyKey: 'abc' }).code).toBe('INVALID_IDEMPOTENCY_KEY')
    expect(validateOrderPayload({ ...base, paymentMethod: 'boleto' }).code).toBe('INVALID_PAYMENT_METHOD')
  })

  it('recusa quantidades fracionárias em vez de arredondá-las para baixo', () => {
    expect(validateOrderPayload({
      ...base,
      items: [{ productId: 'combo-1', quantity: 1.5, optionIds: [] }],
    }).code).toBe('INVALID_QUANTITY')
  })

  it('recusa opcionais malformados em vez de descartá-los', () => {
    expect(validateOrderPayload({
      ...base,
      items: [{ productId: 'combo-1', quantity: 1, optionIds: 'option-1' }],
    }).code).toBe('INVALID_OPTIONS')
    expect(validateOrderPayload({
      ...base,
      items: [{ productId: 'combo-1', quantity: 1, optionIds: [null] }],
    }).code).toBe('INVALID_OPTIONS')
  })

  it('recusa item que não seja objeto', () => {
    expect(validateOrderPayload({ ...base, items: [null] }).code).toBe('PRODUCT_UNAVAILABLE')
  })
})
