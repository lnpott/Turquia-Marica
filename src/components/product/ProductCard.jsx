import { Construction } from 'lucide-react'

function ProductCard({ product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-surface-variant bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
        <img
          alt={product.imageAlt}
          className="h-full w-full object-cover"
          src={product.image}
          width="512"
          height="320"
          loading="lazy"
        />
        {product.imageStatus === 'illustrative' ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-on-surface/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-image">Imagem ilustrativa</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-headline-md text-xl text-on-background">{product.name}</h3>
        {product.description ? <p className="mt-2 text-sm text-on-surface-variant">{product.description}</p> : null}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-surface-variant pt-4">
          <span className="font-price-lg text-xl text-primary">{product.price ?? 'Preço não disponível'}</span>
          <span aria-disabled="true" className="inline-flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-lg bg-surface-container text-outline" title="Pedido em construção">
            <Construction className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
