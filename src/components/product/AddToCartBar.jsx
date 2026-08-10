import { formatBRL } from '../../utils/format'
import QuantitySelector from '../ui/QuantitySelector'
import Button from '../ui/Button'

function AddToCartBar({ qty, onChangeQty, total, onAdd }) {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 md:static bg-surface/95 backdrop-blur-sm border-t border-outline-variant md:border md:rounded-xl md:shadow-lg p-4 md:p-gutter flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <QuantitySelector value={qty} onChange={onChangeQty} min={1} />
        <div className="flex flex-col">
          <span className="font-body-md text-on-surface-variant text-sm">Total</span>
          <span className="font-price-lg text-primary text-2xl">{formatBRL(total)}</span>
        </div>
      </div>
      <Button size="lg" onClick={onAdd} className="w-full sm:w-auto">
        <span className="material-symbols-outlined" aria-hidden="true">
          add_shopping_cart
        </span>
        Adicionar à Sacola
      </Button>
    </div>
  )
}

export default AddToCartBar
