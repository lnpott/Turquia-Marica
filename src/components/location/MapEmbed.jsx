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
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#251913" floodOpacity="0.35" />
          </filter>
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#251913" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Base Cartográfica (Terreno do Bairro) */}
        <rect width="600" height="320" fill="#eae0d0" />

        {/* Orla e Lagoa de Maricá (Raio sul ~500m) */}
        <path
          d="M -10 260 Q 140 245, 300 258 T 610 235 L 610 330 L -10 330 Z"
          fill="#d0dddc"
          opacity="0.85"
        />
        <path
          d="M -10 260 Q 140 245, 300 258 T 610 235"
          stroke="#dfd4c4"
          strokeWidth="6"
          fill="none"
        />
        <text
          x="320"
          y="298"
          fill="#5f7777"
          fontSize="7.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.12em"
          textAnchor="middle"
        >
          ORLA &amp; LAGOA DE MARICÁ
        </text>

        {/* Área Verde do Parque Nanci (Parque & Lazer no raio leste ~400m) */}
        <path
          d="M 435 15 C 485 5, 545 10, 595 25 L 595 155 C 540 165, 480 155, 435 135 Z"
          fill="#d5e3cd"
          opacity="0.9"
        />
        {/* Lago interno / Pista do Parque */}
        <ellipse cx="515" cy="80" rx="30" ry="18" fill="#c3d5d5" opacity="0.75" />
        <text
          x="515"
          y="50"
          fill="#6d8062"
          fontSize="8"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          PARQUE NANCI (LAZER)
        </text>

        {/* Grade de Quadras Urbanas (Raio amplo de 500m - ~25 quadras) */}
        <g fill="#ded1be" opacity="0.75">
          {/* Fileira 1 (Norte) */}
          <rect x="15" y="15" width="55" height="40" rx="3" />
          <rect x="85" y="15" width="60" height="40" rx="3" />
          <rect x="165" y="15" width="65" height="40" rx="3" />
          <rect x="250" y="15" width="70" height="40" rx="3" />
          <rect x="340" y="15" width="75" height="40" rx="3" />

          {/* Fileira 2 */}
          <rect x="15" y="68" width="55" height="45" rx="3" />
          <rect x="85" y="68" width="60" height="45" rx="3" />
          <rect x="165" y="68" width="65" height="45" rx="3" />
          <rect x="250" y="68" width="70" height="45" rx="3" />
          <rect x="340" y="68" width="75" height="45" rx="3" />

          {/* Fileira 3 (Entorno da R. Canarinhos) */}
          <rect x="15" y="126" width="55" height="45" rx="3" />
          <rect x="85" y="126" width="60" height="45" rx="3" />
          <rect x="165" y="126" width="65" height="45" rx="3" />
          <rect x="250" y="126" width="70" height="45" rx="3" />
          <rect x="340" y="126" width="75" height="45" rx="3" />
          <rect x="435" y="145" width="70" height="35" rx="3" />
          <rect x="520" y="145" width="65" height="35" rx="3" />

          {/* Fileira 4 */}
          <rect x="15" y="184" width="55" height="42" rx="3" />
          <rect x="85" y="184" width="60" height="42" rx="3" />
          <rect x="165" y="184" width="65" height="42" rx="3" />
          <rect x="250" y="184" width="70" height="42" rx="3" />
          <rect x="340" y="184" width="75" height="42" rx="3" />
          <rect x="435" y="192" width="70" height="34" rx="3" />
          <rect x="520" y="192" width="65" height="34" rx="3" />
        </g>

        {/* Casings das Ruas (Contornos da malha viária 500m) */}
        <g fill="none" stroke="#cfc1ae" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas Principais Estruturantes */}
          <path d="M 240 -10 L 240 330" strokeWidth="16" />
          <path d="M -10 120 L 610 120" strokeWidth="15" />
          <path d="M 425 -10 L 425 245" strokeWidth="13" />

          {/* Ruas Secundárias da Grade */}
          <path d="M -10 62 L 610 62" strokeWidth="9" stroke="#d7c9b8" />
          <path d="M -10 178 L 610 178" strokeWidth="9" stroke="#d7c9b8" />
          <path d="M -10 234 L 610 234" strokeWidth="9" stroke="#d7c9b8" />

          <path d="M 77 -10 L 77 330" strokeWidth="9" stroke="#d7c9b8" />
          <path d="M 155 -10 L 155 330" strokeWidth="9" stroke="#d7c9b8" />
          <path d="M 330 -10 L 330 330" strokeWidth="9" stroke="#d7c9b8" />
          <path d="M 510 140 L 510 240" strokeWidth="9" stroke="#d7c9b8" />
        </g>

        {/* Fills das Ruas (Leitos em branco e off-white) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas Principais */}
          <path d="M 240 -10 L 240 330" strokeWidth="12" stroke="#fffdfa" />
          <path d="M -10 120 L 610 120" strokeWidth="11" stroke="#fffdfa" />
          <path d="M 425 -10 L 425 245" strokeWidth="9" stroke="#fffdfa" />

          {/* Ruas Secundárias */}
          <path d="M -10 62 L 610 62" strokeWidth="6" stroke="#f8f4ec" />
          <path d="M -10 178 L 610 178" strokeWidth="6" stroke="#f8f4ec" />
          <path d="M -10 234 L 610 234" strokeWidth="6" stroke="#f8f4ec" />

          <path d="M 77 -10 L 77 330" strokeWidth="6" stroke="#f8f4ec" />
          <path d="M 155 -10 L 155 330" strokeWidth="6" stroke="#f8f4ec" />
          <path d="M 330 -10 L 330 330" strokeWidth="6" stroke="#f8f4ec" />
          <path d="M 510 140 L 510 240" strokeWidth="6" stroke="#f8f4ec" />
        </g>

        {/* Linha Central Tracejada da Avenida Principal */}
        <path d="M 240 5 L 240 315" fill="none" stroke="#dcd0be" strokeWidth="1" strokeDasharray="5 4" />
        <path d="M 5 120 L 600 120" fill="none" stroke="#dcd0be" strokeWidth="1" strokeDasharray="5 4" />

        {/* Rotulagem Cartográfica do Bairro (~500m) */}
        <text
          x="378"
          y="116"
          fill="#827060"
          fontSize="7.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          R. CANARINHOS
        </text>
        <text
          x="115"
          y="116"
          fill="#827060"
          fontSize="7.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          R. CANARINHOS
        </text>
        <text
          x="235"
          y="40"
          fill="#8f7d6e"
          fontSize="7"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.06em"
          transform="rotate(-90, 235, 40)"
          textAnchor="middle"
        >
          AV. PARQUE NANCI
        </text>
        <text
          x="115"
          y="174"
          fill="#9a8979"
          fontSize="6.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.05em"
          textAnchor="middle"
        >
          R. BEIJA-FLORES
        </text>
        <text
          x="115"
          y="58"
          fill="#9a8979"
          fontSize="6.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.05em"
          textAnchor="middle"
        >
          R. GAIVOTAS
        </text>
        <text
          x="420"
          y="200"
          fill="#8f7d6e"
          fontSize="6.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.05em"
          transform="rotate(-90, 420, 200)"
          textAnchor="middle"
        >
          ACESSO ORLA
        </text>

        {/* Indicador de Escala Métrica do Mapa (200m / Raio ~500m) */}
        <g transform="translate(20, 302)" opacity="0.8">
          <line x1="0" y1="0" x2="55" y2="0" stroke="#705e4e" strokeWidth="1.5" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#705e4e" strokeWidth="1.5" />
          <line x1="55" y1="-3" x2="55" y2="3" stroke="#705e4e" strokeWidth="1.5" />
          <text
            x="27.5"
            y="-3.5"
            fill="#705e4e"
            fontSize="6.5"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="700"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            200 m (Raio ~500m)
          </text>
        </g>

        {/* Marcador do Estabelecimento (Pin & Ripple localizado no 663 da R. Canarinhos) */}
        <g transform="translate(285, 120)">
          {/* Sombra de chão */}
          <ellipse cx="0" cy="3" rx="13" ry="4.5" fill="#251913" opacity="0.25" />

          {/* Anel de radar / pulso ambiente */}
          <circle cx="0" cy="3" r="14" fill="none" stroke="#ae0011" strokeWidth="1.75" opacity="0.35" />

          {/* Pin Cartográfico estilizado em Vermelho Primário */}
          <path
            d="M 0 -26 C -10 -26 -16 -18 -16 -9 C -16 2 0 3 0 3 C 0 3 16 2 16 -9 C 16 -18 10 -26 0 -26 Z"
            fill="#ae0011"
            stroke="#ffffff"
            strokeWidth="1.75"
            filter="url(#pinShadow)"
          />
          <circle cx="0" cy="-11" r="4" fill="#ffffff" />

          {/* Badge / Callout acima do Pin */}
          <g transform="translate(0, -38)" filter="url(#badgeShadow)">
            <rect x="-56" y="-10" width="112" height="20" rx="10" fill="#251913" stroke="#d9cdbd" strokeWidth="1" />
            <polygon points="0,14 -4,10 4,10" fill="#251913" />
            <circle cx="-44" cy="0" r="2.8" fill="#fdc008" />
            <text
              x="-36"
              y="3"
              fill="#ffffff"
              fontSize="8"
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
