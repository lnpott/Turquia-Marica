import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article
      tabIndex={0}
      className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-container focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Imagem do produto */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.imageAlt ?? product.name}
          width="512"
          height="384"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-smooth ease-smooth group-hover:scale-[1.10]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-container-high text-on-surface-variant text-sm font-medium">
          Foto em breve
        </div>
      )}

      {/* Badge de Categoria ou Teste */}
      {product.isMock && (
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-on-primary"
        >
          TESTE
        </span>
      )}

      {/* Botão de Adicionar à Sacola no canto superior direito */}
      <button
        type="button"
        onClick={handleAddToCart}
        aria-label={`Adicionar ${product.name} à sacola`}
        className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all ${
          added
            ? 'bg-green-600 text-white scale-110'
            : 'bg-primary text-on-primary hover:bg-primary-hover active:scale-95'
        }`}
      >
        {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </button>

      {/* Informações no rodapé do card */}
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-on-surface/95 via-on-surface/75 to-transparent px-5 pb-4 pt-12 text-on-image"
      >
        <div className="flex items-end justify-between gap-2">
          <div>
            <h3 className="font-headline-md text-[17px] font-extrabold leading-tight text-white">
              {product.name}
            </h3>
            {product.description && (
              <p className="mt-1 line-clamp-1 text-xs text-on-surface-variant text-stone-300">
                {product.description}
              </p>
            )}
          </div>
          <span className="shrink-0 text-base font-bold text-secondary-container">
            {product.price}
          </span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
