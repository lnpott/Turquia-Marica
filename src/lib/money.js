export function formatCents(cents) {
  const value = Number.isFinite(cents) ? cents : 0
  return `R$ ${(value / 100).toFixed(2).replace('.', ',')}`
}
