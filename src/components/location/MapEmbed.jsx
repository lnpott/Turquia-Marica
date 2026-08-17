import { Compass, ExternalLink, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'

function MapGraphic() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="h-full w-full object-cover transition-transform duration-smooth ease-smooth group-hover:scale-[1.03] group-focus:scale-[1.03]"
        viewBox="0 0 600 320"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="pinShadow" x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#251913" floodOpacity="0.35" />
          </filter>
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#251913" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Base Cartográfica (Terreno) */}
        <rect width="600" height="320" fill="#ede3d4" />

        {/* Área Verde / Parque Nanci (Sutil tom sálvia) */}
        <path
          d="M 380 -10 C 440 20, 520 15, 610 50 L 610 130 C 530 140, 460 110, 390 90 Z"
          fill="#dbe4d2"
          opacity="0.9"
        />
        <text
          x="500"
          y="65"
          fill="#788a6d"
          fontSize="9"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          PARQUE NANCI
        </text>

        {/* Orla da Lagoa de Maricá (Sutil tom aquático) */}
        <path
          d="M -10 290 Q 200 275, 420 295 T 610 290 L 610 330 L -10 330 Z"
          fill="#d3dede"
          opacity="0.75"
        />
        <text
          x="300"
          y="310"
          fill="#6e8484"
          fontSize="8"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.1em"
          textAnchor="middle"
        >
          ORLA / LAGOA DE MARICÁ
        </text>

        {/* Quadras / Blocos Urbanos */}
        <g fill="#dfd2bf" opacity="0.65">
          <rect x="25" y="25" width="130" height="75" rx="5" />
          <rect x="180" y="25" width="170" height="75" rx="5" />
          <rect x="25" y="125" width="130" height="70" rx="5" />
          <rect x="180" y="125" width="120" height="70" rx="5" />
          <rect x="325" y="125" width="150" height="70" rx="5" />
          <rect x="500" y="145" width="85" height="115" rx="5" />
          <rect x="25" y="218" width="130" height="55" rx="5" />
          <rect x="180" y="218" width="120" height="55" rx="5" />
          <rect x="325" y="218" width="150" height="55" rx="5" />
        </g>

        {/* Casings das Ruas (Contorno das vias) */}
        <g fill="none" stroke="#cfc1ae" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas Principais */}
          <path d="M 165 -10 L 165 330" strokeWidth="22" />
          <path d="M -10 110 L 610 110" strokeWidth="20" />
          <path d="M 310 110 L 310 330" strokeWidth="18" />
          {/* Ruas Secundárias */}
          <path d="M -10 205 L 610 205" strokeWidth="14" stroke="#d6c8b7" />
          <path d="M 485 -10 L 485 330" strokeWidth="14" stroke="#d6c8b7" />
        </g>

        {/* Fills das Ruas (Leito das vias em branco e off-white) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas Principais */}
          <path d="M 165 -10 L 165 330" strokeWidth="18" stroke="#fffdfa" />
          <path d="M -10 110 L 610 110" strokeWidth="16" stroke="#fffdfa" />
          <path d="M 310 110 L 310 330" strokeWidth="14" stroke="#fffdfa" />
          {/* Ruas Secundárias */}
          <path d="M -10 205 L 610 205" strokeWidth="10" stroke="#f8f4ec" />
          <path d="M 485 -10 L 485 330" strokeWidth="10" stroke="#f8f4ec" />
        </g>

        {/* Linhas Centrais Tracejadas nas Vias Principais */}
        <g fill="none" stroke="#dcd0be" strokeWidth="1.2" strokeDasharray="6 5">
          <path d="M 165 5 L 165 315" />
          <path d="M 5 110 L 600 110" />
        </g>

        {/* Nomes das Vias Cartográficas */}
        <text
          x="395"
          y="105"
          fill="#867464"
          fontSize="8.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          R. CANARINHOS
        </text>
        <text
          x="85"
          y="105"
          fill="#867464"
          fontSize="8.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          R. CANARINHOS
        </text>
        <text
          x="160"
          y="55"
          fill="#948373"
          fontSize="8"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.06em"
          transform="rotate(-90, 160, 55)"
          textAnchor="middle"
        >
          AV. PRINCIPAL
        </text>
        <text
          x="305"
          y="260"
          fill="#948373"
          fontSize="7.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.06em"
          transform="rotate(-90, 305, 260)"
          textAnchor="middle"
        >
          ACESSO PARQUE
        </text>

        {/* Marcador do Estabelecimento (Pin & Ripple) */}
        <g transform="translate(370, 110)">
          {/* Sombra de chão */}
          <ellipse cx="0" cy="4" rx="14" ry="5" fill="#251913" opacity="0.22" />

          {/* Anel de radar / pulso ambiente */}
          <circle cx="0" cy="4" r="14" fill="none" stroke="#ae0011" strokeWidth="2" opacity="0.3" />

          {/* Pin Cartográfico estilizado em Vermelho Primário */}
          <path
            d="M 0 -28 C -11 -28 -18 -20 -18 -10 C -18 2 0 4 0 4 C 0 4 18 2 18 -10 C 18 -20 11 -28 0 -28 Z"
            fill="#ae0011"
            stroke="#ffffff"
            strokeWidth="2"
            filter="url(#pinShadow)"
          />
          <circle cx="0" cy="-12" r="4.5" fill="#ffffff" />

          {/* Badge / Callout acima do Pin */}
          <g transform="translate(0, -42)" filter="url(#badgeShadow)">
            <rect x="-60" y="-11" width="120" height="22" rx="11" fill="#251913" stroke="#d9cdbd" strokeWidth="1" />
            <polygon points="0,15 -4,11 4,11" fill="#251913" />
            <circle cx="-47" cy="0" r="3" fill="#fdc008" />
            <text
              x="-38"
              y="3.5"
              fill="#ffffff"
              fontSize="8.5"
              fontFamily="'DM Sans', sans-serif"
              fontWeight="700"
              letterSpacing="0.06em"
            >
              TURQUIA LANCHES
            </text>
          </g>
        </g>
      </svg>

      {/* Padrão Paper Texture tradicional sobre o mapa */}
      <div className="absolute inset-0 paper-texture opacity-60" />
    </div>
  )
}

