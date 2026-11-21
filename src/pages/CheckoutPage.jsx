import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MapPin, User, CreditCard, Banknote, QrCode, AlertCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useCatalog } from '../hooks/useCatalog'
import { matchDeliveryZone } from '../utils/delivery'
import SectionHeading from '../components/ui/SectionHeading'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotalCents, clearCart } = useCart()
  const { deliveryZones } = useCatalog()

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryReference: '',
    deliveryRadiusKm: '2.5', // Raio estimado padrão
    paymentMethod: 'card_delivery',
    paymentChangeFor: '',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const matchedZone = useMemo(() => {
    const radius = parseFloat(formData.deliveryRadiusKm) || 2.5
    return matchDeliveryZone(radius, deliveryZones)
  }, [formData.deliveryRadiusKm, deliveryZones])

  const deliveryFeeCents = matchedZone ? matchedZone.feeCents || matchedZone.fee_cents || 500 : 500
  const totalCents = subtotalCents + deliveryFeeCents

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
    setSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          deliveryAddress: formData.deliveryAddress,
          deliveryReference: formData.deliveryReference,
          deliveryRadiusKm: parseFloat(formData.deliveryRadiusKm),
          paymentMethod: formData.paymentMethod,
          paymentChangeFor: formData.paymentMethod === 'cash_delivery' ? formData.paymentChangeFor : null,
          notes: formData.notes,
          items,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Falha ao processar o pedido.')
      }

      // Limpa a sacola e redireciona para a página de confirmação com os dados do pedido persistido
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
            items,
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
        description="Apenas entrega em domicílio. O pedido será registrado com segurança em nosso banco de dados."
      />

      {errorMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Dados do Cliente */}
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
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Ex: João da Silva"
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
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="Ex: (21) 99999-9999"
                className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Endereço de Entrega */}
        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface">
            <MapPin className="h-5 w-5 text-primary" />
            Endereço de Entrega em Maricá
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
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Ex: Rua das Gaivotas, 120 - Parque Nanci"
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
              value={formData.deliveryReference}
              onChange={handleChange}
              placeholder="Ex: Próximo à praça / portão verde"
              className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="deliveryRadiusKm" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Estimativa de Distância da Loja (R. Canarinhos, 663)
            </label>
            <select
              id="deliveryRadiusKm"
              name="deliveryRadiusKm"
              value={formData.deliveryRadiusKm}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            >
              <option value="2.5">Até 3 km (Parque Nanci e imediações) — R$ 5,00</option>
              <option value="5.0">De 3 a 6 km (Região central/vizinhos) — R$ 8,00</option>
              <option value="8.5">De 6 a 10 km (Maricá expandido) — R$ 12,00</option>
            </select>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface">
            <CreditCard className="h-5 w-5 text-primary" />
            Pagamento no Ato da Entrega
          </h2>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all ${formData.paymentMethod === 'card_delivery' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-outline-variant text-on-surface'}`}>
              <CreditCard className="h-6 w-6 mb-2" />
              <input
                type="radio"
                name="paymentMethod"
                value="card_delivery"
                checked={formData.paymentMethod === 'card_delivery'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm">Cartão (Maquininha)</span>
            </label>

            <label className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all ${formData.paymentMethod === 'cash_delivery' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-outline-variant text-on-surface'}`}>
              <Banknote className="h-6 w-6 mb-2" />
              <input
                type="radio"
                name="paymentMethod"
                value="cash_delivery"
                checked={formData.paymentMethod === 'cash_delivery'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm">Dinheiro</span>
            </label>

            <label className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all ${formData.paymentMethod === 'pix_delivery' ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-outline-variant text-on-surface'}`}>
              <QrCode className="h-6 w-6 mb-2" />
              <input
                type="radio"
                name="paymentMethod"
                value="pix_delivery"
                checked={formData.paymentMethod === 'pix_delivery'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm">Pix na Entrega</span>
            </label>
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
                value={formData.paymentChangeFor}
                onChange={handleChange}
                placeholder="Ex: R$ 50,00 ou Não preciso de troco"
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
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ex: Tirar cebola, sem maionese, interfone 102..."
              className="mt-1.5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Resumo Financeiro e Envio */}
        <div className="rounded-lg border border-outline-variant bg-surface-container p-6">
          <div className="space-y-2 border-b border-outline-variant pb-4 text-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal dos itens</span>
              <span>R$ {(subtotalCents / 100).toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Taxa de Entrega estimada</span>
              <span>R$ {(deliveryFeeCents / 100).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between font-headline-md text-xl font-extrabold text-on-surface">
            <span>Total a Pagar na Entrega:</span>
            <span className="text-primary">R$ {(totalCents / 100).toFixed(2).replace('.', ',')}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full min-h-12 items-center justify-center rounded-lg bg-primary py-3.5 font-label-bold text-base text-on-primary shadow-lg transition-transform hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? 'Gravando Pedido no Sistema...' : 'Confirmar e Enviar Pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}
