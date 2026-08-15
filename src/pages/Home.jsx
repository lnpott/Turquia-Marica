import { Instagram, ShieldCheck, ShoppingBag } from 'lucide-react'
import HeroSection from '../components/home/HeroSection'
import LocationSection from '../components/home/LocationSection'
import MenuSection from '../components/menu/MenuSection'
import ReviewsSection from '../components/reviews/ReviewsSection'
import Reveal from '../components/ui/Reveal'

const FACTS = [
  { Icon: ShoppingBag, title: 'Cardápio', value: 'Informações oficiais em confirmação' },
  { Icon: Instagram, title: 'Canal disponível', value: 'Instagram oficial informado' },
  { Icon: ShieldCheck, title: 'Compromisso', value: 'Só publicamos dados confirmados' },
]

function Home() {
  return (
    <div id="topo">
      <HeroSection />
      <Reveal as="section" aria-label="Informações rápidas" className="bg-[#faf7f2] px-5 py-10 md:px-margin-desktop">
        <ul className="mx-auto grid max-w-[1280px] gap-8 border-y border-[#e8e0d4] py-8 md:grid-cols-3 md:gap-0">
          {FACTS.map(({ Icon, title, value }) => (
            <li key={title} className="flex items-start gap-4 md:border-l md:border-[#e8e0d4] md:px-7 md:first:border-l-0 md:first:pl-0">
              <span className="mt-1 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{title}</p>
                <p className="mt-1 text-sm font-medium text-on-surface/75">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <MenuSection />
      <Reveal as="section" id="sobre" className="scroll-mt-24 bg-[#faf7f2] px-5 py-20 md:px-margin-desktop md:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[0.45fr_1.55fr] md:items-start">
          <span className="section-eyebrow">Sobre a casa</span>
          <div>
            <h2 className="display-balance max-w-[14ch] text-[clamp(2.7rem,6vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.055em] text-on-surface">Bairro no coração.<span className="text-primary"> Fartura na mesa.</span></h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-surface/65 md:text-xl">
              Uma presença local construída com honestidade: primeiro a experiência certa, depois cada informação confirmada.
            </p>
          </div>
        </div>
      </Reveal>
      <LocationSection />
      <ReviewsSection />
    </div>
  )
}

export default Home
