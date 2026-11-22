import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useCatalog } from '../hooks/useCatalog'
import { quoteCart } from '../lib/quoteCart'
import { formatCents } from '../lib/money'
import SectionHeading from '../components/ui/SectionHeading'
import UnavailableNotice from '../components/ui/UnavailableNotice'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const { products, loading, status } = useCatalog()
  const quote = quoteCart(items, products)
  const blocked = status !== 'ready' || quote.issues.length > 0

  return (
    <div className="mx-auto max-w-[1024px] px-5 py-12 md:px-margin-desktop md:py-16">
      <SectionHeading
        eyebrow="Sua Sacola"
        title="Revise seus itens"
        description="Quantidades ficam neste aparelho. O preço mostrado é o do catálogo agora, não o que estava na tela quando você adicionou."
      />

      {items.length === 0 ? (
        <div className="mt-12 rounded-lg border border-outline-variant bg-surface-container-low p-10 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-on-surface-variant/40" />
          <h2 className="mt-4 font-headline-md text-xl font-bold text-on-surface">Sua sacola está vazia</h2>
          <p className="mt-2 text-on-surface-variant">Explore nosso cardápio e adicione seus lanches favoritos.</p>
          <Link
            to="/#cardapio"
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-6 py-3 font-label-bold text-on-primary hover:bg-primary-hover"
          >
            Ver Cardápio
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {status === 'error' && (
              <UnavailableNotice
                className="mb-4"
                title="Preço indisponível"
                description="O catálogo não respondeu. A sacola não usa preço guardado no navegador."
              />
            )}
            <ul className="divide-y divide-outline-variant/60 rounded-lg border border-outline-variant bg-surface-container-low">
              {quote.lines.map((item, index) => (
                <li key={`${item.productId}-${index}`} className="flex items-center justify-between p-5">
                  <div className="flex-1">
                    <h3 className="font-title-md font-bold text-on-surface">{item.unavailable ? 'Item indisponível' : item.name}</h3>
                    <p className="text-sm font-semibold text-primary">
                      {loading ? '…' : item.unavailable ? 'Fora do catálogo atual' : formatCents(item.lineCents)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-outline-variant bg-surface">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, -1)}
                        aria-label="Diminuir quantidade"
                        className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-primary"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-on-surface">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, 1)}
                        aria-label="Aumentar quantidade"
                        className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-primary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      aria-label="Remover item da sacola"
                      className="flex h-9 w-9 items-center justify-center text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-on-surface-variant hover:text-error transition-colors"
              >
                Esvaziar sacola
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6 h-fit">
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">Resumo da Sacola</h2>
            <div className="mt-4 space-y-2 border-b border-outline-variant pb-4 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Itens ({quote.totalItems})</span>
                <span>{loading ? '…' : formatCents(quote.subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxa de Entrega</span>
                <span className="italic text-xs">Só na próxima etapa, pela zona do banco</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between font-bold text-on-surface text-base">
              <span>Subtotal</span>
              <span className="text-primary">{loading ? '…' : formatCents(quote.subtotalCents)}</span>
            </div>

            {blocked ? (
              <p className="mt-6 text-sm text-on-surface-variant">
                Tire os itens indisponíveis ou espere o catálogo antes de seguir.
              </p>
            ) : (
              <Link
                to="/checkout"
                className="mt-6 flex w-full min-h-11 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-label-bold text-on-primary hover:bg-primary-hover"
              >
                Continuar para Entrega
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
