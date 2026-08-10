import { formatBRL } from '../../utils/format'

// Painel lateral "Resumo do Pedido" — extraído do HTML de produção (sticky,
// lista de itens, subtotal, taxa de entrega, total e CTA). Reutiliza o estado
// real do CartContext (items, cartTotal, deliveryType) — sem duplicar cálculo.
// O botão usa type="submit" e submete o <form> pai do Checkout.jsx.
function OrderSummaryPanel({ items, cartTotal, deliveryType }) {
  const feeLabel =
    deliveryType === 'delivery' ? (
      <span className="text-secondary font-bold">A calcular</span>
    ) : (
      <span className="text-secondary font-bold">Grátis</span>
    )

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_15px_rgba(135,66,0,0.12)] sticky top-[104px] p-6 md:p-8">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant pb-4">
        Resumo do Pedido
      </h2>

      <div className="flex flex-col gap-4 mb-6 text-body-md font-body-md">
        {items.map((item) => (
          <div key={item.key} className="flex justify-between items-center text-on-surface">
            <span>
              {item.qty}x {item.name}
            </span>
            <span className="font-bold">{formatBRL(item.unitPrice * item.qty)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-outline-variant pt-6 flex flex-col gap-3">
        <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
          <span>Subtotal</span>
          <span>{formatBRL(cartTotal)}</span>
        </div>
        <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
          <span>Taxa de Entrega</span>
          {feeLabel}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-headline-md text-headline-md text-on-surface">Total</span>
          <span className="font-price-lg text-price-lg text-primary">{formatBRL(cartTotal)}</span>
        </div>
      </div>

      {/* Botão nativo com as classes exatas do HTML de produção (o CTA do
          checkout não usa a variante padrão do Button para evitar conflito de
          font-family/font-size — fidelidade 1:1). type="submit" submete o form. */}
      <button
        type="submit"
        className="w-full mt-8 bg-primary text-on-primary font-headline-md text-[20px] py-4 rounded-xl hover:bg-on-primary-fixed-variant transition-all hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 focus:ring-4 focus:ring-primary-fixed focus:outline-none"
      >
        Finalizar Pedido
        <span className="material-symbols-outlined" aria-hidden="true">
          check_circle
        </span>
      </button>
      <p className="text-center font-body-md text-[12px] text-on-surface-variant mt-4">
        Ao finalizar, você concorda com nossos termos.
      </p>
    </div>
  )
}

export default OrderSummaryPanel
