import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { OrderCartProvider, useOrderCart } from '../src/hooks/useOrderCart'
import {
  parsePriceToNumber,
  formatCurrency,
  generateWhatsAppOrderMessage,
  getWhatsAppOrderUrl,
} from '../src/utils/orderPayload'
import { ORDER_TYPES, PAYMENT_METHODS } from '../src/data/orderConfig'

const mockProductA = {
  id: 'baca',
  name: 'Baca Burger',
  price: 'R$ 29,90',
}

const mockProductB = {
  id: 'batata',
  name: 'Porção de Batata',
  price: 'R$ 25,00',
}

describe('utilitários de pedido e payload WhatsApp', () => {
  it('converte strings de preço em números corretamente', () => {
    expect(parsePriceToNumber('R$ 29,90')).toBe(29.9)
    expect(parsePriceToNumber('R$ 1.250,50')).toBe(1250.5)
    expect(parsePriceToNumber('29.90')).toBe(29.9)
    expect(parsePriceToNumber(29.9)).toBe(29.9)
    expect(parsePriceToNumber('')).toBe(0)
    expect(parsePriceToNumber(null)).toBe(0)
  })

  it('formata valores monetários no padrão pt-BR', () => {
    const formatted = formatCurrency(29.9)
    expect(formatted).toMatch(/R\$\s*29,90/)
  })

  it('gera mensagem estruturada completa para entrega (Delivery) via Pix', () => {
    const payload = {
      items: [
        { product: mockProductA, quantity: 2, notes: 'Bem passado' },
        { product: mockProductB, quantity: 1, notes: '' },
      ],
      orderType: ORDER_TYPES.DELIVERY,
      customer: {
        name: 'Carlos Teste',
        phone: '(21) 99999-8888',
        address: 'Rua das Flores, 10',
        neighborhood: 'Parque Nanci',
        complement: 'Casa 2',
        paymentMethod: PAYMENT_METHODS.PIX,
        generalNotes: 'Campainha com defeito',
      },
    }

    const message = generateWhatsAppOrderMessage(payload)
    expect(message).toContain('🍔 *NOVO PEDIDO — TURQUIA LANCHES*')
    expect(message).toContain('*Cliente:* Carlos Teste')
    expect(message).toContain('*Tipo:* 🛵 Entrega (Delivery)')
    expect(message).toContain('*Endereço:* Rua das Flores, 10')
    expect(message).toContain('*Bairro:* Parque Nanci')
    expect(message).toContain('2x Baca Burger')
    expect(message).toContain('Obs: Bem passado')
    expect(message).toContain('1x Porção de Batata')
    expect(message).toContain('*Pagamento:* Pix')
    expect(message).toContain('*Observações do pedido:* Campainha com defeito')
  })

  it('gera mensagem para retirada no balcão com pagamento em dinheiro e troco', () => {
    const payload = {
      items: [{ product: mockProductA, quantity: 1, notes: '' }],
      orderType: ORDER_TYPES.PICKUP,
      customer: {
        name: 'Ana Silva',
        phone: '(21) 97777-6666',
        paymentMethod: PAYMENT_METHODS.CASH,
        changeFor: 'R$ 50,00',
      },
    }

    const message = generateWhatsAppOrderMessage(payload)
    expect(message).toContain('*Tipo:* 🛍️ Retirada no Balcão')
    expect(message).toContain('Dinheiro (informar troco) (Troco para R$ 50,00)')
  })

  it('gera URL wa.me com número oficial e mensagem codificada', () => {
    const url = getWhatsAppOrderUrl({
      items: [{ product: mockProductA, quantity: 1, notes: '' }],
      orderType: ORDER_TYPES.PICKUP,
      customer: { name: 'João' },
    })

    expect(url).toContain('https://wa.me/5521964699374?text=')
    expect(url).toContain(encodeURIComponent('NOVO PEDIDO — TURQUIA LANCHES'))
  })
})

const mockStorageMap = new Map()
const localStorageMock = {
  getItem: (key) => mockStorageMap.get(key) ?? null,
  setItem: (key, val) => mockStorageMap.set(key, String(val)),
  removeItem: (key) => mockStorageMap.delete(key),
  clear: () => mockStorageMap.clear(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
})

describe('hook useOrderCart e contexto da sacola', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('inicia com sacola vazia e permite adicionar itens', () => {
    const { result } = renderHook(() => useOrderCart(), {
      wrapper: OrderCartProvider,
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.subtotal).toBe(0)

    act(() => {
      result.current.addItem(mockProductA, 1, 'Sem picles')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product.name).toBe('Baca Burger')
    expect(result.current.items[0].quantity).toBe(1)
    expect(result.current.items[0].notes).toBe('Sem picles')
    expect(result.current.totalItems).toBe(1)
    expect(result.current.subtotal).toBe(29.9)
    expect(result.current.isDrawerOpen).toBe(true)
  })

  it('incrementa a quantidade caso o mesmo produto e observação sejam adicionados', () => {
    const { result } = renderHook(() => useOrderCart(), {
      wrapper: OrderCartProvider,
    })

    act(() => {
      result.current.addItem(mockProductA, 1, 'Normal')
      result.current.addItem(mockProductA, 2, 'Normal')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(3)
    expect(result.current.totalItems).toBe(3)
    expect(result.current.subtotal).toBe(89.7)
  })

  it('permite alterar quantidade e remover itens', () => {
    const { result } = renderHook(() => useOrderCart(), {
      wrapper: OrderCartProvider,
    })

    act(() => {
      result.current.addItem(mockProductA, 2)
      result.current.addItem(mockProductB, 1)
    })

    expect(result.current.items).toHaveLength(2)

    act(() => {
      result.current.updateQuantity(0, -1) // diminui mockProductA de 2 para 1
    })
    expect(result.current.items[0].quantity).toBe(1)

    act(() => {
      result.current.removeItem(1) // remove mockProductB
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product.id).toBe('baca')

    act(() => {
      result.current.clearCart()
    })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })
})
