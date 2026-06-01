'use client'
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY'; id: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD'; items: CartItem[] }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product_id === action.product.id)
      if (existing) {
        return { ...state, items: state.items.map(i => i.product_id === action.product.id ? { ...i, quantity: i.quantity + (action.quantity || 1) } : i) }
      }
      const newItem: CartItem = {
        id: `${action.product.id}-${Date.now()}`,
        product_id: action.product.id,
        product: action.product,
        quantity: action.quantity || 1,
      }
      return { ...state, items: [...state.items, newItem] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i) }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'LOAD':
      return { ...state, items: action.items }
    default:
      return state
  }
}

interface CartContextType extends CartState {
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elyvate_cart')
      if (saved) dispatch({ type: 'LOAD', items: JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('elyvate_cart', JSON.stringify(state.items)) } catch {}
  }, [state.items])

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const subtotal   = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      ...state,
      addItem:    (p, q) => dispatch({ type: 'ADD_ITEM', product: p, quantity: q }),
      removeItem: (id)   => dispatch({ type: 'REMOVE_ITEM', id }),
      updateQty:  (id, q)=> dispatch({ type: 'UPDATE_QTY', id, quantity: q }),
      clearCart:  ()     => dispatch({ type: 'CLEAR' }),
      toggleCart: ()     => dispatch({ type: 'TOGGLE_CART' }),
      closeCart:  ()     => dispatch({ type: 'CLOSE_CART' }),
      totalItems,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
