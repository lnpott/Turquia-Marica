import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import ambienteVideo from '../../assets/media/hero/turquia-ambiente-hero.mp4'
import ambientePoster from '../../assets/media/hero/turquia-ambiente-poster.jpg'
import espacoInfantilVideo from '../../assets/media/hero/turquia-espaco-infantil-hero.mp4'
import espacoInfantilPoster from '../../assets/media/hero/turquia-espaco-infantil-poster.jpg'
import comidaImage from '../../assets/media/pictures/turquia-hamburguer-artesanal-01.jpg'
import petiscosImage from '../../assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg'
import atmosferaImage from '../../assets/media/pictures/turquia-pizza-calabresa-01.jpg'
import Button from '../ui/Button'

const SLIDES = [
  {
    type: 'video',
    src: ambienteVideo,
    poster: ambientePoster,
    headline: 'Um lugar para chegar e ficar',
    subheadline: 'Ambiente de verdade, mesa cheia e bons encontros.',
    objectPosition: 'center 42%',
    duration: 6000,
  },
  {
    type: 'image',
    src: comidaImage,
    alt: 'Tábua farta com hambúrguer, batatas e porções da Turquia Lanches',
    headline: 'Fartura que reúne',
    subheadline: 'Comida feita para dividir — ou não.',
    objectPosition: 'center 52%',
    duration: 5000,
  },
  {
    type: 'video',
    src: espacoInfantilVideo,
    poster: espacoInfantilPoster,
    headline: 'Diversão para toda a família',
    subheadline: 'Espaço infantil para os pequenos aproveitarem também.',
    objectPosition: 'center 48%',
    duration: 6000,
  },
  {
    type: 'image',
    src: petiscosImage,
    alt: 'Porção de pastéis com molho na Turquia Lanches',
    headline: 'Petisco e boa companhia',
    subheadline: 'A mesa certa para dividir o melhor da casa.',
    objectPosition: 'center 45%',
    duration: 5000,
  },
  {
    type: 'image',
    src: atmosferaImage,
    alt: 'Pizza servida na Turquia Lanches',
    headline: 'Seu próximo sabor favorito',
    subheadline: 'Chegue com vontade. A gente cuida do resto.',
    objectPosition: 'center 54%',
    duration: 5000,
  },
]

function HeroMedia({ slide, index, active, next, videoRef, onVideoReady }) {
  const mediaStyle = { objectPosition: slide.objectPosition }

  if (slide.type === 'image') {
    return (
      <img
        src={slide.src}
        alt={slide.alt}
        width="1080"
        height="1350"
        className="hero-carousel__media"
        style={mediaStyle}
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchpriority={index === 0 ? 'high' : 'auto'}
      />
    )
  }

  return (
    <>
      <img
        src={slide.poster}
        alt=""
        width="720"
        height="1280"
        className="hero-carousel__media"
        style={mediaStyle}
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchpriority={index === 0 ? 'high' : 'auto'}
      />
      <video
        ref={videoRef}
        className="hero-carousel__media hero-carousel__video"
        style={mediaStyle}
        muted
        playsInline
        autoPlay={active}
        loop
        preload={active ? 'auto' : next ? 'metadata' : 'none'}
        poster={slide.poster}
        tabIndex="-1"
        aria-hidden="true"
        onCanPlay={() => onVideoReady(index)}
      >
        <source src={slide.src} type="video/mp4" />
      </video>
    </>
  )
}

