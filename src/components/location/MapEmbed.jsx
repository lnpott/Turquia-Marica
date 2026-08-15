import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

function MapEmbed() {
  return (
    <a
      href={BUSINESS_INFO.channels.maps.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-8 flex min-h-[390px] flex-col justify-between overflow-hidden rounded-sm bg-[#e9e0d2] p-5 transition-all duration-smooth ease-smooth hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] focus-visible:outline-offset-4 md:mt-0 md:min-h-[520px] md:p-7"
      aria-label="Abrir a ficha Turquia Lanches - Parque Nanci no Google Maps (nova aba)"
    >
      <div className="absolute inset-0 paper-texture" aria-hidden="true">
        <div className="absolute -right-16 top-8 h-64 w-64 rounded-full border border-primary/20 transition-transform duration-smooth ease-smooth group-hover:scale-110 md:h-96 md:w-96" />
        <div className="absolute left-[10%] top-[34%] h-28 w-[76%] rotate-[-8deg] rounded-[50%] border-b-2 border-dashed border-primary/35" />
        <MapPin className="absolute left-1/2 top-[34%] h-20 w-20 -translate-x-1/2 text-primary md:h-28 md:w-28" strokeWidth={1.5} />
      </div>
      <div className="relative text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface/55">
        Ilustração · não é um mapa
      </div>
      <div className="relative flex flex-col items-start justify-between gap-3 bg-[#faf7f2] p-5 shadow-sm sm:flex-row sm:items-center">
        <span className="flex items-center gap-3 font-label-bold text-on-surface">
          <Navigation className="h-5 w-5 text-primary" aria-hidden="true" />
          Conferir ficha
        </span>
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          Google Maps
          <ExternalLink className="h-4 w-4 text-primary" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}

export default MapEmbed
