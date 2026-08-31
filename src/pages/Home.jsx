import { Clock, Instagram } from 'lucide-react'
import AboutSection from '../components/home/AboutSection'
import HeroSection from '../components/home/HeroSection'
import LocationSection from '../components/home/LocationSection'
import MenuSection from '../components/menu/MenuSection'
import ReviewsSection from '../components/reviews/ReviewsSection'
import IconIfood from '../components/ui/IconIfood'
import Reveal from '../components/ui/Reveal'
import { BUSINESS_INFO } from '../data/contact'

const FACTS = [
  {
    Icon: IconIfood,
    title: 'Pedidos',
    value: (
      <>
        Pedir no <span className="font-bold text-[#EA1D2C]">iFood</span>
      </>
    ),
    href: BUSINESS_INFO.channels.ifood.url,
    external: true,
    ariaLabel: 'Pedir no iFood',
  },
  {
    Icon: Instagram,
    title: 'Instagram',
    value: BUSINESS_INFO.channels.instagram.handle,
    href: BUSINESS_INFO.channels.instagram.url,
    external: true,
    ariaLabel: 'Instagram da Turquia Lanches — @turquialanches',
  },
  {
    Icon: Clock,
    title: 'Funcionamento',
    value: BUSINESS_INFO.hours.value,
    href: '#localizacao',
    external: false,
    ariaLabel: 'Ver horário e localização',
  },
]

function Home() {
  return (
    <div id="topo">
      <HeroSection />
      <Reveal as="section" aria-label="Informações rápidas" className="bg-[#faf7f2]/[0.35] px-5 py-10 md:px-margin-desktop">
        <ul className="mx-auto grid max-w-[1280px] gap-8 border-y border-[#e8e0d4] py-8 md:grid-cols-3 md:gap-0">
          {FACTS.map(({ Icon, title, value, href, external, ariaLabel }) => {
            const content = (
              <>
                <span className="mt-1 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{title}</p>
                  <p className="mt-1 text-sm font-medium text-on-surface/75">{value}</p>
                </div>
              </>
            )

            return (
              <li key={title} className="md:border-l md:border-[#e8e0d4] md:px-7 md:first:border-l-0 md:first:pl-0">
                <a
                  href={href}
                  aria-label={ariaLabel}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 rounded-lg transition-colors duration-tactile ease-tactile hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {content}
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>
      <MenuSection />
      <AboutSection />
      <LocationSection />
      <ReviewsSection />
    </div>
  )
}

export default Home
