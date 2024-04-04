import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/layout/Layout'
import dynamic from 'next/dynamic'
import Image from "next/image"
import { useRouter } from 'next/router'
import ChevronLeft from '@heroicons/react/24/solid/ChevronLeftIcon'
import { useContext, useEffect, useState } from 'react'
import { Store } from '@/utils/Store'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { getError } from '@/utils/error'
import axios from 'axios'

function PaymentMethodScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)

  const { state, dispatch } = useContext(Store)
  const { cart, cartItemsCount } = state
  const { cartItems, shippingAddress, shippingMethod, paymentMethod } = cart
  const router = useRouter()

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  const taxPrice = round2(itemsPrice * 0.15)
  const shippingPrice = itemsPrice > 200 ? 0 : 20
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!selectedPaymentMethod) {
      return toast.error('Please select a payment method')
    }

    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: selectedPaymentMethod,
    })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    )
    try {
      setLoading(true)
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        shippingMethod,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      setLoading(false)
      dispatch({ type: 'CART_CLEAR_ITEMS' })
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      )
      router.push(`/order/${data._id}`)
    } catch (err) {
      setLoading(false)
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || '')
  }, [router, shippingAddress.address, shippingMethod, paymentMethod])

  return (
    <Layout title="Payment Method">
      <div className="container mx-auto px-4 border-t border-grey-dark pt-10 sm:pt-12">
        <div className="flex flex-col-reverse justify-between pb-16 sm:pb-20 lg:flex-row lg:pb-24">
          <div className="lg:w-2/3 lg:pr-16 xl:pr-20">
            <CheckoutWizard activeStep={3} />

            {cartItems.length === 0 ? (
              <div className="mt-8">
                Cart is empty.{' '}
                <Link href="/" className="primary-button">
                  Go shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-10 rounded border border-grey-darker px-4 py-3 sm:px-5 md:mt-12">
                  <div className="flex border-b border-grey-dark pb-2">
                    <div className="w-1/5">
                      <p className="font-hk text-secondary">Contact</p>
                    </div>
                    <div className="w-3/5">
                      <p className="font-hk text-secondary">test@email.com</p>
                    </div>
                    <div className="w-1/5 text-right">
                      <Link
                        href="/shipping"
                        className="font-hk text-primary underline">
                        Change
                      </Link>
                    </div>
                  </div>
                  <div className="flex border-b border-grey-dark pt-2 pb-2">
                    <div className="w-1/5">
                      <p className="font-hk text-secondary">Ship to</p>
                    </div>
                    <div className="w-3/5">
                      <p className="font-hk text-secondary">
                        {shippingAddress.fullName}, {shippingAddress.address},{' '}
                        {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                        {shippingAddress.country}
                      </p>
                    </div>
                    <div className="w-1/5 text-right">
                      <Link
                        href="/shipping"
                        className="font-hk text-primary underline">
                        Change
                      </Link>
                    </div>
                  </div>
                  <div className="flex pt-2">
                    <div className="w-1/5">
                      <p className="font-hk text-secondary">Method</p>
                    </div>
                    <p className="font-hk text-secondary">{shippingMethod}</p>
                  </div>
                </div>

                <div className="pt-8 md:pt-10">
                  <h1 className="text-center font-hk text-xl font-medium text-secondary sm:text-left md:text-2xl">
                    Payment method
                  </h1>
                  <p className="pt-2 font-hk text-secondary">
                    All transactions are secure and encrypted
                  </p>
                  <form onSubmit={submitHandler}>
                    <div className="mt-6 rounded border border-grey-darker px-4 pt-3 sm:px-5">
                      {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                        <div
                          key={payment}
                          className="border-b border-grey-dark">
                          <div className="mb-2 flex items-center">
                            <input
                              type="radio"
                              className="form-checkbox"
                              id={payment}
                              checked={selectedPaymentMethod === payment}
                              onChange={() => setSelectedPaymentMethod(payment)}
                            />
                            <label
                              htmlFor={payment}
                              className="pl-3 font-hk text-secondary">
                              {payment}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-center justify-between pt-8 sm:flex-row sm:pt-12">
                      <button
                        onClick={() => router.push('/cart')}
                        className="group mb-3 flex items-center font-hk text-sm text-secondary transition-colors hover:text-primary group-hover:font-bold sm:mb-0">
                        <ChevronLeft className="h-6 w-6 pr-2 text-xl text-secondary transition-colors group-hover:text-primary" />
                        Return to Cart
                      </button>
                      <button disabled={loading} className="primary-button">
                        {loading ? 'Loading...' : 'Pay Now'}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 bg-grey-light sm:w-2/3 md:w-1/2 lg:mt-0 lg:w-1/3">
            <div className="p-8">
              <h3 className="font-hkbold pb-3 text-center text-2xl text-secondary sm:text-left">
                Your Order
              </h3>
              <p className="font-hkbold text-center uppercase text-secondary sm:text-left">
                PRODUCTS
              </p>
              <div className="mt-5 mb-8">
                {cartItems.map((item) => (
                  <div key={item.slug} className="mb-5 flex items-center">
                    <div className="relative mr-3 w-20 sm:pr-0">
                      <div className="flex h-20 items-center justify-center rounded">
                        <Image
                          src={item.images[0].url}
                          alt="BeautifulBrownimage"
                          width={48}
                          height={64}
                          className="h-16 w-12 object-cover object-center"
                          style={{
                            maxWidth: "100%",
                            height: "auto"
                          }} />
                        <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary px-2 font-hk text-xs leading-none text-white">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <p className="font-hk text-lg text-secondary">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-12 pt-4">
                <p className="font-hkbold pt-1 pb-2 text-secondary">
                  Cart Total
                </p>
                <div className="flex justify-between border-b border-grey-darker pb-1">
                  <span className="font-hk text-secondary">
                    Subtotal ({cartItemsCount}) :
                  </span>
                  <span className="font-hk text-secondary">$ {itemsPrice}</span>
                </div>
                <div className="flex justify-between border-b border-grey-darker pt-2 pb-1">
                  <span className="font-hk text-secondary">Shipping price</span>
                  <span className="font-hk text-secondary">
                    {' '}
                    ${shippingPrice}{' '}
                  </span>
                </div>
                <div className="flex justify-between border-b border-grey-darker pt-2 pb-1">
                  <span className="font-hk text-secondary">Tax price</span>
                  <span className="font-hk text-secondary"> ${taxPrice} </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-hkbold text-secondary">Total</span>
                  <span className="font-hkbold text-secondary">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PaymentMethodScreen), {
  ssr: false,
})
PaymentMethodScreen.auth = true
