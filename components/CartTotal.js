import { Store } from '@/utils/Store'
import { useContext } from 'react'
import dynamic from 'next/dynamic'
function CartTotal() {
  const { state } = useContext(Store)
  const { cartItemsCount } = state
  const {
    cart: { cartItems },
  } = state

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  const taxPrice = round2(itemsPrice * 0.15)
  const shippingPrice = itemsPrice > 200 ? 0 : 20
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

  return (
    <div className="mb-12 pt-4">
      <p className="font-hkbold pt-1 pb-2 text-secondary">Cart Total</p>
      <div className="flex justify-between border-b border-grey-darker pb-1">
        <span className="font-hk text-secondary">
          Subtotal ({cartItemsCount}) :
        </span>
        <span className="font-hk text-secondary">$ {itemsPrice}</span>
      </div>
      {/* <div className="flex justify-between border-b border-grey-darker pt-2 pb-1">
        <span className="font-hk text-secondary">Shipping price</span>
        <span className="font-hk text-secondary"> ${shippingPrice} </span>
      </div> */}
      <div className="flex justify-between border-b border-grey-darker pt-2 pb-1">
        <span className="font-hk text-secondary">Tax price</span>
        <span className="font-hk text-secondary"> ${taxPrice} </span>
      </div>
      <div className="flex justify-between pt-3">
        <span className="font-hkbold text-secondary">Total</span>
        <span className="font-hkbold text-secondary">${totalPrice}</span>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(CartTotal), { ssr: false })
