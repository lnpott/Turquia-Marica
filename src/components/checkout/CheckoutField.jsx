// Campo de formulário reutilizável do fluxo de Checkout (extraído do markup do
// HTML de produção: label font-label-bold, input bg-surface-container-lowest,
// border-outline, rounded-lg, focus red #ae0011).
function CheckoutField({ id, label, error, required = false, textarea = false, className = '', ...rest }) {
  const base =
    'w-full bg-surface-container-lowest border rounded-lg p-3 text-on-surface transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none'
  const border = error ? 'border-error' : 'border-outline'

  return (
    <div className={`flex flex-col gap-unit ${className}`}>
      <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor={id}>
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {textarea ? (
        <textarea id={id} rows={3} className={`${base} ${border} resize-none`} {...rest} />
      ) : (
        <input id={id} className={`${base} ${border}`} {...rest} />
      )}
      {error && (
        <p role="alert" className="font-body-md text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default CheckoutField
