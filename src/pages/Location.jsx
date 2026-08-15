import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import ContactCard from '../components/location/ContactCard'
import MapEmbed from '../components/location/MapEmbed'
import { BUSINESS_INFO } from '../data/contact'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

function Location() {
  return (
    <>
      <section className="bg-[#faf7f2] px-5 py-14 md:px-margin-desktop md:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <div>
            <span className="section-eyebrow">Parque Nanci · Maricá</span>
            <h1 className="display-balance max-w-[9ch] text-[clamp(3.4rem,7vw,6.8rem)] font-extrabold leading-[0.88] tracking-[-0.06em] text-on-surface">
              Turquia Lanches.<span className="block text-primary">Perto de você.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-on-surface/65 md:text-lg">
              O link disponível abre a ficha “Turquia Lanches - Parque Nanci” no Google Maps. Confira o destino no aplicativo antes de iniciar a rota.
            </p>
            <Button
              href={BUSINESS_INFO.channels.maps.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="editorialPrimary"
              size="md"
              className="mt-8 gap-3 text-sm font-extrabold"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" />
              Como chegar
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="mt-5 flex items-center gap-2 text-xs text-on-surface/70">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Endereço completo ainda não confirmado
            </p>
          </div>
          <MapEmbed />
        </div>
      </section>
      <Reveal className="mx-auto max-w-[1280px] px-5 py-16 md:px-margin-desktop md:py-24">
        <ContactCard />
      </Reveal>
    </>
  )
}

export default Location
