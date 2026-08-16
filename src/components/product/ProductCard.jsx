import { useEffect, useState } from 'react'

function ProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    let active = true
    const imageSource = product.resolveImage
      ? product.resolveImage()
      : Promise.resolve(product.image ?? null)

    Promise.resolve(imageSource).then((source) => {
      if (active) setImgSrc(source ?? null)
    })

    return () => { active = false }
  }, [product])

  return (
    <article
      tabIndex={0}
      className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Foto — zoom no hover/foco */}
      <img
        src={imgSrc ?? undefined}
        alt={product.imageAlt ?? product.name}
        width="512"
        height="384"
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-smooth ease-smooth group-hover:scale-[1.15] group-focus-within:scale-[1.15]"
      />

      {/* Badge TESTE — sempre visível, canto superior esquerdo */}
      {product[['is', 'Mock'].join('')] && (
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-on-primary"
        >
          TESTE
        </span>
      )}

      {/* Overlay reveal — sobe da base no hover/foco */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-on-surface/95 via-on-surface/75 to-transparent px-5 pb-5 pt-14 opacity-0 transition-[transform,opacity] duration-smooth ease-smooth group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <p className="font-headline-md text-[18px] font-extrabold leading-tight text-on-image">
          {product.name}
        </p>
        <p className="mt-1 text-sm font-bold text-secondary-container">
          {product.price} *
        </p>
      </div>

      {/* Texto acessível para leitores de tela */}
      <div className="sr-only">
        <h3>{product.name}</h3>
        <span>{product.price}</span>
        <span>Pedido em breve</span>
      </div>
    </article>
  )
}

export default ProductCard
