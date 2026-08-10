import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
  deliveryType: 'delivery',
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Mescla itens idênticos (mesma chave de personalização) incrementando a
      // quantidade; itens com personalizações diferentes permanecem separados.
      const existing = state.items.find((item) => item.key === action.item.key)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.key === action.item.key ? { ...item, qty: item.qty + action.item.qty } : item,
          ),
        }
      }
      return { ...state, items: [...state.items, action.item] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.key !== action.key) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.key === action.key ? { ...item, qty: Math.max(1, action.qty) } : item,
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'SET_DELIVERY':
      return { ...state, deliveryType: action.deliveryType }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item })
  const removeItem = (key) => dispatch({ type: 'REMOVE_ITEM', key })
  const updateQty = (key, qty) => dispatch({ type: 'UPDATE_QTY', key, qty })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const setDelivery = (deliveryType) => dispatch({ type: 'SET_DELIVERY', deliveryType })

  const cartCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.qty, 0),
    [state.items],
  )

  const cartTotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
    [state.items],
  )

  const value = useMemo(
    () => ({
      items: state.items,
      deliveryType: state.deliveryType,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      setDelivery,
      cartCount,
      cartTotal,
    }),
    [state.items, state.deliveryType, cartCount, cartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um <CartProvider>')
  }
  return context
}
