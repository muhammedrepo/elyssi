import CheckoutWizard from '@/components/CheckoutWizard'
import YourOrder from '@/components/YourOrder'
import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import ChevronLeft from '@heroicons/react/24/solid/ChevronLeftIcon'
import { useContext, useEffect } from 'react'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
export default function ShippingScreen() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress } = cart
  const router = useRouter()

  useEffect(() => {
    if (shippingAddress) {
      setValue('firstName', shippingAddress.firstName)
      setValue('lastName', shippingAddress.lastName)
      setValue('address', shippingAddress.address)
      setValue('address2', shippingAddress.address2)
      setValue('city', shippingAddress.city)
      setValue('country', shippingAddress.country)
      setValue('postCode', shippingAddress.postCode)
    }
  }, [setValue, shippingAddress])

  const submitHandler = ({
    firstName,
    lastName,
    address,
    address2,
    city,
    country,
    postCode,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        firstName,
        lastName,
        address,
        address2,
        city,
        country,
        postCode,
      },
    })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          address,
          address2,
          city,
          country,
          postCode,
        },
      })
    )
    router.push('/shippingMethod')
  }
  return (
    <Layout title="Customer Info">
      <div className="container mx-auto px-4 border-t border-grey-dark pt-10 sm:pt-12">
        <div className="flex flex-col-reverse justify-between pb-16 sm:pb-20 lg:flex-row lg:pb-24">
          <div className="lg:w-2/3 lg:pr-16 xl:pr-20">
            <CheckoutWizard activeStep={1} />

            <div className="pt-10 md:pt-12">
              <div className="flex flex-col-reverse items-center justify-between sm:flex-row">
                <h1 className="font-hk text-xl font-medium text-secondary md:text-2xl">
                  Contact information
                </h1>
                <p className="font-hk text-secondary">
                  Already have an account?
                  <Link href="/login" className="font-hk text-primary">
                    Log in
                  </Link>
                </p>
              </div>
              <div className="pt-4 md:pt-5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-input"
                  id="email"
                />
                <div className="flex items-center pt-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    id="offers"
                  />
                  <p className="pl-3 font-hk text-sm text-secondary">
                    Keep me up to date on news and exclusive offers
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4 pb-10">
              <h4 className="text-center font-hk text-xl font-medium text-secondary sm:text-left md:text-2xl">
                Shipping address
              </h4>
              <form
                className="pt-4 md:pt-5"
                onSubmit={handleSubmit(submitHandler)}>
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-input mb-4 mr-2 sm:mb-5"
                    id="firstName"
                    autoFocus
                    {...register('firstName', {
                      required: 'Please enter first name',
                      minLength: {
                        value: 3,
                        message:
                          'First name must be at least 3 characters long',
                      },
                    })}
                  />
                  {errors.firstName && (
                    <div className="text-red-500">
                      {errors.firstName.message}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-input mb-4 ml-1 sm:mb-5"
                    id="lastName"
                    autoFocus
                    {...register('lastName', {
                      required: 'Please enter last name',
                      minLength: {
                        value: 3,
                        message: 'Last name must be at least 3 characters long',
                      },
                    })}
                  />
                  {errors.lastName && (
                    <div className="text-red-500">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="You address"
                  className="form-input mb-4 sm:mb-5"
                  id="address"
                  autoFocus
                  {...register('address', {
                    required: 'Please enter address',
                    minLength: {
                      value: 3,
                      message: 'Address must be at least 3 characters long',
                    },
                  })}
                />
                {errors.address && (
                  <div className="text-red-500">{errors.address.message}</div>
                )}

                <input
                  type="text"
                  placeholder="Apartment, Suite, etc"
                  className="form-input mb-4 sm:mb-5"
                  id="address2"
                  autoFocus
                  {...register('address2', {
                    required: 'Please enter address',
                    minLength: {
                      value: 3,
                      message: 'Address must be at least 3 characters long',
                    },
                  })}
                />
                {errors.address2 && (
                  <div className="text-red-500">{errors.address2.message}</div>
                )}
                <input
                  type="text"
                  placeholder="City"
                  className="form-input mb-4 sm:mb-5"
                  id="city"
                  autoFocus
                  {...register('city', {
                    required: 'Please enter city',
                    minLength: {
                      value: 3,
                      message: 'City must be at least 3 characters long',
                    },
                  })}
                />
                {errors.city && (
                  <div className="text-red-500">{errors.city.message}</div>
                )}

                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder="Country/Region"
                    className="form-input mb-4 mr-2 sm:mb-5"
                    id="country"
                    autoFocus
                    {...register('country', {
                      required: 'Please enter country',
                      minLength: {
                        value: 3,
                        message: 'Country must be at least 3 characters long',
                      },
                    })}
                  />
                  {errors.country && (
                    <div className="text-red-500">{errors.country.message}</div>
                  )}
                  <input
                    type="text"
                    placeholder="Post code"
                    className="form-input mb-4 ml-1 sm:mb-5"
                    id="postCode"
                    autoFocus
                    {...register('postCode', {
                      required: 'Please enter post code',
                      minLength: {
                        value: 3,
                        message: 'Post code must be at least 3 characters long',
                      },
                    })}
                  />
                </div>
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    id="save_info"
                  />
                  <p className="pl-3 font-hk text-sm text-secondary">
                    Save this information for next time
                  </p>
                </div>

                <div className="flex flex-col items-center justify-between pt-8 sm:flex-row sm:pt-12">
                  <Link
                    href="/cart"
                    className="group mb-3 flex items-center font-hk text-sm text-secondary transition-all hover:text-primary group-hover:font-bold sm:mb-0">
                    <ChevronLeft className="-mb-1 pr-2 text-2xl text-secondary transition-colors group-hover:text-primary h-6 w-6" />
                    Return to Cart
                  </Link>
                  <button className="primary-button">
                    Continue to shipping method
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
ShippingScreen.auth = true
