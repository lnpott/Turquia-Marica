import { formatBRL } from '../../utils/format'
import Button from '../ui/Button'

function CartSummary({ itemCount, subtotal, deliveryType, onSetDelivery }) {
  const deliveryLabel =
    deliveryType === 'delivery' ? (
      <span className="text-secondary-container font-medium text-right ml-4">A calcular</span>
    ) : (
      <span className="text-secondary-container font-medium text-right ml-4">Grátis</span>
    )

  return (
    <div className="rounded-xl shadow-lg p-6 md:p-stack-loose sticky top-[104px] border border-surface-variant bg-surface-container-low">
      <h2 className="font-headline-md text-on-surface mb-4 md:mb-gutter pb-4 md:pb-gutter border-b border-surface-variant">
        Resumo do Pedido
      </h2>

      {/* Entrega / Retirada (SET_DELIVERY) */}
      <div className="flex gap-2 mb-4 md:mb-gutter" role="group" aria-label="Tipo de entrega">
        {[
          { id: 'delivery', label: 'Entrega' },
          { id: 'pickup', label: 'Retirada' },
        ].map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={deliveryType === option.id}
            onClick={() => onSetDelivery(option.id)}
            className={`flex-1 px-3 py-2 rounded-full border font-label-bold text-label-bold transition-colors ${
              deliveryType === option.id
                ? 'border-primary bg-primary text-on-primary'
                : 'border-outline-variant bg-surface text-on-surface-variant hover:text-primary'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 md:gap-unit mb-4 md:mb-gutter">
        <div className="flex justify-between font-body-md text-on-surface-variant">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        <div className="flex justify-between font-body-md text-on-surface-variant">
          <span>Taxa de Entrega</span>
          {deliveryLabel}
        </div>
        <div className="flex justify-between font-body-md text-error mt-2">
          <span>Desconto</span>
          <span>- R$ 0,00</span>
        </div>
      </div>

      <div className="border-t border-surface-variant pt-4 md:pt-gutter mb-6 md:mb-stack-loose">
        <div className="flex justify-between items-center">
          <span className="font-headline-md text-on-surface">Total</span>
          <span className="font-display-xl-mobile md:font-display-xl text-primary">
            {formatBRL(subtotal)}
          </span>
        </div>
        <p className="font-body-md text-[12px] text-on-surface-variant text-right mt-1">
          {deliveryType === 'delivery' ? 'Não inclui taxa de entrega' : 'Retirada no local'}
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-gutter">
        <Button to="/checkout" size="lg" className="w-full">
          Finalizar Pedido
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            check_circle
          </span>
        </Button>
        <Button to="/cardapio" variant="secondary" size="lg" className="w-full">
          Continuar Comprando
        </Button>
      </div>
    </div>
  )
}

export default CartSummary
