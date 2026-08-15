import { ArrowRight, MapPin, ShoppingBag } from 'lucide-react'
import imgHeroFries from '../../assets/images/hero/hero-fries.webp'
import imgHeroFriesFallback from '../../assets/images/hero/hero-fries.jpg'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'
import Button from '../ui/Button'

function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-64px)] overflow-hidden bg-on-surface text-white md:min-h-[720px]">
      <picture className="absolute inset-0 -z-20">
        <source srcSet={imgHeroFries} type="image/webp" />
        <img src={imgHeroFriesFallback} alt="" width="1280" height="900" className="hero-ambient h-full w-full object-cover object-center" fetchpriority="high" />
      </picture>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(26,16,8,0.94)_0%,rgba(26,16,8,0.78)_48%,rgba(26,16,8,0.24)_100%)]" />
      <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-[1280px] items-end px-5 pb-16 pt-20 md:min-h-[720px] md:items-center md:px-margin-desktop md:py-24">
        <div className="relative z-10 max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-container before:h-px before:w-8 before:bg-secondary-container">Parque Nanci · Maricá</span>
          <h1 className="display-balance max-w-[10ch] text-[clamp(3.5rem,9vw,7.8rem)] font-extrabold leading-[0.82] tracking-[-0.07em] text-white">
            Turquia<span className="block text-secondary-container">Lanches.</span>
          </h1>
          <p className="hero-tagline mt-7 max-w-xl text-xl font-medium leading-snug text-white/90 md:text-2xl">
            Fartura sem pose.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/68 md:text-lg">
            Presença local, acolhimento e comida farta — uma experiência de Maricá feita sem enrolação.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              to="/cardapio"
              variant="editorialPrimary"
              size="lg"
            >
              Ver cardápio
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <ChannelAction
              channel={BUSINESS_INFO.channels.maps}
              icon={MapPin}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-white/10 px-7 py-3 font-label-bold uppercase tracking-[0.08em] text-white ring-1 ring-inset ring-white/35 backdrop-blur-sm transition-all duration-tactile ease-tactile hover:-translate-y-0.5 hover:bg-white hover:text-on-surface active:translate-y-0 active:scale-[0.98]"
            />
          </div>

          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={ShoppingBag}
            unavailableClassName="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/45 line-through"
          >
            iFood não disponível / em construção
          </ChannelAction>
        </div>
      </div>
      <p className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.16em] text-white/45">Fotografia ilustrativa</p>
    </section>
  )
}

export default HeroSection
