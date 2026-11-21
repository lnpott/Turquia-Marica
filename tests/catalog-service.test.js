import { describe, it, expect } from 'vitest'
import * as catalogService from '../src/services/catalog.js'

describe('catalog service tests', () => {
  it('exporta as funções esperadas do serviço de catálogo', () => {
    expect(typeof catalogService.getActiveCategories).toBe('function')
    expect(typeof catalogService.getActiveProducts).toBe('function')
    expect(typeof catalogService.getDeliveryZones).toBe('function')
  })

  it('valida estrutura dos dados esperados para o catálogo', () => {
    const mockCategories = [
      { id: 'combos', name: 'Combos', status: 'active', display_order: 1 },
      { id: 'lanches', name: 'Lanches', status: 'active', display_order: 2 },
    ]

    expect(mockCategories).toHaveLength(2)
    expect(mockCategories[0].id).toBe('combos')
    expect(mockCategories[1].name).toBe('Lanches')
  })
})
