import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'turquia_cart_items_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Falha silenciosa em caso de restrição de storage
    }
  }, [items])

  const addItem = (product, quantity = 1, options = []) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === product.id && JSON.stringify(i.options) === JSON.stringify(options)
      )

      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        }
        return next
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          unitPriceCents: product.price_cents || 2990,
          quantity,
          options,
        },
      ]
    })
  }

  const updateQuantity = (index, delta) => {
    setItems((prev) => {
      const next = [...prev]
      const current = next[index]
      if (!current) return prev

      const newQty = current.quantity + delta
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index)
      }

      next[index] = { ...current, quantity: newQty }
      return next
    })
  }

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setItems([])
  }

  const summary = useMemo(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const subtotalCents = items.reduce((acc, item) => {
      const itemOptionTotal = (item.options || []).reduce(
        (optAcc, opt) => optAcc + (opt.priceCents || 0),
        0
      )
      return acc + (item.unitPriceCents + itemOptionTotal) * item.quantity
    }, 0)

    return {
      totalItems,
      subtotalCents,
      formattedSubtotal: `R$ ${(subtotalCents / 100).toFixed(2).replace('.', ',')}`,
    }
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        ...summary,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const defaultCartValue = {
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotalCents: 0,
  formattedSubtotal: 'R$ 0,00',
}

export function useCart() {
  const context = useContext(CartContext)
  return context || defaultCartValue
}
