import { ArrowRight, CupSoda } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, menuHighlights } from '../../data/menu'
import Reveal from '../ui/Reveal'

function MenuHighlights({ showAll = false }) {
  const items = showAll ? categories : menuHighlights
  const sectionId = showAll ? 'categorias' : 'cardapio'

  return (
    <section id={sectionId} className="scroll-mt-24 bg-[#faf7f2] px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="section-eyebrow">{showAll ? 'Estrutura prevista' : 'Cardápio'}</span>
            <h2 className="display-balance max-w-[18ch] font-headline-lg text-[36px] font-extrabold leading-none tracking-[-0.035em] text-on-background md:text-[48px]">
              {showAll ? 'Categorias em confirmação.' : 'Um cardápio para chegar com fome.'}
            </h2>
            <p className="mt-2 max-w-2xl font-body-md text-on-surface-variant">
              {showAll
                ? 'Estas são as áreas planejadas para o cardápio. Produtos, descrições e preços só aparecem depois da aprovação oficial.'
                : 'Produtos, ingredientes e preços serão publicados somente após validação.'}
            </p>
          </div>
          {!showAll ? (
            <Link to="/cardapio" className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg font-label-bold text-primary transition-all duration-tactile ease-tactile hover:translate-x-1 hover:underline active:scale-95 md:self-auto">
              Abrir cardápio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <ul aria-label={showAll ? 'Categorias previstas' : undefined} className="border-t border-[#e8e0d4]">
          {items.map((category, index) => (
            <Reveal
              as="li"
              key={category.id}
              delay={index * 70}
              id={showAll ? `categoria-${category.id}` : undefined}
              tabIndex={showAll ? -1 : undefined}
              className="group scroll-mt-28 border-b border-[#e8e0d4] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <figure className="grid min-h-[150px] grid-cols-[72px_1fr_72px] items-center gap-4 py-7 sm:grid-cols-[110px_1fr_110px] md:min-h-[190px] md:grid-cols-[170px_1fr_180px] md:gap-10">
                <span className="select-none text-[4.2rem] font-extrabold leading-none tracking-[-0.08em] text-[#e8e0d4] transition-colors duration-smooth group-hover:text-secondary-container sm:text-[6rem] md:text-[9rem]">{String(index + 1).padStart(2, '0')}</span>
                <figcaption>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Categoria prevista</p>
                  <h3 className="text-[clamp(2rem,5vw,4.8rem)] font-extrabold leading-none tracking-[-0.05em] text-on-surface transition-transform duration-smooth group-hover:translate-x-2">{category.name}</h3>
                  <p className="mt-3 text-sm text-on-surface/55">Conteúdo em confirmação</p>
                </figcaption>
                <div className="relative aspect-square overflow-hidden rounded-full bg-[#eee7dc] opacity-85 transition-all duration-smooth group-hover:scale-105 group-hover:opacity-100">
                  {category.image ? (
                    <picture>
                        <source srcSet={category.image} type="image/webp" />
                        <img
                          src={category.fallbackImage}
                          alt={category.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-smooth ease-smooth group-hover:scale-110"
                          loading="lazy"
                          width="512"
                          height="320"
                        />
                    </picture>
                  ) : (
                    <div className="flex h-full items-center justify-center text-on-surface/35">
                      <CupSoda className="h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
                      <span className="sr-only">Imagem pendente de acervo</span>
                    </div>
                  )}
                </div>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MenuHighlights
