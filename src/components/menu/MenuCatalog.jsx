import { Construction } from 'lucide-react'
import { categories } from '../../data/menu'

function MenuCatalog() {
  return (
    <section id="categorias" className="scroll-mt-24 border-y-2 border-on-surface bg-background px-4 py-12 md:px-margin-desktop md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-7 border-b-2 border-on-surface pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <span className="section-eyebrow">Estrutura prevista</span>
            <h2 className="display-balance max-w-[13ch] font-headline-lg text-[36px] font-extrabold leading-none tracking-[-0.04em] text-on-surface md:text-[52px]">
              Categorias em confirmação.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant">
            Estas são as áreas planejadas para o cardápio. Produtos, descrições e preços só aparecem depois da aprovação oficial.
          </p>
        </div>

        <ol aria-label="Categorias previstas" className="mt-8 grid gap-3 md:grid-cols-2">
          {categories.map((category, index) => (
            <li
              key={category.id}
              id={`categoria-${category.id}`}
              tabIndex="-1"
              className="scroll-mt-28 flex min-h-[88px] items-center gap-4 border-2 border-on-surface bg-white px-4 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-secondary-container text-xs font-extrabold text-on-surface" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-headline-md text-xl font-extrabold text-on-surface">{category.name}</h3>
                <p className="mt-1 text-xs font-medium text-on-surface-variant">Conteúdo ainda não publicado</p>
              </div>
              <Construction className="h-5 w-5 shrink-0 text-primary" aria-label="Em confirmação" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default MenuCatalog
