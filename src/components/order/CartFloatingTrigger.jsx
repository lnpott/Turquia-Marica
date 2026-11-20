import { ShoppingBag } from 'lucide-react'
import { useOrderCart } from '../../hooks/useOrderCart'
import { formatCurrency } from '../../utils/orderPayload'

export default function CartFloatingTrigger() {
  const { totalItems, subtotal, setIsDrawerOpen } = useOrderCart()
  if (totalItems === 0) return null

  return (
    <button
      type="button"
      onClick={() => setIsDrawerOpen(true)}
      className="fixed bottom-20 right-4 z-40 flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 md:bottom-8 md:right-8"
      aria-label={`Abrir sacola com ${totalItems} itens, total de ${formatCurrency(subtotal)}`}
    >
      <div className="relative">
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-container text-[11px] font-extrabold text-on-secondary-container">
          {totalItems}
        </span>
      </div>
      <span className="text-sm font-extrabold">{formatCurrency(subtotal)}</span>
    </button>
  )
}
