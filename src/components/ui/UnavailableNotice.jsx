import { Construction } from 'lucide-react'

function UnavailableNotice({
  title = 'Não disponível / em construção',
  description,
  compact = false,
  className = '',
}) {
  return (
    <div
      className={`rounded-xl border border-dashed border-outline bg-surface-container-low text-on-surface ${compact ? 'px-3 py-2' : 'p-5'} ${className}`}
      role="status"
    >
      <div className="flex items-start gap-3">
        <Construction className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <p className="font-label-bold text-sm uppercase tracking-wide">{title}</p>
          {description ? (
            <p className="mt-1 font-body-md text-sm text-on-surface-variant">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UnavailableNotice
