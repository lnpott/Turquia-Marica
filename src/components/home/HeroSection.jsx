import { ArrowRight, MapPin, ShoppingBag } from 'lucide-react'
import imgHeroFries from '../../assets/images/hero/hero-fries.webp'
import imgHeroFriesFallback from '../../assets/images/hero/hero-fries.jpg'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'
import Button from '../ui/Button'

function HeroSection() {
  return (
    <section className="editorial-grid relative overflow-hidden border-b-2 border-on-surface bg-background">
      <div className="mx-auto grid min-h-[620px] max-w-[1280px] items-center gap-10 px-4 py-10 md:min-h-[680px] md:grid-cols-[1.08fr_0.92fr] md:px-margin-desktop md:py-16">
        <div className="relative z-10 max-w-2xl">
          <span className="mb-5 inline-flex border-2 border-on-surface bg-secondary-container px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-on-surface shadow-[3px_3px_0_#251913]">Parque Nanci · Maricá</span>
          <h1 className="display-balance max-w-[10ch] font-display-xl-mobile text-[48px] font-extrabold leading-[0.9] tracking-[-0.055em] text-on-background sm:text-[58px] md:text-[76px]">
            Turquia Lanches.<span className="block text-primary">Fartura sem pose.</span>
          </h1>
          <p className="mt-7 max-w-lg border-l-4 border-primary pl-4 font-body-lg text-base font-medium leading-relaxed text-on-surface md:text-lg">
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-none border-2 border-on-surface bg-background px-7 py-3 font-label-bold uppercase tracking-wide text-on-surface transition-all duration-tactile ease-tactile hover:-translate-y-1 hover:bg-secondary-container active:translate-y-0 active:scale-95"
            />
          </div>

          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={ShoppingBag}
            unavailableClassName="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface/60"
          >
            iFood não disponível / em construção
          </ChannelAction>
        </div>

        <div className="relative mx-auto w-full max-w-[450px] before:absolute before:-inset-3 before:translate-x-2 before:translate-y-2 before:bg-secondary-container before:content-['']">
          <figure className="brand-stamp relative w-full overflow-hidden border-2 border-on-surface bg-on-surface p-2">
            <picture>
              <source srcSet={imgHeroFries} type="image/webp" />
              <img
                src={imgHeroFriesFallback}
                alt="Porção de batatas fritas em material promocional ilustrativo"
                width="410"
                height="512"
                className="aspect-[4/5] h-auto w-full object-cover"
                fetchPriority="high"
              />
            </picture>
            <figcaption className="absolute bottom-5 right-5 bg-secondary-container px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-on-surface">
              Imagem ilustrativa
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
