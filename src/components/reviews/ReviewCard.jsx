import { ExternalLink, Instagram, MapPin, Star } from 'lucide-react'

const SOURCE_LABELS = { google: 'Google', instagram: 'Instagram' }

// Exibe apenas o primeiro nome e a inicial do último sobrenome (ex.: "Ana G.").
function formatAuthorName(fullName) {
  if (!fullName) return ''
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return parts[0]
  const first = parts[0]
  const lastInitial = parts[parts.length - 1][0].toUpperCase()
  return `${first} ${lastInitial}.`
}

function ReviewCard({ review }) {
  const SourceIcon = review.source === 'instagram' ? Instagram : MapPin
  return (
    <article className="flex h-full min-h-[300px] flex-col justify-between rounded-sm bg-white p-6 ring-1 ring-inset ring-[#e8e0d4] md:p-8">
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary"><SourceIcon className="h-4 w-4" aria-hidden="true" />{SOURCE_LABELS[review.source]}</span>
          {review.sourceUrl ? (
            <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-on-surface/60 transition-colors hover:text-primary">
              Ver origem
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : null}
        </div>
        {review.rating ? (
          <div className="mt-6 flex gap-1" role="img" aria-label={`${review.rating} de 5 estrelas`}>
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className={`h-4 w-4 ${index < review.rating ? 'fill-secondary-container text-secondary-container' : 'text-[#d9cdbd]'}`} aria-hidden="true" />)}
          </div>
        ) : null}
        <blockquote className="mt-6 text-xl font-medium leading-snug tracking-[-0.02em] text-on-surface">“{review.text}”</blockquote>
      </div>
      <footer className="mt-8 border-t border-[#e8e0d4] pt-5">
        <p className="font-bold text-on-surface">{formatAuthorName(review.authorName)}</p>
        <p className="mt-1 text-xs text-on-surface/55">Avaliação no Google{review.dateLabel ? ` · ${review.dateLabel}` : ''}</p>
      </footer>
    </article>
  )
}

export default ReviewCard
