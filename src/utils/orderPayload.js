import { ORDER_TYPES, PAYMENT_LABELS } from '../data/orderConfig'

export function parsePriceToNumber(priceStr) {
  if (typeof priceStr === 'number') return priceStr
  if (!priceStr) return 0
  let cleaned = String(priceStr).replace('R$', '').trim()
  if (cleaned.includes(',')) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')
  }
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function generateWhatsAppOrderMessage({ items = [], orderType = ORDER_TYPES.DELIVERY, customer = {} }) {
  const isDelivery = orderType === ORDER_TYPES.DELIVERY
  const subtotal = items.reduce((acc, item) => acc + parsePriceToNumber(item.product.price) * item.quantity, 0)

  const itemsList = items
    .map((item) => {
      const itemTotal = parsePriceToNumber(item.product.price) * item.quantity
      const notesText = item.notes ? `\n   _Obs: ${item.notes}_` : ''
      return `• ${item.quantity}x ${item.product.name} (${formatCurrency(itemTotal)})${notesText}`
    })
    .join('\n')

  const deliveryDetails = isDelivery
    ? `*Tipo:* 🛵 Entrega (Delivery)\n*Endereço:* ${customer.address || 'Não informado'}\n*Bairro:* ${customer.neighborhood || 'Parque Nanci'}\n*Complemento/Ref.:* ${customer.complement || 'Nenhum'}`
    : `*Tipo:* 🛍️ Retirada no Balcão (Parque Nanci)`

  const paymentText = PAYMENT_LABELS[customer.paymentMethod] || 'A combinar'
  const changeText = customer.paymentMethod === 'cash' && customer.changeFor ? ` (Troco para ${customer.changeFor})` : ''

  const messageLines = [
    '🍔 *NOVO PEDIDO — TURQUIA LANCHES*',
    '----------------------------------------',
    `*Cliente:* ${customer.name || 'Cliente'}`,
    `*Telefone:* ${customer.phone || 'Não informado'}`,
    deliveryDetails,
    '----------------------------------------',
    '📋 *ITENS:*',
    itemsList || 'Nenhum item selecionado',
    '----------------------------------------',
    `*Subtotal:* ${formatCurrency(subtotal)}`,
    isDelivery ? '*Taxa de entrega:* A combinar com atendente' : '*Taxa:* Grátis (Retirada)',
    `*Pagamento:* ${paymentText}${changeText}`,
    customer.generalNotes ? `*Observações do pedido:* ${customer.generalNotes}` : null,
    '----------------------------------------',
    '_Pedido enviado pelo site oficial da Turquia Lanches_',
  ].filter(Boolean)

  return messageLines.join('\n')
}

export function getWhatsAppOrderUrl(orderData) {
  const message = generateWhatsAppOrderMessage(orderData)
  const phone = '5521964699374'
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
