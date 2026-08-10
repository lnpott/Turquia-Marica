import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import EmptyCartState from '../components/cart/EmptyCartState'
import DeliverySelector from '../components/checkout/DeliverySelector'
import AddressForm from '../components/checkout/AddressForm'
import PaymentSelector from '../components/checkout/PaymentSelector'
import OrderSummaryPanel from '../components/checkout/OrderSummaryPanel'
import CheckoutField from '../components/checkout/CheckoutField'

const INITIAL_VALUES = {
  name: '',
  phone: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
}

const ADDRESS_FIELDS = ['cep', 'street', 'number', 'neighborhood', 'city']

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="material-symbols-outlined text-primary fill-icon text-[32px]" aria-hidden="true">
        {icon}
      </span>
      <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
    </div>
  )
}

function Checkout() {
  const { items, cartTotal, deliveryType, setDelivery, placeOrder } = useCart()
  const navigate = useNavigate()

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [payment, setPayment] = useState('pix')
  const [cashAmount, setCashAmount] = useState('')
  const [observations, setObservations] = useState('')

  if (items.length === 0) {
    return <EmptyCartState />
  }

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Limpa o erro do campo assim que o usuário começa a corrigi-lo.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // Validação mínima: impede finalizar com dados obrigatórios ausentes.
  // Em "Retirada", só nome e telefone são exigidos; em "Entrega", o endereço
  // completo (CEP, rua, número, bairro, cidade) também.
  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Informe seu nome'
    if (!values.phone.trim()) nextErrors.phone = 'Informe seu telefone'
    if (deliveryType === 'delivery') {
      for (const field of ADDRESS_FIELDS) {
        if (!values[field].trim()) {
          nextErrors[field] = 'Campo obrigatório'
        }
      }
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Conclui o pedido: PLACE_ORDER grava o snapshot (itens, entrega, pagamento,
    // observações) em lastOrder e limpa a sacola — depois navega para a
    // confirmação, que exibe o snapshot sem perder dados.
    placeOrder({
      items,
      deliveryType,
      payment,
      cashAmount,
      observations: observations.trim(),
      // Número demonstrativo (sem backend) — gerado no checkout e exibido como
      // "Pedido #XXXX" na confirmação (decisão registrada no roadmap).
      orderNumber: String(Math.floor(1000 + Math.random() * 9000)),
      placedAt: Date.now(),
    })
    navigate('/confirmacao')
  }

  return (
    <main className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-loose">
      <Link
        to="/sacola"
        className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors mb-6"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
        <span className="font-label-bold text-label-bold hidden md:inline">Voltar ao Carrinho</span>
      </Link>

      <div className="mb-stack-loose text-center md:text-left">
        <h1 className="font-headline-lg text-headline-lg text-on-background">Finalizar Pedido</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Quase lá! Preencha os dados abaixo para receber seu lanche.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-loose">
          {/* Coluna esquerda: formulários */}
          <div className="lg:col-span-8 flex flex-col gap-stack-loose">
            {/* 1. Seus Dados */}
            <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-[0_4px_15px_rgba(135,66,0,0.12)]">
              <SectionHeader icon="person" title="1. Seus Dados" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <CheckoutField
                  id="name"
                  label="Nome Completo"
                  required
                  error={errors.name}
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ex: João Silva"
                  autoComplete="name"
                />
                <CheckoutField
                  id="phone"
                  label="WhatsApp / Telefone"
                  required
                  error={errors.phone}
                  value={values.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                  type="tel"
                  autoComplete="tel"
                />
              </div>
            </section>

            {/* 2. Entrega ou Retirada */}
            <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-[0_4px_15px_rgba(135,66,0,0.12)]">
              <SectionHeader icon="location_on" title="2. Entrega ou Retirada" />
              <div className="flex flex-col gap-gutter">
                <DeliverySelector value={deliveryType} onChange={setDelivery} />
                {deliveryType === 'delivery' && (
                  <div className="mt-2">
                    <AddressForm values={values} errors={errors} onChange={handleChange} />
                  </div>
                )}
              </div>
            </section>

            {/* 3. Forma de Pagamento */}
            <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-[0_4px_15px_rgba(135,66,0,0.12)]">
              <SectionHeader icon="payments" title="3. Forma de Pagamento" />
              <PaymentSelector
                value={payment}
                onChange={setPayment}
                cashAmount={cashAmount}
                onCashAmountChange={setCashAmount}
              />
            </section>

            {/* 4. Observações */}
            <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-[0_4px_15px_rgba(135,66,0,0.12)]">
              <SectionHeader icon="edit_note" title="4. Observações (Opcional)" />
              <CheckoutField
                id="observations"
                label="Alguma observação?"
                textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Tirar cebola, molho à parte, etc..."
              />
            </section>
          </div>

          {/* Coluna direita: resumo (sticky) */}
          <div className="lg:col-span-4">
            {/* O botão do painel é type="submit" e submete este <form>. */}
            <OrderSummaryPanel items={items} cartTotal={cartTotal} deliveryType={deliveryType} />
          </div>
        </div>
      </form>
    </main>
  )
}

export default Checkout
