import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

function MapEmbed() {
  return (
    <a
      href={BUSINESS_INFO.channels.maps.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-sm bg-[#e9e0d2] p-5 ring-1 ring-inset ring-[#d9cdbd] transition-all duration-smooth ease-smooth hover:-translate-y-1 hover:shadow-[0_18px_35px_-24px_rgba(33,22,13,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Abrir rota no Google Maps"
    >
      <div className="absolute inset-0 paper-texture transition-transform duration-smooth ease-smooth group-hover:scale-105 group-focus:scale-105" aria-hidden="true">
        <div className="absolute -right-10 top-5 h-48 w-48 rounded-full border border-primary/20" />
        <div className="absolute left-[10%] top-[32%] h-24 w-[76%] rotate-[-8deg] rounded-[50%] border-b-2 border-dashed border-primary/35" />
        <MapPin className="absolute left-1/2 top-[28%] h-20 w-20 -translate-x-1/2 text-primary transition-transform duration-smooth ease-smooth group-hover:-translate-y-1 group-focus:-translate-y-1" strokeWidth={1.5} />
      </div>
      <div className="relative text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface/55">
        Prévia de localização
      </div>
      <div className="relative mt-auto inline-flex w-fit items-center gap-2 rounded-sm bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary transition-transform duration-tactile group-hover:translate-x-1 group-focus:translate-x-1">
        <Navigation className="h-4 w-4" aria-hidden="true" />
        Abrir rota
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
    </a>
  )
}

export default MapEmbed
