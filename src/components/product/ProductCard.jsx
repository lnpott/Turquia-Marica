import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

function ProductCard({ product }) {
  const productUrl = `/produto/${product.id}`

  return (
    <article className="bg-white rounded-lg overflow-hidden card-shadow card-shadow-hover transition-all flex flex-col group border border-surface-variant h-full">
      <Link to={productUrl} className="block h-48 sm:h-56 lg:h-64 overflow-hidden relative" aria-label={`Ver ${product.name}`}>
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
      </Link>

      {product.includes ? (
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow">
          <Link to={productUrl}>
            <h3 className="font-headline-md text-2xl mb-4 text-on-background hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <ul className="space-y-2 mb-8">
            {product.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-on-surface-variant font-body-md">
                <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
                  check_circle
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-4">
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
              )}
              <span className="font-price-lg text-primary text-3xl">{product.price}</span>
            </div>
            <Link
              to={productUrl}
              aria-label={`Adicionar ${product.name} ao pedido`}
              className="w-full min-h-11 bg-primary text-white font-label-bold text-label-bold px-4 py-3 rounded-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add_shopping_cart
              </span>
              Adicionar ao Pedido
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <Link to={productUrl}>
            <h3 className="font-headline-md text-xl mb-2 text-on-background hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="font-body-md text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-variant">
            <span className="font-price-lg text-primary text-2xl">{product.price}</span>
            <Link
              to={productUrl}
              aria-label={`Adicionar ${product.name}`}
              className="bg-primary text-white w-11 h-11 rounded-lg hover:bg-primary-hover transition-all flex items-center justify-center shadow-sm"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add
              </span>
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}

export default ProductCard
