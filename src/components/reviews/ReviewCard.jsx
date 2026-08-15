import { Instagram, MapPin, Star } from 'lucide-react'

const SOURCE_LABELS = { google: 'Google', instagram: 'Instagram' }

function ReviewCard({ review }) {
  const SourceIcon = review.source === 'instagram' ? Instagram : MapPin
  return (
    <article className="flex h-full min-h-[300px] flex-col justify-between rounded-sm bg-white p-6 ring-1 ring-inset ring-[#e8e0d4] md:p-8">
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary"><SourceIcon className="h-4 w-4" aria-hidden="true" />{SOURCE_LABELS[review.source]}</span>
          <span className="rounded-sm bg-[#f0e7db] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-on-surface/70">Demonstração</span>
        </div>
        {review.rating ? (
          <div className="mt-6 flex gap-1" role="img" aria-label={`${review.rating} de 5 estrelas`}>
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-secondary-container text-secondary-container' : 'text-[#d9cdbd]'}`} aria-hidden="true" />)}
          </div>
        ) : null}
        <blockquote className="mt-6 text-xl font-medium leading-snug tracking-[-0.02em] text-on-surface">“{review.text}”</blockquote>
      </div>
      <footer className="mt-8 border-t border-[#e8e0d4] pt-5">
        <p className="font-bold text-on-surface">{review.authorName}</p>
        <p className="mt-1 text-xs text-on-surface/55">Avaliação fictícia · {new Date(`${review.date}T12:00:00`).toLocaleDateString('pt-BR')}</p>
      </footer>
    </article>
  )
}

export default ReviewCard
