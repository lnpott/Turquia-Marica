import { ShoppingBag } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'

function ProductCard({ product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm bg-white ring-1 ring-inset ring-[#e8e0d4]">
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
          <span className="absolute bottom-3 right-3 rounded-sm bg-on-surface/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-image">Imagem ilustrativa</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-headline-md text-xl text-on-background">{product.name}</h3>
        {product.description ? <p className="mt-2 text-sm text-on-surface-variant">{product.description}</p> : null}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#e8e0d4] pt-4">
          <span className="font-price-lg text-xl text-primary">{product.price ?? 'Preço não disponível'}</span>
          <ChannelAction channel={BUSINESS_INFO.channels.ifood} icon={ShoppingBag} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-primary px-4 text-sm font-bold text-white" unavailableClassName="inline-flex min-h-11 cursor-not-allowed items-center gap-2 text-sm text-on-surface/45 line-through">Pedido em breve</ChannelAction>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
