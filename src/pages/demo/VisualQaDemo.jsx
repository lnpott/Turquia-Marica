import { useEffect } from 'react'
import MenuSection from '../../components/menu/MenuSection'
import { demoProducts } from '../../data/menu.demo'

const ROBOTS_CONTENT = 'noindex, nofollow, noarchive, nosnippet'

function VisualQaDemo() {
  useEffect(() => {
    const previousTitle = document.title
    const existingRobots = document.querySelector('meta[name="robots"]')
    const previousRobots = existingRobots?.content
    const robots = existingRobots ?? document.head.appendChild(document.createElement('meta'))
    robots.name = 'robots'
    robots.content = ROBOTS_CONTENT
    document.title = 'DADOS FICTÍCIOS — QA VISUAL'

    return () => {
      document.title = previousTitle
      if (existingRobots) existingRobots.content = previousRobots
      else robots.remove()
    }
  }, [])

  return (
    <div className="bg-[#faf7f2]">
      <aside className="sticky top-[72px] z-30 border-y border-amber-950/20 bg-amber-300 px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-amber-950" role="status">
        Dados fictícios — QA visual isolado — nenhum item ou preço é real
      </aside>
      <section className="mx-auto max-w-[1280px] px-5 pb-4 pt-10 md:px-margin-desktop">
        <p className="max-w-3xl text-sm leading-relaxed text-on-surface/70">
          Superfície temporária habilitada somente por <code className="font-bold">VITE_VISUAL_QA_DEMO=true</code>. Use filtros, hover, teclado e rolagem para validar o comportamento no contexto completo da aplicação.
        </p>
      </section>
      <MenuSection items={demoProducts} />
    </div>
  )
}

export default VisualQaDemo
