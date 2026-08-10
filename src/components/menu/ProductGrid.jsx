import ProductCard from '../product/ProductCard'

function ProductGrid({ id, title, subtitle, products, note }) {
  return (
    <section id={id} className="py-16 px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">{title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">{subtitle}</p>
          </div>
          {note && (
            <p className="font-body-md text-primary text-xs italic mt-2">{note}</p>
          )}
        </div>

        {products.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant text-center py-12">
            Nenhum produto nesta categoria ainda.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
