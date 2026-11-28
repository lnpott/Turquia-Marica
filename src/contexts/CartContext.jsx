import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'turquia_cart_items_v1'

function normalizeLine(raw) {
  if (!raw || typeof raw.productId !== 'string' || !raw.productId) return null
  const quantity = Math.floor(Number(raw.quantity))
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) return null
  const optionIds = Array.isArray(raw.optionIds)
    ? raw.optionIds.filter((id) => typeof id === 'string')
    : (raw.options || []).map((option) => option?.id).filter((id) => typeof id === 'string')
  return { productId: raw.productId, quantity, optionIds }
}

function readStoredLines() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeLine).filter(Boolean)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredLines)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage indisponível
    }
  }, [items])

  const totalItems = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  )

  const addItem = (product, quantity = 1, optionIds = []) => {
    const line = normalizeLine({
      productId: product?.id,
      quantity,
      optionIds,
    })
    if (!line || (product?.status && product.status !== 'active')) return

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === line.productId && JSON.stringify(item.optionIds) === JSON.stringify(line.optionIds),
      )
      if (existingIndex > -1) {
        const next = [...prev]
        const merged = next[existingIndex].quantity + line.quantity
        next[existingIndex] = { ...next[existingIndex], quantity: Math.min(20, merged) }
        return next
      }
      return [...prev, line]
    })
  }

  const updateQuantity = (index, delta) => {
    setItems((prev) => {
      const next = [...prev]
      const current = next[index]
      if (!current) return prev
      const newQty = current.quantity + delta
      if (newQty <= 0) return next.filter((_, i) => i !== index)
      next[index] = { ...current, quantity: Math.min(20, newQty) }
      return next
    })
  }

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setItems([])
  }

  const value = useMemo(
    () => ({ items, totalItems, addItem, updateQuantity, removeItem, clearCart }),
    [items, totalItems],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

const defaultCartValue = {
  items: [],
  totalItems: 0,
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
}

export function useCart() {
  const context = useContext(CartContext)
  return context || defaultCartValue
}
