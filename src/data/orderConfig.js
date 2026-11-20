export const ORDER_TYPES = Object.freeze({
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
})

export const PAYMENT_METHODS = Object.freeze({
  PIX: 'pix',
  CARD: 'card',
  CASH: 'cash',
})

export const PAYMENT_LABELS = Object.freeze({
  [PAYMENT_METHODS.PIX]: 'Pix (chave enviada na confirmação)',
  [PAYMENT_METHODS.CARD]: 'Cartão (Débito/Crédito na maquininha)',
  [PAYMENT_METHODS.CASH]: 'Dinheiro (informar troco)',
})

export const DEFAULT_NEIGHBORHOODS = [
  'Parque Nanci',
  'Itapeba',
  'Centro',
  'Araçatiba',
  'São José do Imbassaí',
  'Ubatiba',
  'Inoã',
  'Outro bairro de Maricá',
]
