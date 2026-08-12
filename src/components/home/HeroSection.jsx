import { ArrowRight, MapPin, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import imgHeroFries from '../../assets/images/hero/hero-fries.webp'
import imgHeroFriesFallback from '../../assets/images/hero/hero-fries.jpg'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-container-low">
      <div className="mx-auto grid min-h-[640px] max-w-[1280px] items-center gap-10 px-4 py-12 md:min-h-[680px] md:grid-cols-[1.05fr_0.95fr] md:px-margin-desktop md:py-20">
        <div className="relative z-10 max-w-2xl">
          <span className="section-eyebrow">Turquia Lanches · Maricá</span>
          <h1 className="max-w-[12ch] font-display-xl-mobile text-display-xl-mobile leading-[1.02] text-on-background md:font-display-xl md:text-[64px]">
            Fartura de bairro,
            <span className="block text-primary">sem pose.</span>
          </h1>
          <p className="mt-6 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            Estamos organizando cardápio, preços e canais oficiais para publicar somente informações confirmadas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cardapio"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-label-bold text-on-primary transition-colors hover:bg-primary-hover"
            >
              Ver cardápio
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <ChannelAction
              channel={BUSINESS_INFO.channels.maps}
              icon={MapPin}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-outline bg-surface px-7 py-3 font-label-bold text-on-surface transition-colors hover:bg-surface-container"
            />
          </div>

          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={ShoppingBag}
            unavailableClassName="mt-5 inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant"
          >
            iFood não disponível / em construção
          </ChannelAction>
        </div>

        <figure className="relative mx-auto w-full max-w-[410px] overflow-hidden rounded-[28px] border-8 border-surface shadow-2xl md:rotate-2">
          <picture>
            <source srcSet={imgHeroFries} type="image/webp" />
            <img
              src={imgHeroFriesFallback}
              alt="Porção de batatas fritas em material promocional ilustrativo"
              width="410"
              height="512"
              className="h-auto w-full object-cover"
              fetchPriority="high"
            />
          </picture>
          <figcaption className="absolute bottom-3 right-3 rounded-full bg-on-surface/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-image">
            Imagem ilustrativa
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default HeroSection
