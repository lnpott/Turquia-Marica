import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import imgHeroFries from '../../assets/images/hero/hero-fries.jpg'
import imgHeroAmbience from '../../assets/images/hero/hero-ambience.jpg'
import imgHeroGallery from '../../assets/images/hero/hero-gallery.jpg'

// LOTE 15 — Refinamento da Home usando o Cardápio como referência de qualidade.
// Princípios preservados: FOTOGRAFIA PRIMEIRO, crossfade, Ken Burns sutil,
// gradiente localizado, composição mobile própria.
// Melhorias: eyebrow acima do título (consistente com tag do Cardápio),
// CTA secundário usa tokens do DS (sem backdrop-blur decorativo),
// dots de navegação do slideshow para orientação contextual no desktop.

const SLIDES = [
  { src: imgHeroFries,    label: 'Batatas fritas artesanais da Turquia Lanches', position: 'center' },
  { src: imgHeroAmbience, label: 'Ambiente Turquia Lanches',                     position: 'center' },
  { src: imgHeroGallery,  label: 'Momentos Turquia',                             position: 'center' },
]

const SLIDE_MS = 6000

function HeroSection() {
  const [active, setActive] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => { setHydrated(true) }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative w-full min-h-[600px] flex items-end md:items-center justify-center overflow-hidden py-12 md:py-0 md:h-[819px]"
      aria-label="Apresentação Turquia Lanches"
    >
      {/* Fundo dinâmico desktop — crossfade, sem mix-blend, sem opacity reduzida */}
      <div className="absolute inset-0 w-full h-full bg-surface-container hidden md:block">
        {SLIDES.map((slide, i) => {
          if (!hydrated && i > 0) return null
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 w-full h-full bg-cover transition-opacity duration-[1600ms] ease-in-out ${
                i === active ? 'opacity-100 hero-kenburns' : 'opacity-0'
              }`}
              role="img"
              aria-label={slide.label}
              aria-hidden={i !== active}
              style={{ backgroundImage: `url('${slide.src}')`, backgroundPosition: slide.position }}
            />
          )
        })}
      </div>

      {/* Fundo mobile — estático, full-bleed */}
      <div
        className="absolute inset-0 w-full h-full bg-cover md:hidden"
        role="img"
        aria-label="Batatas fritas artesanais da Turquia Lanches"
        style={{ backgroundImage: `url('${imgHeroFries}')`, backgroundPosition: 'center' }}
      />

      {/* Overlay desktop — gradiente localizado à esquerda */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/25 to-transparent hidden md:block pointer-events-none"
        aria-hidden="true"
      />

      {/* Scrim mobile — base → dissolvendo */}
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-background/95 via-background/85 to-background/35 md:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-full px-4 lg:px-20 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20">
          {/* Eyebrow — coerente com a tag do Hero do Cardápio */}
          <span className="section-eyebrow mb-4" aria-hidden="true">
            Maricá · RJ
          </span>

          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-stack-tight drop-shadow-md">
            Fome de Leão?
            <br />
            <span className="text-primary">Lanche Especial.</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-loose max-w-[300px] md:max-w-lg font-medium drop-shadow-sm hero-tagline">
            Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da
            cidade te espera.
          </p>

          <div className="flex flex-col sm:flex-row gap-gutter w-full sm:w-auto">
            <Button to="/cardapio" size="lg" className="w-full sm:w-auto rounded-xl ambient-shadow">
              <span className="material-symbols-outlined" data-weight="fill" aria-hidden="true">
                shopping_cart
              </span>
              PEÇA AGORA
            </Button>
            {/* Secundário: usa tokens do DS, sem backdrop-blur decorativo */}
            <Button
              to="/cardapio"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto rounded-xl border-outline/60 bg-surface-container-low/80 text-on-background"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                restaurant_menu
              </span>
              VER CARDÁPIO
            </Button>
          </div>
        </div>

        {/* Dots de navegação do slideshow — orientação contextual, desktop only */}
        <div
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2"
          role="tablist"
          aria-label="Slides do hero"
        >
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}: ${slide.label}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-primary' : 'w-2 bg-on-background/30 hover:bg-on-background/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
