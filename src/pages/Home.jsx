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
      <section aria-label="Informações rápidas" className="bg-on-surface px-4 py-7 text-on-image md:px-margin-desktop">
        <ul className="mx-auto grid max-w-[1280px] gap-3 md:grid-cols-3 md:gap-0">
          {FACTS.map(({ Icon, title, value }) => (
            <li key={title} className="flex items-center gap-3 border-on-image/20 py-2 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-surface">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-container">{title}</p>
                <p className="font-body-md text-sm font-medium text-on-image/85">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <MenuHighlights compact />
      <section id="sobre" className="scroll-mt-24 border-t-2 border-on-surface bg-primary px-4 py-16 text-on-primary md:px-margin-desktop md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-[0.55fr_1.45fr] md:items-start">
          <span className="inline-flex w-fit border border-on-primary/50 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-secondary-container">Sobre a casa</span>
          <div className="border-l-4 border-secondary-container pl-5 md:pl-8">
            <h2 className="display-balance max-w-[16ch] font-headline-lg text-[36px] font-extrabold leading-[1.02] tracking-[-0.035em] text-on-primary md:text-[52px]">Bairro no coração. Fartura na mesa.</h2>
            <p className="mt-6 max-w-2xl font-body-lg text-base text-on-primary/80 md:text-lg">
              Uma presença local construída com honestidade: primeiro a experiência certa, depois cada informação confirmada.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
