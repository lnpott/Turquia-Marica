import { useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle2, MessageSquare, Home, MapPin, Receipt } from 'lucide-react'
import { buildOrderWhatsAppUrl } from '../services/whatsappOrder'
import { formatCents } from '../lib/money'

function lineAmountCents(item) {
  if (Number.isFinite(item.lineCents)) return item.lineCents
  if (Number.isFinite(item.total_price_cents)) return item.total_price_cents
  if (Number.isFinite(item.line_total_cents)) return item.line_total_cents
  if (Number.isFinite(item.unitPriceCents) && Number.isFinite(item.quantity)) {
    return item.unitPriceCents * item.quantity
  }
  return null
}

export default function OrderConfirmedPage() {
  const location = useLocation()
  const order = location.state?.order

  if (!order?.orderNumber) {
    return <Navigate replace to="/" />
  }

  const whatsappUrl = buildOrderWhatsAppUrl({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    deliveryAddress: order.deliveryAddress,
    deliveryReference: order.deliveryReference,
    items: order.items,
    paymentMethod: order.paymentMethod,
    paymentChangeFor: order.paymentChangeFor,
    subtotalCents: order.subtotalCents,
    deliveryFeeCents: order.deliveryFeeCents,
    totalCents: order.totalCents,
    notes: order.notes,
  })

  return (
    <div className="mx-auto max-w-[640px] px-5 py-12 md:px-margin-desktop md:py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
      </div>

      <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
        Pedido #{order.orderNumber} registrado
      </span>

      <h1 className="mt-3 font-headline-lg text-2xl font-extrabold text-on-surface">
        Pedido gravado no sistema
      </h1>

      <p className="mt-2 text-sm text-on-surface-variant max-w-md mx-auto">
        O registro foi salvo. Isso ainda não significa que a loja aceitou o pedido nem que o pagamento foi feito.
        A confirmação e o prazo de preparo/entrega vêm pela loja, em geral pelo WhatsApp.
      </p>

      <div className="mt-6">
        {whatsappUrl ? (
          <>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-3.5 font-label-bold text-base text-white shadow-lg transition-transform hover:bg-[#20ba59] active:scale-[0.98]"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              Abrir resumo no WhatsApp da loja
            </a>
            <p className="mt-2 text-xs text-on-surface-variant">
              Opcional. O pedido permanece no banco mesmo se você não abrir o WhatsApp.
              Abrir o link não marca o pedido como enviado, aceito ou pago.
            </p>
          </>
        ) : (
          <p className="text-sm text-on-surface-variant">
            Não foi possível montar o link do WhatsApp porque faltou total ou referência do servidor.
            O pedido, se gravado, continua consultável no banco.
          </p>
        )}
      </div>

      <div className="mt-8 rounded-lg border border-outline-variant bg-surface-container-low p-6 text-left space-y-4">
        <h2 className="flex items-center gap-2 font-headline-sm text-base font-bold text-on-surface border-b border-outline-variant pb-2">
          <Receipt className="h-5 w-5 text-primary" aria-hidden="true" />
          Resumo do pedido #{order.orderNumber}
        </h2>

        <div className="text-sm space-y-1">
          <p className="font-semibold text-on-surface">Cliente: {order.customerName}</p>
          <p className="flex items-start gap-1 text-on-surface-variant">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
            <span>
              {order.deliveryAddress}
              {order.deliveryReference ? ` (${order.deliveryReference})` : ''}
            </span>
          </p>
        </div>

        <div className="border-t border-outline-variant/60 pt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Itens</p>
          <ul className="divide-y divide-outline-variant/30 text-sm">
            {(order.items || []).map((it, idx) => {
              const amount = lineAmountCents(it)
              return (
                <li key={idx} className="py-1.5 flex justify-between gap-3">
                  <span>
                    {it.quantity}x {it.name || it.product_name || it.item_name_snapshot || 'Item'}
                  </span>
                  <span className="font-medium text-on-surface shrink-0">
                    {amount == null ? '—' : formatCents(amount)}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="border-t border-outline-variant/60 pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-on-surface-variant">
            <span>Subtotal</span>
            <span>{Number.isFinite(order.subtotalCents) ? formatCents(order.subtotalCents) : '—'}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Taxa de entrega</span>
            <span>{Number.isFinite(order.deliveryFeeCents) ? formatCents(order.deliveryFeeCents) : '—'}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-on-surface pt-1">
            <span>Total (pagamento na entrega)</span>
            <span className="text-primary">
              {Number.isFinite(order.totalCents) ? formatCents(order.totalCents) : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-5 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Voltar à página inicial
        </Link>
      </div>
    </div>
  )
}
