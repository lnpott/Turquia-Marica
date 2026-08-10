// Seletor Entrega / Retirada no balcão — mesmo visual de pílulas da Sacola
// (design system) e integrado ao CartContext via setDelivery (SET_DELIVERY).
const OPTIONS = [
  { id: 'delivery', label: 'Entrega', icon: 'delivery_dining' },
  { id: 'pickup', label: 'Retirada no balcão', icon: 'storefront' },
]

function DeliverySelector({ value, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2" role="group" aria-label="Tipo de entrega">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border font-label-bold transition-all duration-150 active:scale-[0.98] ${
            value === option.id
              ? 'border-primary bg-primary text-on-primary'
              : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {option.icon}
          </span>
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default DeliverySelector
