import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import pinMap from '../../assets/images/location/pin-map.webp'

/* Mapa vetorial real baseado em OpenStreetMap (MapLibre GL + OpenFreeMap).
   Não interativo por decisão de produto: a localização é informação fixa;
   o visitante abre a rota no Google Maps pelo CTA abaixo.
   Coordenadas validadas pelo responsável — não alterar. */
const MAP_CENTER = [-42.8479579, -22.9215763] // [longitude, latitude]
// Zoom calibrado para mostrar o bairro com contexto (estradas e área verde)
// mantendo o estabelecimento como foco. Ajustável sem alterar coordenadas.
const MAP_ZOOM = 14.2
// Style local (liberty/OpenFreeMap): baixado do provedor e com o source
// via TileJSON (https://tiles.openfreemap.org/planet — maxzoom 14).
const MAP_STYLE = () => import('../../assets/map/liberty.json')

function MapEmbed() {
  const mapContainerRef = useRef(null)
  const [mapState, setMapState] = useState('loading') // loading | ready | error

  useEffect(() => {
    let map = null
    let cancelled = false

    ;(async () => {
      try {
        // maplibre-gl exporta classes como named exports (sem default)
        const maplibre = await import('maplibre-gl')
        // O worker do MapLibre usa new URL(nome dinâmico) que o bundler não
        // emite automaticamente; importamos via ?worker&url para o Vite
        // gerar o asset e apontamos o MapLibre para ele.
        const workerUrl = (await import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url')).default
        maplibre.setWorkerUrl(workerUrl)
        const { default: mapStyle } = await MAP_STYLE()
        await import('maplibre-gl/dist/maplibre-gl.css')
        if (cancelled) return

        map = new maplibre.Map({
          container: mapContainerRef.current,
          style: mapStyle,
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          interactive: false,
          // Atribuição renderizada como texto estático na barra do card (abaixo):
          // o controle padrão criaria um <a> focável dentro do container
          // role="img", violando nested-interactive no axe. A atribuição legal
          // (© OpenStreetMap contributors · OpenFreeMap) permanece visível.
          attributionControl: false,
          maplibreLogo: false,
          // preserveDrawingBuffer permite captura do canvas em screenshots/QA;
          // custo de memória irrelevante num mapa fixo e não interativo.
          canvasContextAttributes: { antialias: true, preserveDrawingBuffer: true },
        })

        // Único marcador Turquia Lanches — georreferenciado nas coordenadas reais.
        const pinElement = document.createElement('div')
        pinElement.className = 'map-pin-marker'
        const pinImg = document.createElement('img')
        pinImg.src = pinMap
        pinImg.alt = ''
        pinImg.width = 40
        pinImg.height = 64
        pinImg.decoding = 'async'
        pinElement.appendChild(pinImg)
        new maplibre.Marker({ element: pinElement, anchor: 'bottom' })
          .setLngLat(MAP_CENTER)
          .addTo(map)

        map.on('load', () => {
          if (!cancelled) setMapState('ready')
        })
        map.on('error', (event) => {
          console.error('[MapEmbed] erro no mapa vetorial:', event?.error?.message ?? event)
          if (!cancelled) setMapState('error')
        })
      } catch (error) {
        console.error('[MapEmbed] falha ao carregar o mapa vetorial:', error)
        if (!cancelled) setMapState('error')
      }
    })()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return (
    <div className="group overflow-hidden rounded-sm ring-1 ring-inset ring-[#d9cdbd] shadow-sm transition-all duration-smooth ease-smooth hover:shadow-[0_18px_35px_-24px_rgba(33,22,13,0.7)]">
      <div className="relative h-[300px] w-full sm:h-[380px]">
        {/* Placeholder enquanto o mapa carrega / fallback visual coerente */}
        {(mapState === 'loading' || mapState === 'error') && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#e9e0d2] px-6 text-center"
            role={mapState === 'error' ? 'status' : undefined}
          >
            <img src={pinMap} alt="" width="40" height="64" className="h-16 w-10 object-contain opacity-90" />
            {mapState === 'loading' ? (
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface/60">Carregando mapa…</p>
            ) : (
              <p className="max-w-[260px] text-sm font-medium text-on-surface/80">
                Não foi possível carregar o mapa agora. Use o botão abaixo para abrir a rota no Google Maps.
              </p>
            )}
          </div>
        )}

        {/* Canvas do mapa vetorial — apresentação visual; sem interação de mapa.
            pointer-events: none garante que o scroll da página nunca fique preso ao mapa.
            Atenção: não usar `absolute inset-0` aqui — o CSS do MapLibre aplica
            `position: relative` no container (mesma especificidade, carregado depois)
            e o `inset` deixa de valer, colapsando a altura. Usamos h-full direto. */}
        <div
          ref={mapContainerRef}
          className="map-embed-canvas h-full w-full"
          role="img"
          aria-label="Mapa da região do Parque Nanci em Maricá, com a localização da Turquia Lanches"
        />
      </div>

      {/* CTA externo — único caminho de navegação para a rota */}
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
        {/* Atribuição cartográfica legal — estática, sem link, para não criar
            elemento focável dentro do mapa; discreta e legível. */}
        <p className="px-4 pb-2 text-[10px] leading-relaxed text-on-surface/70">
          © OpenStreetMap contributors · OpenFreeMap
        </p>
      </div>
    </div>
  )
}

export default MapEmbed
