import { formatBRL } from '../../utils/format'
import Badge from '../ui/Badge'

function ProductHero({ product, unitTotal }) {
  return (
    <section className="w-full bg-surface">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-stack-loose items-start px-margin-mobile md:px-margin-desktop py-8 md:py-stack-loose">
        <div className="relative rounded-xl overflow-hidden shadow-lg group h-72 md:h-[480px]">
          {product.badge && (
            <Badge
              tone={product.badge === 'Mais Pedido' ? 'primary' : 'secondary'}
              className="absolute top-4 left-4 z-10 text-[10px] px-3 py-1"
            >
              {product.badge}
            </Badge>
          )}
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={product.image}
          />
        </div>

        <div className="flex flex-col gap-4 md:gap-gutter">
          <h1 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-on-surface">
            {product.name}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {product.description || 'Delicioso lanche preparado na hora, com ingredientes selecionados.'}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="font-price-lg text-primary text-3xl">{formatBRL(unitTotal)}</span>
            {product.oldPrice && (
              <span className="text-outline line-through text-sm">{product.oldPrice}</span>
            )}
          </div>
          {product.includes && (
            <ul className="flex flex-col gap-2">
              {product.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductHero
