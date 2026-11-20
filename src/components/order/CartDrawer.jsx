import { useEffect, useRef } from 'react'
import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react'
import { useOrderCart } from '../../hooks/useOrderCart'
import { DEFAULT_NEIGHBORHOODS, ORDER_TYPES, PAYMENT_METHODS } from '../../data/orderConfig'
import { formatCurrency, getWhatsAppOrderUrl } from '../../utils/orderPayload'

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    orderType,
    setOrderType,
    customer,
    setCustomer,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalItems,
  } = useOrderCart()

  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (isDrawerOpen) {
      closeButtonRef.current?.focus()
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsDrawerOpen(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, setIsDrawerOpen])

  if (!isDrawerOpen) return null

  const handleCheckout = (e) => {
    e.preventDefault()
    if (items.length === 0) return
    const url = getWhatsAppOrderUrl({ items, orderType, customer })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Sacola de Pedidos">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-6 md:pl-10">
        <aside className="flex w-screen max-w-md flex-col bg-white shadow-2xl">
          {/* Topo da Sacola */}
          <div className="flex items-center justify-between border-b border-[#e8e0d4] px-6 py-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-extrabold text-on-surface">Sua Sacola ({totalItems})</h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Fechar sacola"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="h-16 w-16 text-[#e8e0d4]" aria-hidden="true" />
                <p className="mt-4 font-bold text-on-surface">Sua sacola está vazia.</p>
                <p className="mt-1 text-sm text-on-surface-variant">Escolha lanches deliciosos na aba de pedidos!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Lista de itens */}
                <ul className="divide-y divide-[#e8e0d4]">
                  {items.map((item, idx) => (
                    <li key={`${item.product.id}-${idx}`} className="flex items-start justify-between gap-3 py-3.5">
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-on-surface">{item.product.name}</p>
                        <p className="text-xs font-bold text-primary">{item.product.price}</p>
                        {item.notes && <p className="mt-1 text-xs italic text-on-surface-variant">Obs: {item.notes}</p>}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#e8e0d4] text-xs font-bold hover:bg-surface-container"
                            aria-label={`Diminuir quantidade de ${item.product.name}`}
                          >
                            -
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-[#e8e0d4] text-xs font-bold hover:bg-surface-container"
                            aria-label={`Aumentar quantidade de ${item.product.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="p-1 text-on-surface-variant hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Remover ${item.product.name} da sacola`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Formulário de Entrega e Pagamento */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 border-t border-[#e8e0d4] pt-4">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-on-surface">Tipo de Pedido</span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType(ORDER_TYPES.DELIVERY)}
                        className={`rounded-lg border py-2.5 text-xs font-bold transition-colors ${
                          orderType === ORDER_TYPES.DELIVERY
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-[#e8e0d4] text-on-surface-variant'
                        }`}
                      >
                        🛵 Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType(ORDER_TYPES.PICKUP)}
                        className={`rounded-lg border py-2.5 text-xs font-bold transition-colors ${
                          orderType === ORDER_TYPES.PICKUP
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-[#e8e0d4] text-on-surface-variant'
                        }`}
                      >
                        🛍️ Retirar no Balcão
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customer-name" className="block text-xs font-bold uppercase text-on-surface">
                      Seu Nome *
                    </label>
                    <input
                      id="customer-name"
                      required
                      type="text"
                      placeholder="Ex: Carlos Oliveira"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="mt-1 w-full rounded-md border border-[#e8e0d4] p-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer-phone" className="block text-xs font-bold uppercase text-on-surface">
                      Seu WhatsApp *
                    </label>
                    <input
                      id="customer-phone"
                      required
                      type="tel"
                      placeholder="(21) 99999-9999"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="mt-1 w-full rounded-md border border-[#e8e0d4] p-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  {orderType === ORDER_TYPES.DELIVERY && (
                    <>
                      <div>
                        <label htmlFor="customer-address" className="block text-xs font-bold uppercase text-on-surface">
                          Endereço de Entrega *
                        </label>
                        <input
                          id="customer-address"
                          required
                          type="text"
                          placeholder="Rua, Número e Apto"
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          className="mt-1 w-full rounded-md border border-[#e8e0d4] p-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="customer-neighborhood" className="block text-xs font-bold uppercase text-on-surface">
                          Bairro em Maricá
                        </label>
                        <select
                          id="customer-neighborhood"
                          value={customer.neighborhood}
                          onChange={(e) => setCustomer({ ...customer, neighborhood: e.target.value })}
                          className="mt-1 w-full rounded-md border border-[#e8e0d4] bg-white p-2 text-sm focus:border-primary focus:outline-none"
                        >
                          {DEFAULT_NEIGHBORHOODS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="customer-complement" className="block text-xs font-bold uppercase text-on-surface">
                          Ponto de Referência
                        </label>
                        <input
                          id="customer-complement"
                          type="text"
                          placeholder="Ex: Próximo à praça / orla"
                          value={customer.complement}
                          onChange={(e) => setCustomer({ ...customer, complement: e.target.value })}
                          className="mt-1 w-full rounded-md border border-[#e8e0d4] p-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <span className="block text-xs font-bold uppercase text-on-surface">Forma de Pagamento</span>
                    <div className="mt-1 space-y-1.5">
                      {[
                        { id: PAYMENT_METHODS.PIX, label: 'Pix (chave enviada na confirmação)' },
                        { id: PAYMENT_METHODS.CARD, label: 'Cartão na maquininha' },
                        { id: PAYMENT_METHODS.CASH, label: 'Dinheiro' },
                      ].map((m) => (
                        <label key={m.id} className="flex cursor-pointer items-center gap-2 text-sm text-on-surface">
                          <input
                            type="radio"
                            name="payment"
                            value={m.id}
                            checked={customer.paymentMethod === m.id}
                            onChange={() => setCustomer({ ...customer, paymentMethod: m.id })}
                            className="text-primary focus:ring-primary"
                          />
                          {m.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {customer.paymentMethod === PAYMENT_METHODS.CASH && (
                    <div>
                      <label htmlFor="customer-change" className="block text-xs font-bold uppercase text-on-surface">
                        Troco para quanto?
                      </label>
                      <input
                        id="customer-change"
                        type="text"
                        placeholder="Ex: R$ 50,00 ou R$ 100,00"
                        value={customer.changeFor}
                        onChange={(e) => setCustomer({ ...customer, changeFor: e.target.value })}
                        className="mt-1 w-full rounded-md border border-[#e8e0d4] p-2 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="customer-general-notes" className="block text-xs font-bold uppercase text-on-surface">
                      Observações gerais do pedido
                    </label>
                    <textarea
                      id="customer-general-notes"
                      placeholder="Ex: Enviar guardanapos e sachês"
                      value={customer.generalNotes}
                      onChange={(e) => setCustomer({ ...customer, generalNotes: e.target.value })}
                      className="mt-1 w-full rounded-md border border-[#e8e0d4] p-2 text-sm focus:border-primary focus:outline-none"
                      rows={2}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Rodapé fixo da Sacola com Subtotal e Botão */}
          {items.length > 0 && (
            <div className="space-y-3 border-t border-[#e8e0d4] bg-[#faf7f2] p-6">
              <div className="flex justify-between text-base font-extrabold text-on-surface">
                <span>Subtotal:</span>
                <span className="text-primary">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                {orderType === ORDER_TYPES.DELIVERY ? '🛵 Taxa de entrega a combinar no WhatsApp' : '🛍️ Retirada grátis no Parque Nanci'}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-lg border border-[#e8e0d4] px-3 py-3 text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                  title="Esvaziar sacola"
                >
                  Limpar
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white shadow-md transition-transform active:scale-95 hover:bg-[#20ba59]"
                >
                  <span>Enviar Pedido pelo WhatsApp</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
