import { Instagram, ShieldCheck, ShoppingBag } from 'lucide-react'
import AboutSection from '../components/home/AboutSection'
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
      <Reveal as="section" aria-label="Informações rápidas" className="bg-[#faf7f2]/[0.45] px-5 py-10 md:px-margin-desktop">
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
      <AboutSection />
      <LocationSection />
      <ReviewsSection />
    </div>
  )
}

export default Home
