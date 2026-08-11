import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import imgHeroFries from '../../assets/images/hero/hero-fries.jpg'
import imgHeroAmbience from '../../assets/images/hero/hero-ambience.jpg'
import imgHeroGallery from '../../assets/images/hero/hero-gallery.jpg'

// LOTE 11.1 — Hero da Home (correção visual).
// LOTE 14 — Imagens migradas para assets locais (src/assets/images/hero).
// A composição original (heredada do HTML de produção) usava `mix-blend-multiply`
// + `opacity-70` + gradiente full-hero via-background/80, o que obscurecia/lavava
// a fotografia a ponto de parecer uma mancha atrás do conteúdo. Esta versão segue
// o princípio FOTOGRAFIA PRIMEIRO: imagem em plena opacidade, sem blend, e um
// gradiente LOCALIZADO apenas atrás do bloco textual (legibilidade por composição).
//
// Referência de imagem: URL original e funcional (HTTP 200) de
// turquia_lanches_homepage_production/code.html e index.html_homepage_production
// (fonte #1 da hierarquia). Slides 2 e 3: imagens já aprovadas no HTML auditado.
// Assets locais (Lote 14) — as MESMAS fotografias aprovadas dos HTMLs de produção:
// fries close-up, ambiente/brinde e galeria. Composição, ordem, duração, crossfade
// e Ken Burns permanecem idênticos.
//
// LOTE 14 (Hero Desktop + Mobile) — auditoria visual em navegador real (375/390/1280/1440):
// DESKTOP aprovado e INTOCADO (crossfade 6s + Ken Burns sutil + gradiente localizado à
// esquerda, sem caixa). MOBILE reavaliado do zero: a composição anterior (bloco textual
// em caixa translúcida + imagem estática em largura total ABAIXO do texto) produzia uma
// primeira dobra longa e densa, com sensação de "desktop espremido". Decisão (Opção C —
// composição mobile própria, ESTÁTICA): a mesma fotografia aprovada (fries) vira o FUNDO
// full-bleed do hero mobile — como o HTML de produção original, que exibia a foto de
// fundo também no mobile — com scrim gradiente localizado na base (densidade máxima
// atrás do texto, dissolvendo até transparência, sem cobrir a foto) e texto alinhado à
// base. Sem caixa pesada, sem imagem duplicada, primeira dobra curta com comida visível.
// Slideshow mobile NÃO adotado (Opção B descartada): performance e legibilidade primeiro,
// conforme diretriz do Lote 12; a fotografia estática entrega a primeira dobra superior.
const SLIDES = [
  { src: imgHeroFries, label: 'Hero Image', position: 'center' },
  { src: imgHeroAmbience, label: 'Ambiente Turquia Lanches', position: 'center' },
  { src: imgHeroGallery, label: 'Momentos Turquia', position: 'center' },
]

// Dwell confortável (6s) com crossfade suave (1.6s) — atmosfera, não banner.
const SLIDE_MS = 6000

function HeroSection() {
  const [active, setActive] = useState(0)
  // Slides 2 e 3 só são montados após o primeiro render: a 1ª imagem carrega
  // imediatamente e as demais posteriormente (sem custo de carregamento inicial).
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  // Crossfade discreto; totalmente desativado para quem prefere menos movimento
  // (prefers-reduced-motion) — nesse caso o hero permanece estático no slide 1.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full min-h-[600px] flex items-end md:items-center justify-center overflow-hidden py-12 md:py-0 md:h-[819px]">
      {/* Fundo dinâmico (desktop): crossfade entre imagens aprovadas.
          FOTOGRAFIA PRIMEIRO: sem mix-blend-multiply, sem opacity reduzida —
          a foto aparece em plena visibilidade. O crossfade (alpha blend) nunca
          escurece a tela durante a troca. */}
      <div className="absolute inset-0 w-full h-full bg-surface-container hidden md:block">
        {SLIDES.map((slide, i) => {
          const isActive = i === active
          // Antes da hidratação apenas o slide 1 existe no DOM (preload da 1ª).
          if (!hydrated && i > 0) return null
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 w-full h-full bg-cover transition-opacity duration-[1600ms] ease-in-out ${
                isActive ? 'opacity-100 hero-kenburns' : 'opacity-0'
              }`}
              role="img"
              aria-label={slide.label}
              aria-hidden={!isActive}
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundPosition: slide.position,
              }}
            />
          )
        })}
      </div>

      {/* Fundo mobile (composição própria, ESTÁTICA): a mesma fotografia aprovada
          (fries) em plena visibilidade como fundo full-bleed — como no HTML de
          produção original. FOTOGRAFIA PRIMEIRO na primeira dobra mobile. */}
      <div
        className="absolute inset-0 w-full h-full bg-cover md:hidden"
        role="img"
        aria-label="Batatas fritas artesanais da Turquia Lanches"
        style={{ backgroundImage: `url('${imgHeroFries}')`, backgroundPosition: 'center' }}
      />

      {/* Overlay LOCALIZADO (apenas atrás do bloco de texto, lado esquerdo no
          desktop): a fotografia permanece nítida no restante do hero. Gradiente
          suave que dissolve em transparência (sem lavar a imagem). */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent hidden md:block pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Scrim LOCALIZADO mobile (base → dissolução progressiva): densidade máxima
          imediatamente atrás do bloco textual inferior, dissolvendo até
          transparência no topo — a fotografia permanece visível. Sem aparência
          de card, sem cobrir a foto. */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background/90 via-background/55 to-transparent md:hidden pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 w-full px-4 lg:px-20 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-stack-tight drop-shadow-md">
            Fome de Leão?
            <br /> <span className="text-primary">Lanche Especial.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-loose max-w-lg font-medium bg-background/30 px-2 rounded drop-shadow-sm">
            Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da
            cidade te espera.
          </p>
          <div className="flex flex-col sm:flex-row gap-gutter w-full sm:w-auto">
            <Button
              to="/cardapio"
              size="lg"
              className="w-full sm:w-auto rounded-xl ambient-shadow"
            >
              <span className="material-symbols-outlined" data-weight="fill" aria-hidden="true">
                shopping_cart
              </span>
              PEÇA AGORA
            </Button>
            <Button
              to="/cardapio"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-surface-container-low text-primary rounded-xl"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                restaurant_menu
              </span>
              VER CARDÁPIO
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
