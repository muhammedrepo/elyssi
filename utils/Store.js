import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react'

export const Store = createContext()

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : {
        cartItems: [],
        shippingAddress: {},
      },
}

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      )
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          shippingMethod: '',
          paymentMethod: '',
        },
      }
    case 'CART_CLEAR_ITEMS':
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      }
    case 'SAVE_SHIPPING_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingMethod: action.payload,
        },
      }

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      }
    default:
      return state
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Calculate cartItemsCount dynamically
  const cartItemsCount = state.cart.cartItems.reduce(
    (a, c) => a + c.quantity,
    0
  )

  // Create a new state object that includes cartItemsCount
  const newState = { ...state, cartItemsCount }
  const value = { state: newState, dispatch }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
