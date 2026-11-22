import { useMemo, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MapPin, User, CreditCard, Banknote, QrCode, AlertCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useCatalog } from '../hooks/useCatalog'
import { quoteCart } from '../lib/quoteCart'
import { formatCents } from '../lib/money'
import { matchDeliveryZone, sortDeliveryZones } from '../utils/delivery'
import SectionHeading from '../components/ui/SectionHeading'
import UnavailableNotice from '../components/ui/UnavailableNotice'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  const { products, deliveryZones, status } = useCatalog()
  const quote = quoteCart(items, products)
  const zones = sortDeliveryZones(deliveryZones)
  const idempotencyRef = useRef({ hash: '', key: '' })

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryReference: '',
    zoneId: '',
    paymentMethod: 'card_delivery',
    paymentChangeFor: '',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const matchedZone = useMemo(
    () => matchDeliveryZone(formData.zoneId, zones),
    [formData.zoneId, zones],
  )

  const deliveryFeeCents = matchedZone ? matchedZone.feeCents : null
  const totalCents = deliveryFeeCents == null ? null : quote.subtotalCents + deliveryFeeCents
  const canSubmit = status === 'ready' && quote.issues.length === 0 && quote.lines.length > 0 && matchedZone && !submitting

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-20 text-center">
        <h2 className="text-xl font-bold text-on-surface">Sua sacola está vazia</h2>
        <p className="mt-2 text-on-surface-variant">Adicione produtos antes de finalizar o pedido.</p>
        <Link to="/#cardapio" className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-on-primary">
          Ver Cardápio
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setErrorMessage(null)

    const body = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      deliveryAddress: formData.deliveryAddress,
      deliveryReference: formData.deliveryReference,
      zoneId: formData.zoneId,
      paymentMethod: formData.paymentMethod,
      paymentChangeFor: formData.paymentMethod === 'cash_delivery' ? formData.paymentChangeFor : null,
      notes: formData.notes,
      items: quote.lines.filter((line) => !line.unavailable).map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
        optionIds: line.optionIds,
      })),
    }

    const hash = JSON.stringify(body)
    if (idempotencyRef.current.hash !== hash) {
      idempotencyRef.current = { hash, key: crypto.randomUUID() }
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, idempotencyKey: idempotencyRef.current.key }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Falha ao processar o pedido.')
      }

      clearCart()
      navigate('/pedido/confirmado', {
        state: {
          order: {
            ...data,
            customerName: formData.customerName,
            deliveryAddress: formData.deliveryAddress,
            deliveryReference: formData.deliveryReference,
            paymentMethod: formData.paymentMethod,
            paymentChangeFor: formData.paymentChangeFor,
            notes: formData.notes,
            items: data.items || [],
          },
        },
      })
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-[800px] px-5 py-12 md:px-margin-desktop md:py-16">
      <Link to="/sacola" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Voltar para a Sacola
      </Link>

      <SectionHeading
        eyebrow="Finalização de Pedido"
        title="Dados de Entrega e Pagamento"
        description="O total é recalculado no servidor com o preço e a zona gravados no banco. O valor desta tela não é a cobrança."
      />

      <p className="mt-4 text-sm text-on-surface-variant">
        A janela de horário em que a loja aceita pedido ainda não foi configurada. O horário publicado no site não bloqueia este envio.
      </p>

      {status !== 'ready' && (
        <UnavailableNotice
          className="mt-6"
          title="Catálogo indisponível"
          description="Sem o catálogo não há preço nem taxa. O pedido não será enviado."
        />
      )}

      {quote.issues.length > 0 && (
        <UnavailableNotice
          className="mt-6"
          title="Sacola desatualizada"
          description="Algum item saiu do catálogo ou o opcional não existe mais. Volte à sacola e remova antes de enviar."
        />
      )}

      {errorMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface">
            <User className="h-5 w-5 text-primary" />
            Identificação
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="customerName" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Seu Nome Completo *
              </label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                required
                minLength={2}
                maxLength={120}
                value={formData.customerName}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="customerPhone" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                WhatsApp / Telefone *
              </label>
              <input
                id="customerPhone"
                type="tel"
                name="customerPhone"
                required
                minLength={8}
                maxLength={20}
                value={formData.customerPhone}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface">
            <MapPin className="h-5 w-5 text-primary" />
            Entrega
          </h2>

          <div>
            <label htmlFor="deliveryAddress" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Rua, Número e Bairro *
            </label>
            <input
              id="deliveryAddress"
              type="text"
              name="deliveryAddress"
              required
              minLength={5}
              maxLength={240}
              value={formData.deliveryAddress}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="deliveryReference" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Ponto de Referência *
            </label>
            <input
              id="deliveryReference"
              type="text"
              name="deliveryReference"
              required
              minLength={2}
              maxLength={160}
              value={formData.deliveryReference}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="zoneId" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Zona de entrega *
            </label>
            {zones.length === 0 ? (
              <p className="mt-2 text-sm text-on-surface-variant">
                Nenhuma zona ativa no banco. A entrega não tem taxa e o pedido fica bloqueado.
              </p>
            ) : (
              <select
                id="zoneId"
                name="zoneId"
                required
                value={formData.zoneId}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
              >
                <option value="">Selecione a faixa</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.description} — {formatCents(zone.fee_cents)}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface">
            <CreditCard className="h-5 w-5 text-primary" />
            Pagamento no ato da entrega
          </h2>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['card_delivery', 'Cartão (maquininha)', CreditCard],
              ['cash_delivery', 'Dinheiro', Banknote],
              ['pix_delivery', 'Pix na entrega', QrCode],
            ].map(([value, label, Icon]) => (
              <label
                key={value}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all ${formData.paymentMethod === value ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-outline-variant text-on-surface'}`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={formData.paymentMethod === value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>

          {formData.paymentMethod === 'cash_delivery' && (
            <div className="pt-2">
              <label htmlFor="paymentChangeFor" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Troco para quanto? (Opcional)
              </label>
              <input
                id="paymentChangeFor"
                type="text"
                name="paymentChangeFor"
                maxLength={40}
                value={formData.paymentChangeFor}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
          )}

          <div>
            <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Instruções / Observações (Opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              maxLength={400}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container p-6">
          <div className="space-y-2 border-b border-outline-variant pb-4 text-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal dos itens</span>
              <span>{formatCents(quote.subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Taxa da zona selecionada</span>
              <span>{deliveryFeeCents == null ? '—' : formatCents(deliveryFeeCents)}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between font-headline-md text-xl font-extrabold text-on-surface">
            <span>Total estimado</span>
            <span className="text-primary">{totalCents == null ? '—' : formatCents(totalCents)}</span>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 flex w-full min-h-12 items-center justify-center rounded-lg bg-primary py-3.5 font-label-bold text-base text-on-primary shadow-lg transition-transform hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? 'Gravando pedido…' : 'Confirmar pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}
