import { useEffect, useRef, useState } from 'react'
import { Baby, Music, Users } from 'lucide-react'
import ambienteVideo from '../../assets/media/hero/turquia-ambiente-hero.mp4'
import ambientePoster from '../../assets/media/hero/turquia-ambiente-poster.jpg'
import kidsVideo from '../../assets/media/hero/turquia-espaco-infantil-hero.mp4'
import kidsPoster from '../../assets/media/hero/turquia-espaco-infantil-poster.jpg'
import mesaImage from '../../assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg'
import Reveal from '../ui/Reveal'

const FACTS = [
  { Icon: Users, title: 'Casa de bairro', copy: 'Mesa para reunir gente. Atendimento próximo, sem pose.' },
  { Icon: Baby, title: 'Espaço infantil', copy: 'Um ambiente pensado para a família aproveitar junto.' },
  { Icon: Music, title: 'Mesa cheia', copy: 'Lanches, pizzas e petiscos para compartilhar bons momentos.' },
]

function AboutVideo({ src, poster, label }) {
  const videoRef = useRef(null)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || typeof IntersectionObserver === 'undefined') return undefined
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(([entry]) => {
      const shouldPlay = entry.isIntersecting && !motion?.matches
      setCanPlay(shouldPlay)
      if (shouldPlay) video.play()?.catch(() => undefined)
      else video.pause()
    }, { threshold: 0.35 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-media relative overflow-hidden rounded-xl bg-[#1a1008]">
      <video ref={videoRef} src={src} poster={poster} muted playsInline loop preload="metadata" className="h-full w-full object-cover" aria-label={label} data-playing={canPlay} />
      <span className="absolute bottom-3 left-3 rounded-full bg-[#1a1008]/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">{label}</span>
    </div>
  )
}

function AboutSection() {
  return (
    <Reveal as="section" id="sobre" className="scroll-mt-24 bg-[#faf7f2]/70 px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[16/10]">
            <AboutVideo src={ambienteVideo} poster={ambientePoster} label="O salão" />
          </div>
          <div className="aspect-[4/5]">
            <AboutVideo src={kidsVideo} poster={kidsPoster} label="Espaço infantil" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#1a1008]">
            <img src={mesaImage} alt="Tábua de petiscos servida na Turquia Lanches" width="1080" height="1350" loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-[#1a1008]/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">A mesa</span>
          </div>
        </div>

        <div>
          <span className="section-eyebrow">A casa</span>
          <h2 className="display-balance mt-6 max-w-[12ch] text-[clamp(2.7rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.055em] text-on-surface">
            Bairro no coração. <span className="text-primary">Fartura na mesa.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-surface/65">
            O Turquia Lanches é uma casa de bairro no Parque Nanci, em Maricá, feita para reunir gente em volta de comida farta e atendimento próximo.
          </p>
          <ul className="mt-9 space-y-5">
            {FACTS.map(({ Icon, title, copy }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div><p className="font-bold text-on-surface">{title}</p><p className="mt-1 text-sm text-on-surface/60">{copy}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

export default AboutSection
