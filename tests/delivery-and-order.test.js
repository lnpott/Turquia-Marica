import { describe, it, expect } from 'vitest'
import { calculateDistanceKm, matchDeliveryZone } from '../src/utils/delivery.js'
import { buildOrderWhatsAppUrl } from '../src/services/whatsappOrder.js'

describe('delivery calculations and whatsapp order tests', () => {
  it('calcula a distância corretamente com haversine', () => {
    // Distância de um ponto a ele mesmo deve ser 0
    const d = calculateDistanceKm(-22.9238, -42.8252, -22.9238, -42.8252)
    expect(d).toBe(0)

    // Distância aproximada para ponto vizinho em Maricá
    const d2 = calculateDistanceKm(-22.9238, -42.8252, -22.9200, -42.8200)
    expect(d2).toBeGreaterThan(0)
    expect(d2).toBeLessThan(5)
  })

  it('determina a taxa de entrega por raio em km', () => {
    const zones = [
      { id: 'zone-1', max_radius_km: 3.0, fee_cents: 500, description: 'Até 3km' },
      { id: 'zone-2', max_radius_km: 6.0, fee_cents: 800, description: 'Até 6km' },
    ]

    const z1 = matchDeliveryZone(2.5, zones)
    expect(z1.feeCents).toBe(500)

    const z2 = matchDeliveryZone(5.5, zones)
    expect(z2.feeCents).toBe(800)

    const zOutside = matchDeliveryZone(12.0, zones)
    expect(zOutside).toBeNull()

    expect(matchDeliveryZone(2.5, [])).toBeNull()
    expect(matchDeliveryZone('zone-2', zones).feeCents).toBe(800)
    expect(matchDeliveryZone('zone-inexistente', zones)).toBeNull()
  })

  it('gera link de whatsapp estruturado com dados do pedido persistido', () => {
    const url = buildOrderWhatsAppUrl({
      orderNumber: 42,
      customerName: 'Cliente Teste',
      deliveryAddress: 'Rua Canarinhos, 663',
      deliveryReference: 'Em frente ao parque',
      items: [{ quantity: 2, name: 'Combo Turquia Especial' }],
      paymentMethod: 'card_delivery',
      subtotalCents: 5980,
      deliveryFeeCents: 500,
      totalCents: 6480,
    })

    expect(url).toContain('https://wa.me/5521964699374')
    expect(url).toContain(encodeURIComponent('PEDIDO #42'))
    expect(url).toContain(encodeURIComponent('Cliente Teste'))
    expect(url).toContain(encodeURIComponent('R$ 64,80'))
  })
})
