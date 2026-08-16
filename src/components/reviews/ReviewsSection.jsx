import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ReviewCard from './ReviewCard'

// Avaliações reais fornecidas pelo responsável; usadas como fallback estático
// quando a API /api/reviews falha ou retorna erro (nunca vazio e nunca fictício).
const REVIEWS_FALLBACK = [
  {
    id: 'review-001',
    source: 'google',
    authorName: 'Ana Monica Gonçalves',
    badge: 'Local Guide · 95 avaliações · 510 fotos',
    rating: 5,
    ratings: { comida: 5, servico: 4, ambiente: 5 },
    text: 'Recomendo, bebida gelada e barata, comida muito bem feita. E pra quem é Flamenguista em dia de jogo é tudo de bom — casa cheia e decorada.',
    date: '2026-07-16',
    dateLabel: '16/07/2026',
    sourceUrl: null,
    avatarUrl: null,
    isPlaceholder: false,
  },
  {
    id: 'review-002',
    source: 'google',
    authorName: 'Andre Bezerra de Lima',
    badge: 'Local Guide · 75 avaliações · 38 fotos',
    rating: 5,
    ratings: { comida: 5, servico: 5, ambiente: 4 },
    text: 'Ótima experiência, lugar agitado e ao mesmo tempo familiar, uma variedade grande de produtos — tanto para beber quanto pra comer. As crianças também adoram os lanches. Indico a todos!',
    date: '2026-06-16',
    dateLabel: '16/06/2026',
    orderType: 'Refeição no local',
    preco: 'R$ 40–60',
    pratos: 'Sanduíches',
    sourceUrl: null,
    avatarUrl: null,
    isPlaceholder: false,
  },
  {
    id: 'review-003',
    source: 'google',
    authorName: 'Fernanda Leão de Lima',
    badge: '3 avaliações',
    rating: 5,
    ratings: { comida: 5, servico: 5, ambiente: 4 },
    text: 'Ambiente familiar, preços justos, excelente comida. Andrielle, atendente nota 1000 — atenta, simpática e pronta para atender a todas as necessidades do cliente. Já ganhou uma fã!',
    date: '2026-06-16',
    dateLabel: '16/06/2026',
    orderType: 'Refeição no local',
    preco: '+R$ 200',
    sourceUrl: null,
    avatarUrl: null,
    isPlaceholder: false,
  },
]

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
        if (error.name !== 'AbortError') setState({ status: 'ready', reviews: REVIEWS_FALLBACK, place: null })
      }
    }

    loadReviews()
    return () => controller.abort()
  }, [])

  if (state.status === 'loading') {
    return (
      <section id="reviews" className="scroll-mt-24 bg-[#faf7f2]/[0.40] px-5 py-20 md:px-margin-desktop md:py-28" aria-busy="true">
        <p className="mx-auto max-w-[1280px] text-sm text-on-surface/60">Carregando avaliações do Google…</p>
      </section>
    )
  }

  if (state.status !== 'ready') {
    return (
      <section id="reviews" className="scroll-mt-24 bg-[#faf7f2]/[0.40] px-5 py-20 md:px-margin-desktop md:py-28">
        <div className="mx-auto max-w-[1280px] border-y border-[#e8e0d4] py-8">
          <p className="text-sm text-on-surface/65">Avaliações do Google temporariamente indisponíveis.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="scroll-mt-24 bg-[#faf7f2]/[0.40] py-20 md:py-28">
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
