import { Compass, ExternalLink, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

/* Mapa real via OpenStreetMap — coordenadas validadas pelo responsável.
   Bbox: ±0.005° ao redor do ponto central (raio visível ~500 m). */
const OSM_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=-42.8529579,-22.9265763,-42.8429579,-22.9165763&layer=mapnik&marker=-22.9215763,-42.8479579'

function MapEmbed() {
  const address = BUSINESS_INFO.location.value
  const dash = address.indexOf(' - ')
  const street = dash !== -1 ? address.slice(0, dash) : address
  const remainder = dash !== -1 ? address.slice(dash + 3) : ''
  const [neighborhood, region, cep] = remainder
    ? remainder.split(', ')
    : ['Parque Nanci', 'Maricá - RJ', '24914-160']

  return (
    <div className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-sm bg-[#e9e0d2] p-4 sm:p-5 ring-1 ring-inset ring-on-surface/15 transition-all duration-smooth ease-smooth hover:-translate-y-1 hover:shadow-md">
      {/* Mapa real OpenStreetMap (interativo: pan/zoom) — duotone editorial via CSS filter */}
      <div className="map-duotone absolute inset-0 overflow-hidden rounded-sm">
        <iframe
          src={OSM_EMBED_URL}
          title="Mapa de localização — Turquia Lanches"
          loading="lazy"
          style={{ border: 0 }}
          className="h-full w-full"
        />
      </div>

      {/* Camadas flutuantes sobre o mapa — pointer-events:none para não bloquear pan/zoom */}
      <div className="relative z-10 flex items-start justify-between gap-3 pointer-events-none">
        {/* Card Flutuante de Endereço */}
        <div className="relative z-10 flex flex-col gap-1 rounded-sm bg-[#faf7f2]/90 p-3 shadow-sm ring-1 ring-[#d9cdbd] backdrop-blur-sm transition-transform duration-smooth group-hover:bg-[#faf7f2]/95 max-w-[260px]">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <span>Localização</span>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold leading-snug text-on-surface">{street}</p>
            <p className="text-[11px] sm:text-xs text-on-surface/75">{neighborhood} · {region}</p>
            <p className="mt-0.5 text-[10px] text-on-surface/50 font-medium">{cep}</p>
          </div>
        </div>

        {/* Bússola / Indicador N */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#faf7f2]/85 shadow-sm ring-1 ring-[#d9cdbd] backdrop-blur-sm text-[10px] font-bold text-on-surface/70"
          aria-hidden="true"
          title="Orientação Norte"
        >
          <Compass className="h-4 w-4 text-primary" strokeWidth={2} />
        </div>
      </div>

      {/* CTA "Abrir rota" — pointer-events:auto restaurado para interação */}
      <div className="relative z-10 mt-auto flex justify-end pointer-events-auto">
        <a
          href={BUSINESS_INFO.channels.maps.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir rota no Google Maps"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary shadow-sm transition-all duration-tactile group-hover:translate-x-1 group-hover:bg-primary-hover group-focus:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          <span>Abrir rota</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default MapEmbed
