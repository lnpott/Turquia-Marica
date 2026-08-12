import { Clock3, MapPin, ShieldCheck } from 'lucide-react'
import HeroSection from '../components/home/HeroSection'
import MenuHighlights from '../components/menu/MenuHighlights'
import { BUSINESS_INFO } from '../data/contact'

const FACTS = [
  { Icon: MapPin, title: 'Onde estamos', value: BUSINESS_INFO.location.value },
  { Icon: Clock3, title: 'Horários', value: 'Não disponível / em construção' },
  { Icon: ShieldCheck, title: 'Compromisso', value: 'Só publicamos dados confirmados' },
]

function Home() {
  return (
    <>
      <HeroSection />
      <section aria-label="Informações rápidas" className="border-y border-outline-variant bg-secondary-container px-4 py-6 md:px-margin-desktop">
        <ul className="mx-auto grid max-w-[1280px] gap-5 md:grid-cols-3">
          {FACTS.map(({ Icon, title, value }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-on-surface text-on-image">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-on-secondary-container">{title}</p>
                <p className="font-body-md font-medium text-on-background">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <MenuHighlights compact />
      <section id="sobre" className="scroll-mt-24 bg-surface-container-low px-4 py-16 md:px-margin-desktop md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-start">
          <span className="section-eyebrow">Sobre a casa</span>
          <div>
            <h2 className="max-w-[18ch] font-headline-lg text-headline-lg text-on-background">Uma presença local sendo construída com informação verdadeira.</h2>
            <p className="mt-5 max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
              O site funciona como catálogo e apresentação da marca. Pedidos serão encaminhados ao canal oficial quando ele estiver confirmado; não existe checkout próprio.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
