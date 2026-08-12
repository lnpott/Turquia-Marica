import { ExternalLink, MapPin } from 'lucide-react'
import mapImage from '../../assets/images/location/map.png'
import { BUSINESS_INFO } from '../../data/contact'

function MapEmbed() {
  return (
    <a
      href={BUSINESS_INFO.channels.maps.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block min-h-[400px] overflow-hidden rounded-2xl bg-surface-container-lowest shadow-lg focus-visible:outline-offset-4"
      aria-label="Abrir a localização da Turquia Lanches no Google Maps"
    >
      <img
        src={mapImage}
        alt="Mapa ilustrativo da região da Turquia Lanches em Parque Nanci, Maricá"
        width="512"
        height="512"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/15 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-xl bg-surface p-4 shadow-lg">
        <span className="flex items-center gap-3 font-label-bold text-on-surface">
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          Abrir no Google Maps
        </span>
        <ExternalLink className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
    </a>
  )
}

export default MapEmbed
