import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import ChevronUp from '@heroicons/react/24/solid/ChevronUpIcon'
import ChevronDown from '@heroicons/react/24/solid/ChevronDownIcon'
import { Store } from '@/utils/Store'
import CheckoutWizard from '@/components/CheckoutWizard'
import CartTotal from '@/components/CartTotal'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { toast } from 'react-toastify'

function CartScreen() {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  const {
    cart: { cartItems },
  } = state

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateCartHandler = async (item, qty) => {
    try {
      const quantity = Number(qty)
      const { data } = await axios.get(`/api/products/${item._id}`)

      if (data.countInStock < quantity) {
        return toast.error('Sorry. Product is out of stock')
      } else {
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })

        toast.success('Product quantity is updated')
      }
    } catch (error) {
      console.error('Error fetching product data:', error)
      toast.error('Error updating product quantity')
    }
  }

  return (
    <Layout title="Shopping Cart">
      <div className="container mx-auto px-4 border-t border-grey-dark pt-10 sm:pt-12">
        <CheckoutWizard activeStep={0} />

        <div className="flex flex-col-reverse justify-between pb-16 sm:pb-20 lg:flex-row lg:pb-24">
          <div className="lg:w-3/5">
            <div className="pt-10">
              <h1 className=" pb-3 text-center text-2xl text-secondary sm:text-left">
                Cart Items
              </h1>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <h2 className="font-hk text-xl text-secondary">
                    Your cart is empty
                  </h2>
                  <Link href="/">
                    <button className="primary-button mt-5">Go Shopping</button>
                  </Link>
                </div>
              ) : (
                <div className="pt-8">
                  <table className="w-full">
                    <thead className="hidden sm:block">
                      <tr className="flex justify-between border-b border-grey-darker">
                        <th className="w-1/2 pl-8 pb-2 sm:pl-12 lg:w-3/5 xl:w-1/2">
                          <span className=" text-sm uppercase text-secondary">
                            Product Name
                          </span>
                        </th>
                        <th className="w-1/4 pb-2 text-right sm:mr-2 sm:w-1/6 md:mr-18 lg:mr-12 lg:w-1/5 xl:mr-18 xl:w-1/4">
                          <span className=" text-sm uppercase text-secondary">
                            Quantity
                          </span>
                        </th>
                        <th className="w-1/4 pb-2 text-right md:pr-10 lg:w-1/5 xl:w-1/4">
                          <span className="font-hkbold text-sm uppercase text-secondary">
                            Price
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        return (
                          <tr
                            key={item.slug}
                            className="mb-0 flex flex-row items-center justify-between border-b border-grey-800 py-3 md:flex">
                            <td>
                              <XMarkIcon
                                onClick={() => removeItemHandler(item)}
                                className="mr-6 cursor-pointer text-gray-600 h-6 w-6"
                              />
                            </td>
                            <td className="className='flex w-1/2 flex-row items-center border-b-0 border-grey-dark pt-0 pb-0 text-left lg:w-3/5 xl:w-1/2'">
                              <Link href={`/product/${item.slug}`}>
                                <div className="flex w-1/2 flex-row items-center border-b-0 border-grey-dark pt-0 pb-0 text-left lg:w-3/5 xl:w-1/2">
                                  <div className="relative mx-0 w-20 pr-0">
                                    <div className="flex h-20 items-center justify-center rounded">
                                      <div className="aspect-w-1 aspect-h-1 w-full">
                                        <Image
                                          src={item.images[0].url}
                                          alt={item.name}
                                          className="object-cover"
                                          width={50}
                                          height={50}
                                          style={{
                                            width: '100%',
                                            height: '100%',
                                            maxWidth: '100%',
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <span className="mt-2 ml-4 text-base text-secondary">
                                    {item.name}
                                  </span>
                                </div>
                              </Link>
                            </td>

                            <td className="w-full border-b-0 border-grey-400 pb-0 text-center sm:w-1/5 xl:w-1/4">
                              <div className="mx-auto mr-8 xl:mr-4">
                                <div className="flex justify-center">
                                  <input
                                    className="form-quantity form-input w-16 rounded-r-none py-0 px-2 text-center"
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateCartHandler(item, e.target.value)
                                    }
                                  />
                                  <div className="flex flex-col">
                                    <span
                                      className="flex-1 cursor-pointer rounded-tr border border-l-0 border-grey-darker bg-white px-1"
                                      onClick={() => {
                                        const newQuantity = item.quantity + 1
                                        updateCartHandler(item, newQuantity)
                                      }}>
                                      <ChevronUp className="pointer-events-none text-xs text-primary h-5 w-5" />
                                    </span>
                                    <span
                                      className="flex-1 cursor-pointer rounded-br border border-t-0 border-l-0 border-grey-darker bg-white px-1"
                                      onClick={() => {
                                        if (item.quantity > 1) {
                                          const newQuantity = item.quantity - 1
                                          updateCartHandler(item, newQuantity)
                                        }
                                      }}>
                                      <ChevronDown className="pointer-events-none text-primary h-5 w-5" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="w-1/4 pr-10 pb-4 text-right lg:w-1/5 xl:w-1/4 xl:pr-10">
                              <span className=" text-secondary">
                                {item.price}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex flex-col pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-12">
              <Link href="/">
                <button className="outline-button w-full">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-16 sm:w-2/3 md:w-full lg:mx-0 lg:mt-0 lg:w-1/3">
            <div className="bg-grey-light py-8 px-8">
              <h4 className="font-hkbold pb-3 text-center text-2xl text-secondary sm:text-left">
                Cart Totals
              </h4>
              <div>
                <p className="font-hkbold pt-1 pb-2 text-secondary">
                  Cart Note
                </p>
                <p className="pb-4 font-hk text-sm text-secondary">
                  Special instructions for us
                </p>
                <label
                  htmlFor="cart_note"
                  className="relative block h-0 w-0 overflow-hidden">
                  Cart Note
                </label>
                <textarea
                  rows="5"
                  placeholder="Enter your text"
                  className="form-textarea"
                  id="cart_note"></textarea>
              </div>
              <div className="pt-4">
                <p className="font-hkbold pt-1 pb-4 text-secondary">
                  Add Coupon
                </p>
                <div className="flex justify-between">
                  <input
                    type="text"
                    id="discount_code"
                    placeholder="Discount code"
                  />

                  <button
                    className="btn btn-outline btn-sm ml-4 w-2/5 lg:ml-2 xl:ml-4 xl:w-1/3"
                    aria-label="Apply button">
                    Apply
                  </button>
                </div>
              </div>
              <CartTotal />

              <button
                onClick={() => router.push('login?redirect=/shipping')}
                className="primary-button w-full">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
