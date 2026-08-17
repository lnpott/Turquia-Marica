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

        {/* Base Cartográfica (Terreno Regional ~1 km) */}
        <rect width="600" height="320" fill="#e8ded0" />

        {/* Lagoa de Maricá (Ampla enseada no raio sul/sudeste de 1 km) */}
        <path
          d="M -10 240 Q 120 220, 270 240 T 610 210 L 610 330 L -10 330 Z"
          fill="#cddcdc"
          opacity="0.9"
        />
        <path
          d="M -10 240 Q 120 220, 270 240 T 610 210"
          stroke="#ded3c2"
          strokeWidth="5"
          fill="none"
        />
        <text
          x="350"
          y="285"
          fill="#587272"
          fontSize="7"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.14em"
          textAnchor="middle"
        >
          LAGOA DE MARICÁ · ORLA PARQUE NANCI
        </text>

        {/* Área Verde do Parque Nanci (Complexo de Lazer ~1 km) */}
        <path
          d="M 450 65 C 500 55, 555 60, 595 75 L 595 185 C 545 195, 490 185, 450 165 Z"
          fill="#d1dfc8"
          opacity="0.9"
        />
        <ellipse cx="525" cy="125" rx="26" ry="14" fill="#bed3d3" opacity="0.75" />
        <text
          x="525"
          y="95"
          fill="#64785a"
          fontSize="7"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          PARQUE NANCI (LAZER)
        </text>

        {/* Rodovia RJ-106 / Amaral Peixoto (Ao norte no raio de 1 km) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Casing Rodovia */}
          <path d="M -10 22 Q 280 26, 610 18" stroke="#c2b29d" strokeWidth="16" />
          {/* Leito Rodovia Duplicada */}
          <path d="M -10 22 Q 280 26, 610 18" stroke="#fffdfa" strokeWidth="12" />
          {/* Canteiro Central */}
          <path d="M -10 22 Q 280 26, 610 18" stroke="#7a8c6e" strokeWidth="1.5" />
        </g>
        <text
          x="190"
          y="14"
          fill="#786655"
          fontSize="6.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          RODOVIA AMARAL PEIXOTO (RJ-106)
        </text>

        {/* Grade Densa de Quadras Urbanas (~45 quadras no raio de 1 km) */}
        <g fill="#ded1be" opacity="0.75">
          {/* Fileira 1 (Norte - próximo à RJ-106) */}
          <rect x="15" y="36" width="38" height="24" rx="2" />
          <rect x="60" y="36" width="42" height="24" rx="2" />
          <rect x="110" y="36" width="45" height="24" rx="2" />
          <rect x="165" y="36" width="48" height="24" rx="2" />
          <rect x="220" y="36" width="50" height="24" rx="2" />
          <rect x="280" y="36" width="52" height="24" rx="2" />
          <rect x="342" y="36" width="54" height="24" rx="2" />
          <rect x="406" y="36" width="54" height="24" rx="2" />

          {/* Fileira 2 */}
          <rect x="15" y="66" width="38" height="26" rx="2" />
          <rect x="60" y="66" width="42" height="26" rx="2" />
          <rect x="110" y="66" width="45" height="26" rx="2" />
          <rect x="165" y="66" width="48" height="26" rx="2" />
          <rect x="220" y="66" width="50" height="26" rx="2" />
          <rect x="280" y="66" width="52" height="26" rx="2" />
          <rect x="342" y="66" width="54" height="26" rx="2" />
          <rect x="406" y="66" width="36" height="26" rx="2" />

          {/* Fileira 3 (Miolo / R. Canarinhos) */}
          <rect x="15" y="98" width="38" height="28" rx="2" />
          <rect x="60" y="98" width="42" height="28" rx="2" />
          <rect x="110" y="98" width="45" height="28" rx="2" />
          <rect x="165" y="98" width="48" height="28" rx="2" />
          <rect x="220" y="98" width="50" height="28" rx="2" />
          <rect x="280" y="98" width="52" height="28" rx="2" />
          <rect x="342" y="98" width="54" height="28" rx="2" />
          <rect x="406" y="98" width="36" height="28" rx="2" />

          {/* Fileira 4 */}
          <rect x="15" y="132" width="38" height="28" rx="2" />
          <rect x="60" y="132" width="42" height="28" rx="2" />
          <rect x="110" y="132" width="45" height="28" rx="2" />
          <rect x="165" y="132" width="48" height="28" rx="2" />
          <rect x="220" y="132" width="50" height="28" rx="2" />
          <rect x="280" y="132" width="52" height="28" rx="2" />
          <rect x="342" y="132" width="54" height="28" rx="2" />
          <rect x="406" y="132" width="36" height="28" rx="2" />

          {/* Fileira 5 (Sul / Próximo à Orla) */}
          <rect x="15" y="166" width="38" height="28" rx="2" />
          <rect x="60" y="166" width="42" height="28" rx="2" />
          <rect x="110" y="166" width="45" height="28" rx="2" />
          <rect x="165" y="166" width="48" height="28" rx="2" />
          <rect x="220" y="166" width="50" height="28" rx="2" />
          <rect x="280" y="166" width="52" height="28" rx="2" />
          <rect x="342" y="166" width="54" height="28" rx="2" />
          <rect x="406" y="166" width="36" height="28" rx="2" />
          <rect x="450" y="172" width="60" height="22" rx="2" />

          {/* Fileira 6 (Beira-laguna) */}
          <rect x="15" y="200" width="38" height="24" rx="2" />
          <rect x="60" y="200" width="42" height="24" rx="2" />
          <rect x="110" y="200" width="45" height="24" rx="2" />
          <rect x="165" y="200" width="48" height="24" rx="2" />
          <rect x="220" y="200" width="50" height="24" rx="2" />
          <rect x="280" y="200" width="52" height="24" rx="2" />
        </g>

        {/* Casings das Ruas (Contornos da malha viária 1 km) */}
        <g fill="none" stroke="#cfc1ae" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas Principais de Acesso */}
          <path d="M 216 15 L 216 330" strokeWidth="12" />
          <path d="M 338 15 L 338 330" strokeWidth="11" />
          <path d="M -10 130 L 610 130" strokeWidth="11" />
          <path d="M 445 15 L 445 220" strokeWidth="10" />

          {/* Ruas Secundárias Finas da Grade 1 km */}
          <path d="M -10 63 L 610 63" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M -10 95 L 610 95" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M -10 163 L 610 163" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M -10 197 L 610 197" strokeWidth="6" stroke="#d7c9b8" />

          <path d="M 56 15 L 56 330" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M 106 15 L 106 330" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M 161 15 L 161 330" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M 276 15 L 276 330" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M 402 15 L 402 220" strokeWidth="6" stroke="#d7c9b8" />
          <path d="M 515 65 L 515 210" strokeWidth="6" stroke="#d7c9b8" />
        </g>

        {/* Fills das Ruas (Leitos em branco e off-white) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Avenidas Principais */}
          <path d="M 216 15 L 216 330" strokeWidth="9" stroke="#fffdfa" />
          <path d="M 338 15 L 338 330" strokeWidth="8" stroke="#fffdfa" />
          <path d="M -10 130 L 610 130" strokeWidth="8" stroke="#fffdfa" />
          <path d="M 445 15 L 445 220" strokeWidth="7" stroke="#fffdfa" />

          {/* Ruas Secundárias */}
          <path d="M -10 63 L 610 63" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M -10 95 L 610 95" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M -10 163 L 610 163" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M -10 197 L 610 197" strokeWidth="4" stroke="#f8f4ec" />

          <path d="M 56 15 L 56 330" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M 106 15 L 106 330" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M 161 15 L 161 330" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M 276 15 L 276 330" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M 402 15 L 402 220" strokeWidth="4" stroke="#f8f4ec" />
          <path d="M 515 65 L 515 210" strokeWidth="4" stroke="#f8f4ec" />
        </g>

        {/* Linhas Centrais Tracejadas das Avenidas */}
        <path d="M 216 25 L 216 315" fill="none" stroke="#dcd0be" strokeWidth="0.9" strokeDasharray="4 3" />
        <path d="M 5 130 L 600 130" fill="none" stroke="#dcd0be" strokeWidth="0.9" strokeDasharray="4 3" />

        {/* Rotulagem Cartográfica Regional (~1 km) */}
        <text
          x="368"
          y="126"
          fill="#7e6c5c"
          fontSize="6.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          R. CANARINHOS
        </text>
        <text
          x="132"
          y="126"
          fill="#7e6c5c"
          fontSize="6.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          R. CANARINHOS
        </text>
        <text
          x="211"
          y="50"
          fill="#887667"
          fontSize="6"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.06em"
          transform="rotate(-90, 211, 50)"
          textAnchor="middle"
        >
          AV. PARQUE NANCI
        </text>
        <text
          x="333"
          y="50"
          fill="#887667"
          fontSize="6"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.06em"
          transform="rotate(-90, 333, 50)"
          textAnchor="middle"
        >
          AV. DO CONTORNO
        </text>
        <text
          x="440"
          y="180"
          fill="#887667"
          fontSize="5.5"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          letterSpacing="0.05em"
          transform="rotate(-90, 440, 180)"
          textAnchor="middle"
        >
          ACESSO ORLA
        </text>

        {/* Indicador de Escala Métrica do Mapa (500m / Raio ~1 km) */}
        <g transform="translate(20, 302)" opacity="0.85">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#685646" strokeWidth="1.5" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#685646" strokeWidth="1.5" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="#685646" strokeWidth="1.5" />
          <text
            x="30"
            y="-3.5"
            fill="#685646"
            fontSize="6"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="700"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            500 m (Raio ~1 km)
          </text>
        </g>

        {/* Marcador do Estabelecimento (Pin & Ripple no 663 da R. Canarinhos) */}
        <g transform="translate(295, 130)">
          {/* Sombra de chão */}
          <ellipse cx="0" cy="3" rx="12" ry="4" fill="#251913" opacity="0.28" />

          {/* Anel de radar / pulso ambiente */}
          <circle cx="0" cy="3" r="13" fill="none" stroke="#ae0011" strokeWidth="1.5" opacity="0.35" />

          {/* Pin Cartográfico estilizado em Vermelho Primário */}
          <path
            d="M 0 -24 C -9 -24 -15 -17 -15 -8 C -15 2 0 3 0 3 C 0 3 15 2 15 -8 C 15 -17 9 -24 0 -24 Z"
            fill="#ae0011"
            stroke="#ffffff"
            strokeWidth="1.5"
            filter="url(#pinShadow)"
          />
          <circle cx="0" cy="-10" r="3.5" fill="#ffffff" />

          {/* Badge / Callout acima do Pin */}
          <g transform="translate(0, -35)" filter="url(#badgeShadow)">
            <rect x="-52" y="-9" width="104" height="18" rx="9" fill="#251913" stroke="#d9cdbd" strokeWidth="1" />
            <polygon points="0,12 -3.5,9 3.5,9" fill="#251913" />
            <circle cx="-41" cy="0" r="2.5" fill="#fdc008" />
            <text
              x="-34"
              y="2.8"
              fill="#ffffff"
              fontSize="7.5"
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
