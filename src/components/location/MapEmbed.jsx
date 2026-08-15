import { MapPin } from 'lucide-react'

function MapEmbed() {
  return (
    <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-sm bg-[#e9e0d2] p-5 md:min-h-[520px] md:p-7" role="img" aria-label="Ilustração decorativa indicando a região da ficha no Google Maps; não é um mapa">
      <div className="absolute inset-0 paper-texture" aria-hidden="true">
        <div className="absolute -right-16 top-8 h-64 w-64 rounded-full border border-primary/20 md:h-96 md:w-96" />
        <div className="absolute left-[10%] top-[34%] h-28 w-[76%] rotate-[-8deg] rounded-[50%] border-b-2 border-dashed border-primary/35" />
        <MapPin className="absolute left-1/2 top-[34%] h-20 w-20 -translate-x-1/2 text-primary md:h-28 md:w-28" strokeWidth={1.5} />
      </div>
      <div className="relative text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface/55">
        Ilustração · não é um mapa
      </div>
      <div className="relative mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          Referência visual da região
      </div>
    </div>
  )
}

export default MapEmbed
