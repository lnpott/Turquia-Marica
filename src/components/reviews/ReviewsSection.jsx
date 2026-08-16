import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ReviewCard from './ReviewCard'

function ReviewsSection() {
  const [state, setState] = useState({ status: 'loading', reviews: [], place: null })

  useEffect(() => {
    const controller = new AbortController()

    async function loadReviews() {
      try {
        const response = await fetch('/api/reviews', { signal: controller.signal })
        if (!response.ok) throw new Error('REVIEWS_UNAVAILABLE')
        const payload = await response.json()
        setState({
          status: payload.reviews?.length ? 'ready' : 'empty',
          reviews: payload.reviews ?? [],
          place: payload.place ?? null,
        })
      } catch (error) {
        if (error.name !== 'AbortError') setState({ status: 'error', reviews: [], place: null })
      }
    }

    loadReviews()
    return () => controller.abort()
  }, [])

  if (state.status === 'loading') {
    return (
      <section id="reviews" className="scroll-mt-24 bg-[#faf7f2] px-5 py-20 md:px-margin-desktop md:py-28" aria-busy="true">
        <p className="mx-auto max-w-[1280px] text-sm text-on-surface/60">Carregando avaliações do Google…</p>
      </section>
    )
  }

  if (state.status !== 'ready') {
    return (
      <section id="reviews" className="scroll-mt-24 bg-[#faf7f2] px-5 py-20 md:px-margin-desktop md:py-28">
        <div className="mx-auto max-w-[1280px] border-y border-[#e8e0d4] py-8">
          <p className="text-sm text-on-surface/65">Avaliações do Google temporariamente indisponíveis.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="scroll-mt-24 bg-[#faf7f2] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-margin-desktop">
        <SectionHeading eyebrow="Avaliações no Google" title={<>Quem visita <span className="text-primary">conta a experiência.</span></>} description={state.place?.totalRatings ? `${state.place.totalRatings} avaliações publicadas no Google.` : 'Avaliações reais publicadas no Google.'} />
      </div>
      <Reveal>
        <ul className="scrolling-wrapper mx-auto mt-12 flex max-w-[1408px] snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-margin-desktop" aria-label="Avaliações reais no Google" tabIndex="0">
          {state.reviews.map((review) => (
            <li key={review.id} className="w-[85vw] max-w-[420px] shrink-0 snap-start">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

export default ReviewsSection