function MapEmbed() {
  // Endereço oficial vindo da fonte única de dados, quebrado em linhas legíveis com tratamento seguro:
  // "R. Canarinhos, 663" / "Parque Nanci · Maricá - RJ" / "24914-160".
  const address = BUSINESS_INFO.location.value
  const dash = address.indexOf(' - ')
  const street = dash !== -1 ? address.slice(0, dash) : address
  const remainder = dash !== -1 ? address.slice(dash + 3) : ''
  const [neighborhood, region, cep] = remainder ? remainder.split(', ') : ['Parque Nanci', 'Maricá - RJ', '24914-160']

  return (
    <a
      href={BUSINESS_INFO.channels.maps.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-sm bg-[#e9e0d2] p-4 sm:p-5 ring-1 ring-inset ring-[#d9cdbd] transition-all duration-smooth ease-smooth hover:-translate-y-1 hover:shadow-[0_18px_35px_-24px_rgba(33,22,13,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Abrir rota no Google Maps"
    >
      {/* Ilustração Cartográfica Autêntica */}
      <MapGraphic />

      {/* Rosa dos Ventos / Indicador de Bússola no topo direito */}
      <div className="relative z-10 flex items-start justify-between gap-3">
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

      {/* CTA de Ação no Rodapé */}
      <div className="relative z-10 mt-auto flex justify-end pt-4">
        <div className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-on-primary shadow-sm transition-all duration-tactile group-hover:translate-x-1 group-hover:bg-primary-hover group-focus:translate-x-1">
          <Navigation className="h-4 w-4" aria-hidden="true" />
          <span>Abrir rota</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
      </div>
    </a>
  )
}

export default MapEmbed
