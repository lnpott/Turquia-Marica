function QuantitySelector({ value, onChange, min = 1, className = '', ...rest }) {
  const decrease = () => {
    if (value > min) onChange(value - 1)
  }

  const increase = () => onChange(value + 1)

  return (
    <div
      className={`flex items-center border border-outline-variant rounded-full bg-surface-container ${className}`}
      {...rest}
    >
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={decrease}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors disabled:opacity-40"
      >
        <span className="material-symbols-outlined">remove</span>
      </button>
      <span className="font-label-bold text-on-surface w-8 text-center">{value}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={increase}
        className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}

export default QuantitySelector
