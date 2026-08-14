import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import ContactCard from '../components/location/ContactCard'
import MapEmbed from '../components/location/MapEmbed'
import { BUSINESS_INFO } from '../data/contact'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'

function Location() {
  return (
    <>
      <section className="editorial-grid border-b-2 border-on-surface bg-background px-4 py-10 md:px-margin-desktop md:py-16">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <div>
            <span className="mb-5 inline-flex border-2 border-on-surface bg-secondary-container px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-on-surface shadow-[3px_3px_0_#251913]">
              Parque Nanci · Maricá
            </span>
            <h1 className="display-balance max-w-[10ch] font-display-xl-mobile text-[48px] font-extrabold leading-[0.92] tracking-[-0.05em] text-on-surface md:text-[70px]">
              Turquia Lanches.<span className="block text-primary">Seu destino no bairro.</span>
            </h1>
            <p className="mt-6 max-w-xl border-l-4 border-primary pl-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
              O link disponível abre a ficha “Turquia Lanches - Parque Nanci” no Google Maps. Confira o destino no aplicativo antes de iniciar a rota.
            </p>
            <Button
              href={BUSINESS_INFO.channels.maps.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="editorialPrimary"
              size="md"
              className="mt-7 gap-3 text-sm font-extrabold shadow-[4px_4px_0_#fdc008]"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" />
              Como chegar
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Endereço completo ainda não confirmado
            </p>
          </div>
          <MapEmbed />
        </div>
      </section>
      <Reveal className="mx-auto max-w-[1280px] px-4 py-12 md:px-margin-desktop md:py-20">
        <ContactCard />
      </Reveal>
    </>
  )
}

export default Location
