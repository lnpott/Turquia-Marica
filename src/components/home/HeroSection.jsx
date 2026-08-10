import { useEffect, useState } from 'react'
import Button from '../ui/Button'

// LOTE 11 — Hero da Home.
// O hero anterior usava uma URL QUEBRADA (HTTP 400) vinda das variantes
// index.html_homepage_production_fixed/_final_audit. A URL original e funcional
// está em turquia_lanches_homepage_production/code.html e index.html_homepage_production
// (fonte #1 da hierarquia: HTML de produção local) — é a usada aqui.
const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSbrOVTgKWPF_toT_AT1l-XXa7jBf7Hm69j4Qd2sl1ggWLvLxsd6X5y2jGBtQUG2ZRhO-6UpGGI6wCRfIq0cRGvByCuUkYx56OJr3ZAJjZ7YMyV07x67zq02NUQIrqC9wYDTRxh-Sd-jqhUyQ8el0Gf7SK-rTv2OKo7DE3ddsc77Nh4IKbjPdSE1JE1UT4FSoqyHwXTHZpxu-Q4b5r9ZU5dAX5-Ceu7p76VRfZ1j3zQTrRhqrMEKPjO7QSvHsIGq4UAfs'

// Slides 2 e 3 do crossfade — imagens já aprovadas no HTML da Homepage final
// auditada (Ambiente "Nosso Espaço" e galeria "Momentos Turquia"), mantendo a
// atmosfera real da lanchonete. Carregadas somente após a 1ª (preload da 1ª).
const SLIDE_AMBIENCE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAjG-GFqXqQ9Q0kWexmiN6naXR6z3rSm5B0hUaGx5mLhSMWgRnZspdzwJzj_2YAf11HYAkFNQk8pjfHbKDJftwXh5oVNrXpvl8VUOmg0EefNbuM4v-1vZKb3ccXmokyXxerfr4qXPZd-Q5r7HUFpxtTbpmaJjaAvAYX3OY6K1vxHvLvypOFvHFnZEKMZGrV8aL8hgP-6b42OfuXCw9el8c4dgKvvbMHRMacvez3KJBNa3lmCOk24grNaV2aV_0IgptC-oY'
const SLIDE_GALLERY =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC34jlTjYvblPnWg7zOI7PVTP71KJfm46WsNw_sU3X1HKEtYcCDezYnLsvgn5h6pJRPCKyfMQZdw084Yv7Ds1UAC5OYRxhLWRYN75cqu0IT4LunPqLhtyqp_sxwfN2DnVIjL0FA0cG6ZOqHjRjfVN1k2ZLKSul68BqBTP47loJqxm4xUK9DIifPohzTcQkJeGwv_rBIT054Rao_vRixkMqLGJu3mPIDT7NoRZRImtgZ62e8TKSn3cX5moOXmECv3lm7J-s'

const SLIDES = [
  { src: HERO_IMAGE, label: 'Hero Image' },
  { src: SLIDE_AMBIENCE, label: 'Ambiente Turquia Lanches' },
  { src: SLIDE_GALLERY, label: 'Momentos Turquia' },
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
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden py-12 md:py-0 md:h-[819px]">
      {/* Fundo dinâmico (desktop): crossfade entre imagens aprovadas */}
      <div className="absolute inset-0 w-full h-full bg-surface-container hidden md:block">
        {SLIDES.map((slide, i) => {
          const isActive = i === active
          // Antes da hidratação apenas o slide 1 existe no DOM (preload da 1ª).
          if (!hydrated && i > 0) return null
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 w-full h-full bg-cover bg-center mix-blend-multiply transition-opacity duration-[1600ms] ease-in-out ${
                isActive ? 'opacity-70 hero-kenburns' : 'opacity-0'
              }`}
              role="img"
              aria-label={slide.label}
              aria-hidden={!isActive}
              style={{ backgroundImage: `url('${slide.src}')` }}
            />
          )
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent hidden md:block"></div>

      <div className="relative z-10 w-full px-4 lg:px-20 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 bg-background/50 backdrop-blur-sm p-8 rounded-2xl md:bg-transparent md:backdrop-blur-none md:p-0 overflow-hidden">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-stack-tight drop-shadow-md">
            Fome de Leão?
            <br /> <span className="text-primary">Lanche Especial.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-loose max-w-lg font-medium bg-background/30 px-2 rounded">
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
        {/* Mobile: composição aprovada (imagem do hero abaixo do texto) — agora
            com a imagem original de produção, corrigida no Lote 11. */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:hidden block">
          <img
            alt="Burger"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            src={HERO_IMAGE}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
