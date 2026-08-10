import CheckoutField from './CheckoutField'

// Seleção de pagamento — extraída do HTML de produção (radio cards com
// peer-checked, ícones Material Symbols). Quando "Dinheiro" é selecionado,
// exibe o campo de troco (sem referência local; implementado minimalista
// seguindo o design system — decisão registrada no roadmap).
const METHODS = [
  { id: 'pix', label: 'Pix', icon: 'qr_code' },
  { id: 'card', label: 'Cartão', icon: 'credit_card' },
  { id: 'cash', label: 'Dinheiro', icon: 'payments' },
]

function PaymentSelector({ value, onChange, cashAmount, onCashAmountChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
        role="radiogroup"
        aria-label="Forma de pagamento"
      >
        {METHODS.map((method) => (
          <label key={method.id} className="relative cursor-pointer group">
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={value === method.id}
              onChange={() => onChange(method.id)}
              className="peer sr-only"
            />
            <div
              className={`flex flex-col items-center justify-center p-6 bg-surface-container-lowest border-2 rounded-xl transition-all duration-150 group-hover:shadow-md active:scale-[0.99] ${
                value === method.id
                  ? 'border-primary bg-surface-bright'
                  : 'border-outline-variant'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[40px] mb-2 ${
                  value === method.id ? 'text-primary' : 'text-on-surface-variant'
                }`}
                aria-hidden="true"
              >
                {method.icon}
              </span>
              <span className="font-label-bold text-label-bold text-on-surface">{method.label}</span>
            </div>
          </label>
        ))}
      </div>

      {value === 'cash' && (
        <CheckoutField
          id="cash-change"
          label="Troco para (Opcional)"
          value={cashAmount}
          onChange={(e) => onCashAmountChange(e.target.value)}
          placeholder="Ex: R$ 100,00"
          inputMode="decimal"
          className="max-w-sm"
        />
      )}
    </div>
  )
}

export default PaymentSelector
