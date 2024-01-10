import CheckoutWizard from '@/components/CheckoutWizard'
import YourOrder from '@/components/YourOrder'
import Layout from '@/components/layout/Layout'
import ChevronLeft from '@heroicons/react/24/solid/ChevronLeftIcon'
import { useContext, useEffect, useState } from 'react'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const shippingOptions = [
  {
    id: 'shippingInternational',
    label: 'International Shipping',
    value: 'Shipping International',
  },
  {
    id: 'shippingNormal',
    label: 'Normal 3 days delivery',
    value: 'Normal 3 days delivery',
  },
]
export default function ShippingMethodScreen() {
  const { data: session } = useSession()
  const { user } = session
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('')

  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress, shippingMethod } = cart
  const router = useRouter()

  const submitHandler = (e) => {
    e.preventDefault()
    if (!selectedShippingMethod) {
      return toast.error('Please select a shipping method')
    }
    dispatch({
      type: 'SAVE_SHIPPING_METHOD',
      payload: selectedShippingMethod,
    })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingMethod: selectedShippingMethod,
      })
    )
    router.push('/payment')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedShippingMethod(shippingMethod || '')
  }, [router, shippingAddress.address, shippingMethod])

  return (
    <Layout title="Shipping Method">
      <div className="container mx-auto px-4 border-t border-grey-dark pt-10 sm:pt-12">
        <div className="flex flex-col-reverse justify-between pb-16 sm:pb-20 lg:flex-row lg:pb-24">
          <div className="lg:w-2/3 lg:pr-16 xl:pr-20">
            <CheckoutWizard activeStep={2} />

            <div className="mt-10 rounded border border-grey-darker px-4 sm:px-5 md:mt-12">
              <div className="flex justify-between border-b border-grey-dark py-2">
                <div className="w-1/5">
                  <p className="font-hk text-secondary">Contact</p>
                </div>
                <div className="w-3/5">
                  <p className="font-hk text-secondary">{user.email}</p>
                </div>
                <div className="w-1/5 text-right">
                  <a
                    href="/cart/customer-info"
                    className="font-hk text-primary underline">
                    Change
                  </a>
                </div>
              </div>
              <div className="flex justify-between py-2">
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
                  <a
                    href="/cart/customer-info"
                    className="font-hk text-primary underline">
                    Change
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 md:pt-10">
              <h1 className="text-center font-hk text-xl font-medium text-secondary sm:text-left md:text-2xl">
                Shipping address
              </h1>
              <form onSubmit={submitHandler}>
                <div className="mt-5 rounded border border-grey-darker px-4 sm:px-5 md:mt-6">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex justify-between border-b border-grey-dark py-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          id={option.id}
                          value={option.value}
                          checked={selectedShippingMethod === option.value}
                          onChange={() =>
                            setSelectedShippingMethod(option.value)
                          }
                        />

                        <label className="ml-3 font-hk text-secondary">
                          {option.label}
                        </label>
                      </div>
                      <p className="font-hk uppercase text-secondary">
                        {option.id === 'shippingInternational' ? '$20' : 'FREE'}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col-reverse items-center justify-between pt-8 sm:flex-row sm:pt-12">
                  <button
                    onClick={() => router.push('/shipping')}
                    type="button"
                    className="group flex items-center font-hk text-sm text-secondary transition-colors hover:text-primary group-hover:font-bold">
                    <ChevronLeft className="h-6 w-6 pr-2 text-xl text-secondary transition-colors group-hover:text-primary" />
                    Back
                  </button>
                  <button className="primary-button mb-3 sm:mb-0">
                    Continue to payment method
                  </button>
                </div>
              </form>
            </div>
          </div>

          <YourOrder />
        </div>
      </div>
    </Layout>
  )
}
ShippingMethodScreen.auth = true
