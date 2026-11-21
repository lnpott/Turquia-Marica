import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import SectionHeading from '../components/ui/SectionHeading'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, formattedSubtotal } = useCart()

  return (
    <div className="mx-auto max-w-[1024px] px-5 py-12 md:px-margin-desktop md:py-16">
      <SectionHeading
        eyebrow="Sua Sacola"
        title="Revise seus itens"
        description="Confira as quantidades e os itens selecionados antes de informar seu endereço de entrega."
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
            <ul className="divide-y divide-outline-variant/60 rounded-lg border border-outline-variant bg-surface-container-low">
              {items.map((item, index) => (
                <li key={`${item.productId}-${index}`} className="flex items-center justify-between p-5">
                  <div className="flex-1">
                    <h3 className="font-title-md font-bold text-on-surface">{item.name}</h3>
                    <p className="text-sm font-semibold text-primary">
                      R$ {((item.unitPriceCents * item.quantity) / 100).toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-outline-variant bg-surface">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, -1)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-primary"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-on-surface">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, 1)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-primary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      aria-label={`Remover ${item.name} da sacola`}
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
                <span>Itens ({totalItems})</span>
                <span>{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxa de Entrega</span>
                <span className="italic text-xs">Calculada na próxima etapa</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between font-bold text-on-surface text-base">
              <span>Subtotal</span>
              <span className="text-primary">{formattedSubtotal}</span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex w-full min-h-11 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-label-bold text-on-primary hover:bg-primary-hover"
            >
              Continuar para Entrega
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