function HeroSection() {
  const heroRef = useRef(null)
  const videoRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [heroVisible, setHeroVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== 'hidden')
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const [readyVideos, setReadyVideos] = useState(() => new Set())
  const activeSlide = SLIDES[activeIndex]
  const canAnimate = heroVisible && pageVisible && !reducedMotion

  useEffect(() => {
    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!motionQuery) return undefined
    const updateMotion = () => setReducedMotion(motionQuery.matches)
    motionQuery.addEventListener('change', updateMotion)
    return () => motionQuery.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === activeIndex && canAnimate) {
        video.currentTime = 0
        video.play()?.catch(() => undefined)
      } else {
        video.pause()
      }
    })
  }, [activeIndex, canAnimate])

  useEffect(() => {
    if (!canAnimate) return undefined
    const timer = window.setTimeout(
      () => setActiveIndex((current) => (current + 1) % SLIDES.length),
      activeSlide.duration
    )
    return () => window.clearTimeout(timer)
  }, [activeSlide.duration, canAnimate])

  const scrollToLocation = (event) => {
    const locationSection = document.querySelector('#localizacao')
    if (!locationSection) return
    event.preventDefault()
    locationSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const markVideoReady = (index) => {
    setReadyVideos((current) => {
      if (current.has(index)) return current
      const next = new Set(current)
      next.add(index)
      return next
    })
  }

  const selectSlide = (index) => {
    setActiveIndex(index)
  }

  return (
    <section
      ref={heroRef}
      className="hero-carousel relative isolate min-h-[calc(100svh-64px)] overflow-hidden bg-on-surface text-white md:min-h-[720px]"
      aria-roledescription="carrossel"
      aria-label="Experiências na Turquia Lanches"
      data-active-slide={activeIndex}
      data-motion={reducedMotion ? 'reduced' : 'full'}
    >
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {SLIDES.map((slide, index) => {
          const active = index === activeIndex
          const videoReady = slide.type !== 'video' || readyVideos.has(index)
          return (
            <div
              key={`${slide.type}-${slide.src}`}
              className={`hero-carousel__slide ${active ? 'hero-carousel__slide--active' : ''} ${videoReady ? 'hero-carousel__slide--ready' : ''}`}
              data-slide-index={index}
              data-slide-type={slide.type}
            >
              <HeroMedia
                slide={slide}
                index={index}
                active={active && canAnimate}
                next={index === (activeIndex + 1) % SLIDES.length}
                videoRef={(node) => { videoRefs.current[index] = node }}
                onVideoReady={markVideoReady}
              />
            </div>
          )
        })}
      </div>

      <div className="hero-carousel__scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-[1280px] items-end px-5 pb-20 pt-16 md:min-h-[720px] md:px-margin-desktop md:pb-24 md:pt-28">
        <div className="relative z-10 w-full max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-container before:h-px before:w-8 before:bg-secondary-container md:mb-5 md:text-[11px]">
            Parque Nanci · Maricá
          </span>
          <h1 className="display-balance max-w-[11ch] text-[clamp(3.15rem,8vw,7rem)] font-extrabold leading-[0.84] tracking-[-0.065em] text-white">
            Turquia<span className="block text-secondary-container">Lanches.</span>
          </h1>

          <div className="mt-5 min-h-[5.5rem] md:mt-6 md:min-h-[6rem]" aria-live="off">
            <p className="hero-carousel__headline max-w-[22ch] text-xl font-bold leading-tight text-white md:text-3xl">
              {activeSlide.headline}
            </p>
            <p className="mt-2 max-w-lg text-sm font-medium leading-relaxed text-white/78 md:text-base">
              {activeSlide.subheadline}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-6">
            <Button to="/cardapio" variant="editorialPrimary" size="lg">
              Ver cardápio
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              href="#localizacao"
              onClick={scrollToLocation}
              variant="editorialSecondary"
              size="lg"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-black/20 px-7 py-3 font-label-bold uppercase tracking-[0.08em] text-white ring-1 ring-inset ring-white/45 backdrop-blur-sm transition-all duration-tactile ease-tactile hover:-translate-y-0.5 hover:bg-white hover:text-on-surface active:translate-y-0 active:scale-[0.98]"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Como chegar
            </Button>
          </div>

          <ol className="mt-6 flex items-center gap-2" aria-label={`Cena ${activeIndex + 1} de ${SLIDES.length}`}>
            {SLIDES.map((slide, index) => (
              <li key={slide.headline}>
                <button
                  type="button"
                  onClick={() => selectSlide(index)}
                  className={`hero-carousel__indicator block ${index === activeIndex ? 'hero-carousel__indicator--active' : ''}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={`Mostrar cena ${index + 1}: ${slide.headline}`}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export { SLIDES }
export default HeroSection
