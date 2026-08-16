import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

function MapEmbed() {
  // Endereço oficial vindo da fonte única de dados, quebrado em linhas legíveis:
  // "R. Canarinhos, 663" / "Parque Nanci · Maricá - RJ" / "24914-160".
  const address = BUSINESS_INFO.location.value
  const dash = address.indexOf(' - ')
  const street = address.slice(0, dash)
  const [neighborhood, region, cep] = address.slice(dash + 3).split(', ')

  return (
    <a
      href={BUSINESS_INFO.channels.maps.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-sm bg-[#e9e0d2] p-5 ring-1 ring-inset ring-[#d9cdbd] transition-all duration-smooth ease-smooth hover:-translate-y-1 hover:shadow-[0_18px_35px_-24px_rgba(33,22,13,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Abrir rota no Google Maps"
    >
      <div className="absolute inset-0 paper-texture transition-transform duration-smooth ease-smooth group-hover:scale-105 group-focus:scale-105" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-on-surface">{street}</p>
            <p className="text-xs text-on-surface/65">{neighborhood} · {region}</p>
            <p className="mt-1 text-xs text-on-surface/45">{cep}</p>
          </div>
        </div>
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
