import { describe, it, expect } from 'vitest'
import { quoteCart } from '../src/lib/quoteCart.js'

const products = [
  {
    id: 'lanche-1',
    name: 'X-Burguer',
    status: 'active',
    price_cents: 2500,
    product_option_groups: [
      {
        id: 'g1',
        product_options: [
          { id: 'bacon', name: 'Bacon', price_cents: 400, status: 'active' },
          { id: 'off', name: 'Fora', price_cents: 100, status: 'hidden' },
        ],
      },
    ],
  },
]

describe('quoteCart', () => {
  it('ignora preço enviado pelo cliente e soma o opcional ativo', () => {
    const quote = quoteCart(
      [{ productId: 'lanche-1', quantity: 2, optionIds: ['bacon'], unitPriceCents: 1 }],
      products,
    )
    expect(quote.issues).toEqual([])
    expect(quote.subtotalCents).toBe(5800)
    expect(quote.lines[0].unitPriceCents).toBe(2500)
  })

  it('marca item ausente e não entra no subtotal', () => {
    const quote = quoteCart([{ productId: 'sumiu', quantity: 1, optionIds: [] }], products)
    expect(quote.issues[0].code).toBe('unavailable')
    expect(quote.subtotalCents).toBe(0)
  })

  it('recusa opcional que não está ativo no produto', () => {
    const quote = quoteCart([{ productId: 'lanche-1', quantity: 1, optionIds: ['off'] }], products)
    expect(quote.issues[0].code).toBe('option_unavailable')
    expect(quote.subtotalCents).toBe(0)
  })
})
