import { formatCents } from '../lib/money'

const STORE_WHATSAPP_PHONE = '5521964699374'

const PAYMENT_LABELS = {
  card_delivery: 'Cartão (maquininha na entrega)',
  cash_delivery: 'Dinheiro na entrega',
  pix_delivery: 'Pix no ato da entrega',
}

/**
 * Monta o link wa.me a partir do pedido já persistido.
 * Retorna null se faltar referência ou total do servidor.
 * Não marca enviado, aceito ou pago.
 */
export function buildOrderWhatsAppUrl({
  orderNumber,
  customerName,
  deliveryAddress,
  deliveryReference,
  items,
  paymentMethod,
  paymentChangeFor,
  subtotalCents,
  deliveryFeeCents,
  totalCents,
  notes,
}) {
  if (orderNumber == null || orderNumber === '') return null
  if (!Number.isFinite(Number(totalCents))) return null
  if (!Number.isFinite(Number(subtotalCents))) return null
  if (!Number.isFinite(Number(deliveryFeeCents))) return null

  let paymentLabel = PAYMENT_LABELS[paymentMethod] || String(paymentMethod || 'não informado')
  if (paymentMethod === 'cash_delivery' && paymentChangeFor) {
    paymentLabel = `Dinheiro na entrega (troco para ${paymentChangeFor})`
  }

  const itemsListText = (items || [])
    .map((item) => {
      const name = item.name || item.product_name || item.item_name_snapshot || 'Item'
      return `• ${item.quantity}x ${name}`
    })
    .join('\n')

  const message = [
    `*NOVO PEDIDO #${orderNumber} — TURQUIA LANCHES*`,
    `--------------------------------`,
    `*Cliente:* ${customerName || '—'}`,
    `*Endereço:* ${deliveryAddress || '—'}`,
    `*Ponto de Ref.:* ${deliveryReference || '—'}`,
    notes ? `*Observações:* ${notes}` : null,
    `--------------------------------`,
    `*Itens:*`,
    itemsListText || '• (sem itens na resposta)',
    `--------------------------------`,
    `*Subtotal:* ${formatCents(subtotalCents)}`,
    `*Taxa de Entrega:* ${formatCents(deliveryFeeCents)}`,
    `*Total:* ${formatCents(totalCents)}`,
    `*Pagamento:* ${paymentLabel}`,
    `--------------------------------`,
    `_Pedido registrado no sistema. Aguardo confirmação e estimativa de entrega._`,
  ]
    .filter((line) => line != null && line !== '')
    .join('\n')

  return `https://wa.me/${STORE_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
