import { ArrowRight, Construction } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, menuHighlights } from '../../data/menu'

function MenuHighlights({ compact = false, showAll = false }) {
  const items = showAll ? categories : menuHighlights

  return (
    <section id="cardapio" className="bg-background px-4 py-16 md:px-margin-desktop md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="section-eyebrow">Cardápio</span>
            <h2 className="display-balance max-w-[18ch] font-headline-lg text-[36px] font-extrabold leading-none tracking-[-0.035em] text-on-background md:text-[48px]">Um cardápio para chegar com fome.</h2>
            <p className="mt-2 max-w-2xl font-body-md text-on-surface-variant">
              Produtos, ingredientes e preços serão publicados somente após validação.
            </p>
          </div>
          {!showAll ? (
            <Link to="/cardapio" className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-label-bold text-primary hover:underline md:self-auto">
              Abrir cardápio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <ul className={`grid gap-5 ${compact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {items.map((category) => (
            <li key={category.id} className="group overflow-hidden border-2 border-on-surface bg-white shadow-[5px_5px_0_#251913] transition-transform hover:-translate-y-1">
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <picture>
                    <source srcSet={category.image} type="image/webp" />
                    <img
                      src={category.fallbackImage}
                      alt={category.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width="512"
                      height="320"
                    />
                  </picture>
                  <span className="absolute bottom-0 right-0 bg-secondary-container px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-on-surface">
                    Imagem ilustrativa
                  </span>
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t-2 border-on-surface p-5">
                  <div>
                    <h3 className="font-headline-md text-xl text-on-background">{category.name}</h3>
                    <p className="mt-1 text-sm text-on-surface-variant">Não disponível / em construção</p>
                  </div>
                  <Construction className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MenuHighlights
