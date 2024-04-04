/* eslint-disable @next/next/no-img-element */
import { Store } from '@/utils/Store'
import Link from 'next/link'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ThreeIcons({ product }) {
  const { state, dispatch } = useContext(Store)

  if (!product) {
    return <div>Product Not Found</div>
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock')
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    toast.success('Product is added to cart')
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-secondary bg-opacity-85 opacity-0 transition-opacity group-hover:opacity-100">
      <button
        onClick={() => addToCartHandler(product)}
        className="mr-3 flex items-center rounded-full bg-white p-3 transition-all hover:bg-primary-light">
        <img src="/images/icon-cart.svg" className="h-6 w-6" alt="icon cart" />
      </button>
      <Link
        href={`/product/${product.slug}`}
        className="mr-3 flex items-center rounded-full bg-white p-3 transition-all hover:bg-primary-light">
        <img
          src="/images/icon-search.svg"
          className="h-6 w-6"
          alt="icon search"
        />
      </Link>
      <Link
        href="/account/wishlist/"
        className="flex items-center rounded-full bg-white p-3 transition-all hover:bg-primary-light">
        <img
          src="/images/icon-heart.svg"
          className="h-6 w-6"
          alt="icon heart"
        />
      </Link>
    </div>
  )
}
