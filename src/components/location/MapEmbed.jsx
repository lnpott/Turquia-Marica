import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

function MapEmbed() {
  return (
    <a
      href={BUSINESS_INFO.channels.maps.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block min-h-[330px] overflow-hidden border-2 border-on-surface bg-surface-container-lowest shadow-[8px_8px_0_#fdc008] transition-all duration-tactile ease-tactile active:scale-[0.99] focus-visible:outline-offset-4 md:min-h-[440px] md:rotate-1"
      aria-label="Abrir a ficha Turquia Lanches - Parque Nanci no Google Maps (nova aba)"
    >
      <div className="absolute inset-0 editorial-grid bg-secondary-container" aria-hidden="true">
        <div className="absolute -right-12 top-12 h-52 w-52 rounded-full border-[18px] border-primary/15 transition-transform duration-smooth ease-smooth group-hover:scale-105 md:h-72 md:w-72" />
        <div className="absolute left-[16%] top-[36%] h-24 w-[68%] rotate-[-8deg] rounded-[50%] border-b-4 border-dashed border-primary/50" />
        <MapPin className="absolute left-[48%] top-[34%] h-20 w-20 -translate-x-1/2 text-primary drop-shadow-[4px_4px_0_#fdc008] md:h-28 md:w-28" strokeWidth={2.4} />
      </div>
      <div className="absolute left-4 top-4 border-2 border-on-surface bg-secondary-container px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-on-surface">
        Ilustração · não é um mapa
      </div>
      <div className="mobile-map-action-clearance absolute inset-x-4 bottom-44 flex items-center justify-between gap-4 border-2 border-on-surface bg-background p-4 shadow-[4px_4px_0_#251913] md:bottom-4">
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
