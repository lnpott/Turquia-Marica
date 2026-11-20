import { useState } from 'react'
import { Plus, ShoppingBag } from 'lucide-react'
import { products } from '../../data/menu'
import { useOrderCart } from '../../hooks/useOrderCart'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

export default function OrderSection() {
  const { addItem, totalItems, setIsDrawerOpen } = useOrderCart()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [notes, setNotes] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleOpenAdd = (product) => {
    setSelectedProduct(product)
    setNotes('')
    setQuantity(1)
  }

  const handleConfirmAdd = () => {
    if (!selectedProduct) return
    addItem(selectedProduct, quantity, notes)
    setSelectedProduct(null)
  }

  return (
    <section id="pedido" className="scroll-mt-24 bg-[#faf7f2] px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Faça seu Pedido"
            title={<>Faça seu pedido direto, <span className="text-primary">sem taxas extras.</span></>}
            description="Escolha seus lanches favoritos, adicione observações e envie o pedido diretamente para o nosso balcão no WhatsApp."
          />
          {totalItems > 0 && (
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-bold text-on-primary shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Ver sacola com ${totalItems} itens`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              Ver Sacola ({totalItems})
            </button>
          )}
        </div>

        {/* Grade de produtos disponíveis para pedido */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="region" aria-label="Produtos para pedido direto">
          {products.map((product, index) => (
            <Reveal as="div" key={product.id} delay={index * 40}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e8e0d4] bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                  <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <span className="absolute right-3 top-3 rounded bg-on-surface/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {product.price}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-lg font-extrabold text-on-surface">{product.name}</h3>
                    <p className="mt-1 text-xs text-on-surface-variant">Feito artesanalmente com ingredientes de qualidade.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAdd(product)}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-secondary-container px-4 py-2.5 text-sm font-bold text-on-secondary-container transition-colors hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`Adicionar ${product.name} ao pedido`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Adicionar ao pedido
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-on-surface-variant">
          * Fotografias e itens de referência do cardápio Turquia Lanches. Confirmação imediata pelo atendente via WhatsApp oficial.
        </p>
      </div>

      {/* Modal de adição e observação */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 id="modal-product-title" className="text-xl font-extrabold text-on-surface">
              {selectedProduct.name}
            </h3>
            <p className="mt-1 text-sm font-bold text-primary">{selectedProduct.price}</p>
            <div className="mt-4">
              <label htmlFor="item-notes" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Observações (ex: sem cebola, ponto da carne)
              </label>
              <textarea
                id="item-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex.: Carne bem passada, maionese à parte"
                className="mt-1.5 w-full rounded-md border border-[#e8e0d4] p-2.5 text-sm focus:border-primary focus:outline-none"
                rows={2}
              />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface">Quantidade:</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#e8e0d4] text-lg font-bold hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#e8e0d4] text-lg font-bold hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="flex-1 rounded-md border border-[#e8e0d4] py-2.5 text-sm font-bold text-on-surface hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAdd}
                className="flex-1 rounded-md bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
