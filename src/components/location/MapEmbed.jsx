import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import pinMap from '../../assets/images/location/pin-map.webp'

/* Mapa vetorial real baseado em OpenStreetMap (MapLibre GL + OpenFreeMap).
   Não interativo por decisão de produto: a localização é informação fixa;
   o visitante abre a rota no Google Maps pelo CTA abaixo.
   Coordenadas validadas pelo responsável — não alterar. */
const BUSINESS_COORDINATES = [-42.8479579, -22.9215763] // [longitude, latitude]
// Centro da câmera deslocado ao norte para incluir a RJ-106 e o retorno.
const MAP_CENTER = [-42.8479579, -22.9185] // [longitude, latitude]
// Zoom calibrado para mostrar o bairro com contexto (RJ-106 e área verde)
// mantendo o estabelecimento como foco. Ajustável sem alterar coordenadas.
const MAP_ZOOM = 14
// Style local (liberty/OpenFreeMap), reestilizado com a paleta editorial
// Turquia Lanches (creme/tinta/verde dessaturado/água fria suave). O source
// usa TileJSON (https://tiles.openfreemap.org/planet — maxzoom 14).
const MAP_STYLE = () => import('../../assets/map/liberty.json')
// Distância (px) do mapa à viewport que dispara o carregamento.
const LAZY_ROOT_MARGIN = '500px 0px'

function MapEmbed() {
  const mapContainerRef = useRef(null)
  // idle = ainda não iniciado (lazy loading); loading | ready | error.
  const [mapState, setMapState] = useState('idle')

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    let map = null
    let cancelled = false
    let transientLogged = false
    let loadTimer = null

    async function startMap() {
      try {
        setMapState('loading')
        // maplibre-gl exporta classes como named exports (sem default).
        const maplibre = await import('maplibre-gl')
        // O worker do MapLibre usa new URL(nome dinâmico) que o bundler não
        // emite automaticamente; importamos via ?worker&url para o Vite
        // gerar o asset e apontamos o MapLibre para ele.
        const workerUrl = (await import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url')).default
        maplibre.setWorkerUrl(workerUrl)
        const { default: mapStyle } = await MAP_STYLE()
        await import('maplibre-gl/dist/maplibre-gl.css')
        if (cancelled) return

        // preserveDrawingBuffer só é necessário para captura de tela em QA
        // (readPixels/screenshot do canvas WebGL); em produção custaria
        // memória permanente sem benefício para o visitante.
        const qaCapture = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('qa')

        map = new maplibre.Map({
          container,
          style: mapStyle,
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          interactive: false,
          // Atribuição renderizada na barra do card (abaixo), FORA do container
          // role="img" — o controle padrão criaria um <a> focável dentro dele,
          // violando nested-interactive no axe. Os links legais permanecem.
          attributionControl: false,
          maplibreLogo: false,
          canvasContextAttributes: qaCapture ? { antialias: true, preserveDrawingBuffer: true } : undefined,
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
          .setLngLat(BUSINESS_COORDINATES)
          .addTo(map)

        map.on('load', () => {
          if (!cancelled) setMapState('ready')
        })

        // Classificação de erros: falhas transitórias (tile/fonte/sprite) não
        // devem derrubar o mapa inteiro — apenas registramos uma vez e seguimos.
        // Fallback total só para falhas antes do load (engine/WebGL/style/source
        // críticos), quando o mapa realmente não consegue renderizar.
        map.on('error', (event) => {
          if (cancelled) return
          const message = event?.error?.message ?? String(event?.error ?? event)
          if (map.loaded()) {
            if (!transientLogged) {
              console.warn('[MapEmbed] erro transitório do mapa (mantendo o mapa ativo):', message)
              transientLogged = true
            }
            return
          }
          console.error('[MapEmbed] falha ao inicializar o mapa vetorial:', message)
          setMapState('error')
        })

        // Segurança: se o load nunca completar (tiles/estilo indisponíveis),
        // o fallback visual + CTA assumem em vez de ficar preso em "loading".
        loadTimer = setTimeout(() => {
          if (!cancelled && !map.loaded()) setMapState('error')
        }, 12000)
      } catch (error) {
        console.error('[MapEmbed] falha ao carregar o mapa vetorial:', error)
        if (!cancelled) setMapState('error')
      }
    }

    // Lazy loading por viewport: MapLibre, style, worker e tiles só são
    // baixados quando a seção se aproxima da viewport (code splitting real).
    // Em ambientes sem IntersectionObserver (ex.: testes jsdom), inicia direto.
    if (typeof IntersectionObserver === 'undefined') {
      startMap()
      return () => {
        cancelled = true
        clearTimeout(loadTimer)
        map?.remove()
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          startMap()
        }
      },
      { rootMargin: LAZY_ROOT_MARGIN }
    )
    observer.observe(container)

    return () => {
      cancelled = true
      clearTimeout(loadTimer)
      observer.disconnect()
      map?.remove()
    }
  }, [])

  return (
    <div className="group overflow-hidden rounded-sm ring-1 ring-inset ring-[#d9cdbd] shadow-sm transition-all duration-smooth ease-smooth hover:shadow-[0_18px_35px_-24px_rgba(33,22,13,0.7)]">
      <div className="relative h-[300px] w-full sm:h-[380px]">
        {/* Placeholder leve enquanto o mapa não iniciou / carrega; vira fallback
            visual coerente em caso de erro — o CTA permanece sempre disponível. */}
        {mapState !== 'ready' && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#e9e0d2] px-6 text-center"
            role={mapState === 'error' ? 'status' : undefined}
          >
            <img src={pinMap} alt="" width="40" height="64" className="h-16 w-10 object-contain opacity-90" />
            {mapState === 'error' ? (
              <p className="max-w-[260px] text-sm font-medium text-on-surface/80">
                Não foi possível carregar o mapa agora. Use o botão abaixo para abrir a rota no Google Maps.
              </p>
            ) : (
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface/60">Carregando mapa…</p>
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
          aria-label="Mapa da região do Parque Nanci em Maricá, com a localização da Turquia Lanches e indicação do retorno da RJ-106"
        />

        {/* Indicação editorial do retorno, posicionada sobre o ponto assinalado
            na referência aprovada. Só aparece quando o mapa está pronto; o nome
            acessível do mapa oferece o mesmo contexto a tecnologias assistivas. */}
        {mapState === 'ready' && (
          <div className="map-return-callout" aria-hidden="true">
            <span>↩ Retorno</span>
          </div>
        )}
      </div>

      {/* Barra inferior: contexto + CTA + atribuição legal (fora do role="img"). */}
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
        {/* Atribuição cartográfica obrigatória — discreta, linkada e acessível.
            Dados: OpenStreetMap (ODbL) via OpenMapTiles, hospedados pelo OpenFreeMap. */}
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
          contributors ·{' '}
          <a
            href="https://www.openmaptiles.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#251913]/30 underline-offset-2 transition-colors hover:text-primary"
          >
            OpenMapTiles
          </a>{' '}
          ·{' '}
          <a
            href="https://openfreemap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#251913]/30 underline-offset-2 transition-colors hover:text-primary"
          >
            OpenFreeMap
          </a>
        </p>
      </div>
    </div>
  )
}

export default MapEmbed
