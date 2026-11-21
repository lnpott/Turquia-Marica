const STORE_WHATSAPP_PHONE = '5521964699374'

/**
 * Constrói a mensagem estruturada com base no pedido persistido no banco
 * e retorna o link direto wa.me.
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
  const paymentLabels = {
    card_delivery: 'Cartão (maquininha na entrega)',
    cash_delivery: `Dinheiro na entrega${paymentChangeFor ? ` (Troco para ${paymentChangeFor})` : ''}`,
    pix_delivery: 'Pix no ato da entrega',
  }

  const itemsListText = (items || [])
    .map((item) => `• ${item.quantity}x ${item.name || item.product_name}`)
    .join('\n')

  const message = [
    `*NOVO PEDIDO #${orderNumber} — TURQUIA LANCHES*`,
    `--------------------------------`,
    `*Cliente:* ${customerName}`,
    `*Endereço:* ${deliveryAddress}`,
    `*Ponto de Ref.:* ${deliveryReference}`,
    notes ? `*Observações:* ${notes}` : null,
    `--------------------------------`,
    `*Itens:*`,
    itemsListText,
    `--------------------------------`,
    `*Subtotal:* R$ ${(subtotalCents / 100).toFixed(2).replace('.', ',')}`,
    `*Taxa de Entrega:* R$ ${(deliveryFeeCents / 100).toFixed(2).replace('.', ',')}`,
    `*Total:* R$ ${(totalCents / 100).toFixed(2).replace('.', ',')}`,
    `*Pagamento:* ${paymentLabels[paymentMethod] || paymentMethod}`,
    `--------------------------------`,
    `_Pedido registrado no sistema. Aguardo confirmação e estimativa de entrega!_`,
  ]
    .filter(Boolean)
    .join('\n')

  return `https://wa.me/${STORE_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
