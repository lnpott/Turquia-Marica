import { useState } from 'react'
import { ShieldCheck, RefreshCw, Edit2, Check, Package, DollarSign } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem('turquia_admin_token') || '')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ orders: [], products: [] })
  const [error, setError] = useState(null)
  const [editingPriceId, setEditingPriceId] = useState(null)
  const [newPriceReais, setNewPriceReais] = useState('')

  const loadAdminData = async (authToken = token) => {
    if (!authToken) return false
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin', {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const json = await res.json().catch(() => ({}))

      if (res.status === 401) {
        setAuthenticated(false)
        localStorage.removeItem('turquia_admin_token')
        setError('Token inválido ou expirado.')
        return false
      }

      if (res.status === 503) {
        setError(
          json.error === 'ADMIN_TOKEN_NOT_CONFIGURED'
            ? 'ADMIN_TOKEN não configurado no servidor.'
            : 'Supabase não configurado no servidor.',
        )
        return false
      }

      if (!res.ok) {
        const detail = [json.ordersMessage, json.productsMessage].filter(Boolean).join(' | ')
        throw new Error(detail || `Erro ao carregar dados (${res.status})`)
      }

      setData({ orders: json.orders || [], products: json.products || [] })
      setAuthenticated(true)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!token.trim()) return
    localStorage.setItem('turquia_admin_token', token.trim())
    await loadAdminData(token.trim())
  }

  const handleRefresh = () => {
    loadAdminData()
  }

  const handleUpdateProductPrice = async (productId) => {
    const priceCents = Math.round(parseFloat(newPriceReais.replace(',', '.')) * 100)
    if (isNaN(priceCents) || priceCents < 0) return

    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entity: 'product',
          id: productId,
          updates: { price_cents: priceCents },
        }),
      })

      if (res.status === 401) {
        setAuthenticated(false)
        localStorage.removeItem('turquia_admin_token')
        throw new Error('Sessão expirada')
      }
      if (!res.ok) throw new Error('Falha ao atualizar preço')
      setEditingPriceId(null)
      setNewPriceReais('')
      loadAdminData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entity: 'order',
          id: orderId,
          updates: { status: newStatus },
        }),
      })

      if (res.status === 401) {
        setAuthenticated(false)
        localStorage.removeItem('turquia_admin_token')
        throw new Error('Sessão expirada')
      }
      if (!res.ok) throw new Error('Falha ao atualizar status do pedido')
      loadAdminData()
    } catch (err) {
      alert(err.message)
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-[480px] px-5 py-24 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline-md text-2xl font-bold text-on-surface">Painel Administrativo</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Acesso restrito para gestão de pedidos e preços do cardápio.</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Chave de Acesso Admin"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none"
            autoComplete="current-password"
          />
          {error && (
            <p className="text-left text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full rounded-lg bg-primary py-3 font-label-bold text-on-primary hover:bg-primary-hover disabled:opacity-60"
          >
            {loading ? 'Validando…' : 'Acessar Painel'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-margin-desktop md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <SectionHeading
            eyebrow="Operação e Controle"
            title="Painel Administrativo Turquia"
            description="Acompanhamento de pedidos em tempo real e atualização de preços do catálogo."
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar Dados
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthenticated(false)
              localStorage.removeItem('turquia_admin_token')
              setError(null)
            }}
            className="rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm font-semibold text-error hover:bg-error/10"
          >
            Sair
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            Catálogo Oficial e Preços
          </h2>

          <ul className="divide-y divide-outline-variant/60 max-h-[500px] overflow-y-auto pr-1">
            {data.products.map((prod) => (
              <li key={prod.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-bold text-on-surface">{prod.name}</p>
                  <p className="text-xs text-on-surface-variant uppercase">{prod.category_id} · {prod.status}</p>
                </div>

                <div className="flex items-center gap-2">
                  {editingPriceId === prod.id ? (
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold">R$</span>
                      <input
                        type="text"
                        value={newPriceReais}
                        onChange={(e) => setNewPriceReais(e.target.value)}
                        placeholder="29,90"
                        className="w-16 rounded border border-outline-variant px-1.5 py-1 text-sm bg-surface"
                      />
                      <button
                        type="button"
ms onClick={() => handleUpdateProductPrice(prod.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-primary">
                        R$ {(prod.price_cents / 100).toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPriceId(prod.id)
                          setNewPriceReais((prod.price_cents / 100).toFixed(2).replace('.', ','))
                        }}
                        className="p-1 text-on-surface-variant hover:text-primary rounded"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6">
          <h2 className="flex items-center gap-2 font-headline-sm text-lg font-bold text-on-surface mb-4">
            <Package className="h-5 w-5 text-primary" />
            Pedidos Recentes ({data.orders.length})
          </h2>

          {data.orders.length === 0 ? (
            <p className="text-sm text-on-surface-variant italic py-6 text-center">Nenhum pedido registrado ainda.</p>
          ) : (
            <ul className="divide-y divide-outline-variant/60 max-h-[500px] overflow-y-auto pr-1 space-y-2">
              {data.orders.map((ord) => (
                <li key={ord.id} className="py-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-primary">#{ord.order_number}</span> ·{' '}
                      <span className="font-bold text-on-surface">{ord.customer_name}</span>
                      <p className="text-xs text-on-surface-variant">{ord.customer_phone}</p>
                    </div>

                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="rounded border border-outline-variant bg-surface px-2 py-1 text-xs font-semibold"
                    >
                      <option value="pending">Pendente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="preparing">Em Preparo</option>
                      <option value="dispatched">Saiu para Entrega</option>
                      <option value="delivered">Entregue</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </div>

                  <div className="mt-2 text-xs text-on-surface-variant bg-surface p-2 rounded">
                    <p><strong>Endereço:</strong> {ord.delivery_address} ({ord.delivery_reference})</p>
                    <p><strong>Total:</strong> R$ {(ord.total_cents / 100).toFixed(2).replace('.', ',')} ({ord.payment_method})</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
