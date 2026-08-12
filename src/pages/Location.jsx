import { MapPin } from 'lucide-react'
import ContactCard from '../components/location/ContactCard'
import MapEmbed from '../components/location/MapEmbed'

function Location() {
  return (
    <>
      <section className="bg-primary px-4 py-16 text-on-primary md:px-margin-desktop md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-secondary-container">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Parque Nanci · Maricá/RJ
          </span>
          <h1 className="mt-4 max-w-[16ch] font-display-xl-mobile text-display-xl-mobile md:font-display-xl md:text-display-xl">Encontre a Turquia Lanches</h1>
          <p className="mt-5 max-w-2xl font-body-lg text-body-lg text-on-primary/85">
            O ponto no Google Maps está disponível. Endereço completo, telefone e horários ainda estão em construção.
          </p>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-8 px-4 py-16 md:grid-cols-2 md:px-margin-desktop md:py-24">
        <ContactCard />
        <MapEmbed />
      </div>
    </>
  )
}

export default Location
