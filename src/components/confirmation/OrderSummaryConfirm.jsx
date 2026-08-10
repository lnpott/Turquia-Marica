import { formatBRL } from '../../utils/format'

// Card do pedido confirmado — estrutura extraída do HTML de produção
// (turquia_lanches_confirma_o_production/code.html) e alimentada pelo snapshot
// `lastOrder` do CartContext (PLACE_ORDER). Os itens do pedido são exibidos
// porque o plano prevê "resumo dos itens" na confirmação.
const DELIVERY_LABELS = {
  delivery: 'Entrega',
  pickup: 'Retirada no balcão',
}

const PAYMENT_LABELS = {
  pix: 'Pix',
  card: 'Cartão',
  cash: 'Dinheiro',
}

function customizationSummary(item) {
  const parts = []
  if (item.meatPoint) parts.push(`Ponto: ${item.meatPoint}`)
  if (item.addons?.length) parts.push(item.addons.join(', '))
  if (item.removals?.length) parts.push(`Sem: ${item.removals.join(', ')}`)
  if (item.observations) parts.push(`Obs: ${item.observations}`)
  return parts.join(' · ')
}

function OrderSummaryConfirm({ order }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_15px_rgba(59,45,39,0.12)] p-8 text-left border border-surface-container mx-auto max-w-md relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full -mr-16 -mt-16 opacity-20"
        aria-hidden="true"
      />

      <div className="flex justify-between items-center mb-6 border-b border-surface-container-highest pb-4">
        <span className="font-label-bold text-label-bold text-on-surface-variant">
          Pedido #{order.orderNumber}
        </span>
        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-bold text-label-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            schedule
          </span>
          Aguardando
        </span>
      </div>

      {/* Itens do pedido (snapshot do CartContext) */}
      <ul className="space-y-3 mb-6">
        {order.items.map((item) => {
          const customization = customizationSummary(item)
          return (
            <li key={item.key} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">
                  <span className="font-label-bold text-label-bold">{item.qty}×</span> {item.name}
                </p>
                {customization && (
                  <p className="text-sm text-on-surface-variant mt-0.5">{customization}</p>
                )}
              </div>
              <span className="font-body-md text-body-md text-on-surface shrink-0">
                {formatBRL(item.unitPrice * item.qty)}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center gap-4">
          <span className="font-body-md text-on-surface-variant">Entrega / Retirada:</span>
          <span className="font-body-md text-on-surface">
            {DELIVERY_LABELS[order.deliveryType] ?? order.deliveryType}
          </span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="font-body-md text-on-surface-variant">Pagamento:</span>
          <span className="font-body-md text-on-surface text-right">
            {PAYMENT_LABELS[order.payment] ?? order.payment}
            {order.payment === 'cash' && order.cashAmount ? ` · troco para ${order.cashAmount}` : ''}
          </span>
        </div>
        {order.observations && (
          <div className="flex justify-between items-start gap-4">
            <span className="font-body-md text-on-surface-variant shrink-0">Observações:</span>
            <span className="font-body-md text-on-surface text-right">{order.observations}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="font-body-md text-on-surface">Total do Pedido:</span>
          <span className="font-price-lg text-price-lg text-primary">
            {formatBRL(order.total)}
          </span>
        </div>
      </div>

      <div className="bg-surface-container-low p-4 rounded-lg flex items-start gap-3">
        <span className="material-symbols-outlined text-tertiary-container mt-1" aria-hidden="true">
          info
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm">
          Assim que seu pedido for confirmado pelo restaurante, você será notificado.
        </p>
      </div>
    </div>
  )
}

export default OrderSummaryConfirm
