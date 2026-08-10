function ObservationsField({ value, onChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-label-bold text-label-bold text-on-surface">Observações</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Alguma observação? Ex.: sem cebola, ponto da carne, etc."
        className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low text-on-surface font-body-md placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
      />
    </label>
  )
}

export default ObservationsField
