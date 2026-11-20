/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { parsePriceToNumber } from '../utils/orderPayload'
import { ORDER_TYPES, PAYMENT_METHODS } from '../data/orderConfig'

const CART_STORAGE_KEY = 'turquia_order_cart_v1'

const CartContext = createContext(null)

export function OrderCartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(CART_STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
      }
      return []
    } catch {
      return []
    }
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [orderType, setOrderType] = useState(ORDER_TYPES.DELIVERY)
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: 'Parque Nanci',
    complement: '',
    paymentMethod: PAYMENT_METHODS.PIX,
    changeFor: '',
    generalNotes: '',
  })

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      }
    } catch {
      // storage restrito ou não disponível
    }
  }, [items])

  const addItem = (product, quantity = 1, notes = '') => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id && item.notes === notes)
      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex].quantity += quantity
        return next
      }
      return [...prev, { product, quantity, notes }]
    })
    setIsDrawerOpen(true)
  }

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index, delta) => {
    setItems((prev) => {
      const next = [...prev]
      if (!next[index]) return prev
      const newQty = next[index].quantity + delta
      if (newQty <= 0) return prev.filter((_, i) => i !== index)
      next[index] = { ...next[index], quantity: newQty }
      return next
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items])
  const subtotal = useMemo(
    () => {
      const raw = items.reduce((acc, item) => acc + parsePriceToNumber(item.product.price) * item.quantity, 0)
      return Math.round(raw * 100) / 100
    },
    [items]
  )

  const value = {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    orderType,
    setOrderType,
    customer,
    setCustomer,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useOrderCart() {
  const context = useContext(CartContext)
  if (!context) {
    return {
      items: [],
      isDrawerOpen: false,
      setIsDrawerOpen: () => {},
      orderType: ORDER_TYPES.DELIVERY,
      setOrderType: () => {},
      customer: {
        name: '',
        phone: '',
        address: '',
        neighborhood: 'Parque Nanci',
        complement: '',
        paymentMethod: PAYMENT_METHODS.PIX,
        changeFor: '',
        generalNotes: '',
      },
      setCustomer: () => {},
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      subtotal: 0,
    }
  }
  return context
}
