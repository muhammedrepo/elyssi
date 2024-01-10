import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { getError } from '@/utils/error'
import axios from 'axios'
import Image from "next/image"
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true }
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true }
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' }
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true }
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true }
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false, errorDeliver: action.payload }
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: '',
      }
    default:
      return state
  }
}
function OrderScreen() {
  const { data: session } = useSession()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  const { query } = useRouter()
  const orderId = query.id

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/orders/${orderId}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder()
      if (successPay) {
        dispatch({ type: 'PAY_RESET' })
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' })
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal')
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPaypalScript()
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay])

  const {
    shippingAddress,
    shippingMethod,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' })
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        )
        dispatch({ type: 'PAY_SUCCESS', payload: data })
        toast.success('Order is paid successfully')
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        toast.error(getError(err))
      }
    })
  }

  const onError = (err) => {
    toast.error(getError(err))
  }

  async function handleDelivered() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' })
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      )
      dispatch({ type: 'DELIVER_SUCCESS', payload: data })
      toast.success('Order is delivered')
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) })
      toast.error(getError(err))
    }
  }
  return (
    <Layout title={`Order ${orderId}`}>
      <div className="container mx-auto px-4 border-t border-grey-dark pt-10 sm:pt-12">
        <div className="flex flex-col-reverse justify-between pb-16 sm:pb-20 lg:flex-row lg:pb-24">
          <div className="lg:w-2/3 lg:pr-16 xl:pr-20">
            <h1 className="font-hkbold text-center text-2xl text-secondary sm:text-left">
              {`Order ${orderId}`}
            </h1>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="alert-error">{error}</div>
            ) : (
              <>
                <div className="mt-10 rounded border border-grey-darker px-4 py-3 sm:px-5 md:mt-12">
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
                  </div>
                  <div className="flex pt-2">
                    <div className="w-1/5">
                      <p className="font-hk text-secondary">Shipping Method</p>
                      <div className="mt-4">
                        {isDelivered ? (
                          <div className="alert-success">
                            Delivered at {deliveredAt}
                          </div>
                        ) : (
                          <div className="alert-error">Not delivered</div>
                        )}
                      </div>
                    </div>
                    <p className="font-hk text-secondary">{shippingMethod}</p>
                  </div>
                  <div className="flex pt-2">
                    <div className="w-1/5">
                      <p className="font-hk text-secondary">Payment Method</p>
                      <div className="mt-4">
                        {isPaid ? (
                          <span className="inline-block rounded font-hk text-sm alert-success">
                            Paid at {paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="inline-block rounded font-hk text-sm alert-error">
                            Not paid
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-hk text-secondary">{paymentMethod}</p>
                  </div>
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
                {orderItems?.map((item) => (
                  <div key={item._id} className="mb-5 flex items-center">
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
                  <span className="font-hk text-secondary">Subtotal</span>
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
                {!isPaid && (
                  <div>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </div>
                )}
                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <div className="mt-6">
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="bg-primary font-hkbold hover:bg-primary-darker px-6 py-2 rounded text-sm text-white w-full"
                      onClick={handleDelivered}>
                      Mark as delivered
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-6 md:justify-end">
          <span className="cursor-pointer pr-5 font-hk font-semibold text-grey-darkest transition-colors hover:text-black">
            Previous
          </span>
          <span className="mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white">
            1
          </span>
          <span className="mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white">
            2
          </span>
          <span className="mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white">
            3
          </span>
          <span className="cursor-pointer pl-2 font-hk font-semibold text-grey-darkest transition-colors hover:text-black">
            Next
          </span>
        </div>
      </div>
    </Layout>
  );
}

OrderScreen.auth = true
export default OrderScreen
