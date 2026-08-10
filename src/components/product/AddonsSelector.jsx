import { formatBRL } from '../../utils/format'

function AddonsSelector({ title, options, selected, onToggle, showPrice }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-label-bold text-label-bold text-on-surface mb-1">{title}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <label
              key={option.id}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-150 active:scale-[0.99] ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(option.id)}
                  className="accent-primary w-4 h-4"
                />
                <span className="font-body-md text-on-surface">{option.label}</span>
              </span>
              {showPrice && (
                <span className="font-label-bold text-primary">{formatBRL(option.price)}</span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default AddonsSelector
