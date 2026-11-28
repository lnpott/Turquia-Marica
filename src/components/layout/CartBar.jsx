import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useCatalog } from '../../hooks/useCatalog'
import { quoteCart } from '../../lib/quoteCart'
import { formatCents } from '../../lib/money'

const HIDDEN_PATHS = new Set(['/sacola', '/checkout', '/pedido/confirmado', '/admin'])

/**
 * Aba fixa no rodapé quando a sacola tem itens.
 * Feedback contínuo após adicionar no cardápio.
 */
function CartBar() {
  const location = useLocation()
  const { items, totalItems } = useCart()
  const { products } = useCatalog()

  if (HIDDEN_PATHS.has(location.pathname) || totalItems < 1) {
    return null
  }

  const quote = quoteCart(items, products)
  const label =
    totalItems === 1 ? '1 item na sacola' : `${totalItems} itens na sacola`

  return (
    <div
      className="cart-bar-safe fixed inset-x-0 z-[60] px-3 md:bottom-4 md:px-margin-desktop"
      style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-[1280px] md:flex md:justify-end">
        <Link
          to="/sacola"
          className="flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 text-on-primary shadow-[0_8px_28px_rgba(26,16,8,0.35)] transition-transform active:scale-[0.99] md:w-auto md:min-w-[320px] md:px-5"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-on-primary/15">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary-container px-1 text-[11px] font-extrabold text-on-surface">
              {totalItems}
            </span>
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-extrabold leading-tight">{label}</span>
            <span className="block text-xs font-medium text-on-primary/85">
              Subtotal {formatCents(quote.subtotalCents)} · toque para revisar
            </span>
          </span>

          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-on-primary/15 px-3 py-2 text-xs font-extrabold uppercase tracking-wide">
            Ver
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* Desktop: sobrescreve bottom do mobile nav */}
      <style>{`
        @media (min-width: 768px) {
          .cart-bar-safe { bottom: 1rem !important; }
        }
      `}</style>
    </div>
  )
}

export default CartBar
