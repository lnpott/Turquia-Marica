import { useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle2, MessageSquare, Home, MapPin, Receipt } from 'lucide-react'
import { buildOrderWhatsAppUrl } from '../services/whatsappOrder'

export default function OrderConfirmedPage() {
  const location = useLocation()
  const order = location.state?.order

  if (!order) {
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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 className="h-10 w-10" />
      </div>

      <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
        Pedido #{order.orderNumber} Registrado
      </span>

      <h1 className="mt-3 font-headline-lg text-2xl font-extrabold text-on-surface">
        Pedido Recebido com Sucesso!
      </h1>

      <p className="mt-2 text-sm text-on-surface-variant max-w-md mx-auto">
        Seu pedido foi gravado com segurança em nosso banco de dados. Para agilizar o preparo e receber a estimativa exata de tempo, envie o resumo para o nosso WhatsApp:
      </p>

      {/* Botão Oficial WhatsApp */}
      <div className="mt-6">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-3.5 font-label-bold text-base text-white shadow-lg transition-transform hover:bg-[#20ba59] active:scale-[0.98]"
        >
          <MessageSquare className="h-5 w-5" />
          Enviar Resumo no WhatsApp da Loja
        </a>
        <p className="mt-2 text-xs text-on-surface-variant">
          O pedido já está salvo no sistema, mesmo se você não abrir o WhatsApp.
        </p>
      </div>

      {/* Detalhes do Pedido */}
      <div className="mt-8 rounded-lg border border-outline-variant bg-surface-container-low p-6 text-left space-y-4">
        <h2 className="flex items-center gap-2 font-headline-sm text-base font-bold text-on-surface border-b border-outline-variant pb-2">
          <Receipt className="h-5 w-5 text-primary" />
          Resumo do Pedido #{order.orderNumber}
        </h2>

        <div className="text-sm space-y-1">
          <p className="font-semibold text-on-surface">Cliente: {order.customerName}</p>
          <p className="flex items-start gap-1 text-on-surface-variant">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
            <span>{order.deliveryAddress} ({order.deliveryReference})</span>
          </p>
        </div>

        <div className="border-t border-outline-variant/60 pt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Itens:</p>
          <ul className="divide-y divide-outline-variant/30 text-sm">
            {order.items.map((it, idx) => (
              <li key={idx} className="py-1.5 flex justify-between">
                <span>{it.quantity}x {it.name || it.product_name}</span>
                <span className="font-medium text-on-surface">
                  R$ {(((it.lineCents ?? it.total_price_cents ?? ((it.unitPriceCents || 0) * it.quantity)) ) / 100).toFixed(2).replace('.', ',')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-outline-variant/60 pt-3 flex justify-between font-bold text-base text-on-surface">
          <span>Total a Pagar na Entrega:</span>
          <span className="text-primary">R$ {(order.totalCents / 100).toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-5 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container"
        >
          <Home className="h-4 w-4" />
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  )
}
