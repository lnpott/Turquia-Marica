import { Navigation, ExternalLink } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

/* Mapa OpenStreetMap via iframe — zero dependência, zero conta, zero manutenção.
   Coordenadas validadas: -22.9215763, -42.8479579. Não alterar. */
const OSM_SRC =
  'https://www.openstreetmap.org/export/embed.html' +
  '?bbox=-42.8629579%2C-22.9315763%2C-42.8329579%2C-22.9115763' +
  '&layer=mapnik' +
  '&marker=-22.9215763%2C-42.8479579'

function MapEmbed() {
  return (
    <div className="group overflow-hidden rounded-sm ring-1 ring-inset ring-[#d9cdbd] shadow-sm transition-all duration-smooth ease-smooth hover:shadow-[0_18px_35px_-24px_rgba(33,22,13,0.7)]">
      <div className="relative h-[300px] w-full sm:h-[380px]">
        <iframe
          src={OSM_SRC}
          title="Localização da Turquia Lanches no mapa"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer"
          aria-label="Mapa da região do Parque Nanci em Maricá com a localização da Turquia Lanches"
        />
      </div>

      {/* Barra inferior: contexto + CTA + atribuição legal */}
      <div className="border-t border-[#d9cdbd]/70 bg-[#faf7f2]/95">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <p className="min-w-0 truncate text-xs font-bold uppercase tracking-[0.12em] text-on-surface/70">
            Parque Nanci · Maricá
          </p>
          <a
            href={BUSINESS_INFO.channels.maps.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir rota no Google Maps"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary shadow-sm transition-all duration-tactile ease-tactile hover:bg-primary-hover active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            <span>Abrir rota</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        {/* Atribuição obrigatória OSM */}
        <p className="px-4 pb-2.5 text-[10px] leading-relaxed text-on-surface/70">
          ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#251913]/30 underline-offset-2 transition-colors hover:text-primary"
          >
            OpenStreetMap
          </a>{' '}
          contributors
        </p>
      </div>
    </div>
  )
}

export default MapEmbed