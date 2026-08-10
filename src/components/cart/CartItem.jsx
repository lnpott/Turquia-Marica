import { formatBRL } from '../../utils/format'
import QuantitySelector from '../ui/QuantitySelector'

function CartItem({ item, onUpdateQty, onRemove }) {
  const hasCustomization =
    item.addons?.length > 0 || item.removals?.length > 0 || item.observations || item.meatPoint

  return (
    <div className="shadow-sm p-4 md:p-gutter flex flex-col sm:flex-row gap-4 md:gap-gutter relative overflow-hidden group hover:shadow-md transition-shadow bg-surface-container-low rounded-lg border border-surface-variant">
      <div className="w-full sm:w-40 h-48 sm:h-40 shrink-0 rounded-lg overflow-hidden relative">
        <img
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={item.image}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-headline-md text-on-surface md:text-2xl">{item.name}</h3>
            {item.meatPoint && (
              <p className="font-body-md text-on-surface-variant mt-unit">
                Ponto da carne: {item.meatPoint}
              </p>
            )}
            {item.addons?.length > 0 && (
              <p className="font-body-md text-secondary-container mt-unit font-medium">
                + {item.addons.join(', ')}
              </p>
            )}
            {item.removals?.length > 0 && (
              <p className="font-body-md text-on-surface-variant mt-unit">
                Sem {item.removals.join(', ')}
              </p>
            )}
            {item.observations && (
              <p className="font-body-md text-on-surface-variant mt-unit italic">
                {item.observations}
              </p>
            )}
            {!hasCustomization && (
              <p className="font-body-md text-on-surface-variant mt-unit italic">
                Sem personalizações.
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label={`Remover ${item.name}`}
            onClick={() => onRemove(item.key)}
            className="text-outline hover:text-error transition-colors p-2 shrink-0"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              delete
            </span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 gap-4 sm:gap-0">
          <QuantitySelector value={item.qty} onChange={(qty) => onUpdateQty(item.key, qty)} min={1} />
          <span className="font-price-lg text-primary self-end sm:self-auto">
            {formatBRL(item.unitPrice * item.qty)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
