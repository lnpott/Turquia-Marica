import { useEffect, useState } from 'react'
import { Image } from 'lucide-react'
import Reveal from '../ui/Reveal'

const PHOTO_PLACEHOLDERS = [
  { id: 'fachada', label: 'Foto da fachada aguardando envio', isPlaceholder: true },
  { id: 'ambiente', label: 'Foto do ambiente aguardando envio', isPlaceholder: true },
]

function AboutSection() {
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % PHOTO_PLACEHOLDERS.length)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <Reveal as="section" id="sobre" className="scroll-mt-24 bg-[#faf7f2]/[0.35] px-5 py-20 md:px-margin-desktop md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#ded4c6]" aria-label="Espaço reservado para fotos da casa">
          {PHOTO_PLACEHOLDERS.map((photo, index) => (
            <div
              key={photo.id}
              className={`absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_70%_20%,rgba(174,0,17,0.14),transparent_35%),linear-gradient(145deg,#eee5d8,#d5c7b6)] p-6 transition-opacity duration-[1200ms] ${index === activePhoto ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={index !== activePhoto}
            >
              <Image className="absolute h-20 w-20 text-on-surface/15" strokeWidth={1.2} aria-hidden="true" />
              {photo.isPlaceholder ? (
                <span className="relative mt-auto rounded-sm bg-white/85 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-on-surface/65 backdrop-blur-sm">
                  {photo.label}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div>
          <span className="section-eyebrow">Sobre a casa</span>
          <h2 className="display-balance mt-6 max-w-[14ch] text-[clamp(2.7rem,6vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.055em] text-on-surface">
            Bairro no coração.<span className="text-primary"> Fartura na mesa.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-surface/65 md:text-xl">
            O Turquia Lanches é uma casa de bairro em Parque Nanci, Maricá, feita para reunir gente em volta de comida farta e atendimento próximo.
          </p>
        </div>
      </div>
    </Reveal>
  )
}

export default AboutSection
