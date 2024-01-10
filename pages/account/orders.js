import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { getError } from '@/utils/error'
import Image from 'next/image'
import Link from 'next/link'
import AdminLayout from '.'

function reducer(state, action) {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return { ...state, loading: true }
    case 'ORDER_LIST_SUCCESS':
      return { ...state, loading: false, orders: action.payload }
    case 'ORDER_LIST_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export default function OrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'ORDER_LIST_REQUEST' })
        const { data } = await axios.get(`/api/orders/history`)

        dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'ORDER_LIST_FAIL', payload: getError(err) })
      }
    }
    fetchOrders()
  }, [])
  return (
    <AdminLayout>
      <div className="bg-grey-light py-8 px-5 md:px-8">
        <h1 className="font-hkbold pb-6 text-center text-2xl text-secondary sm:text-left">
          Orders
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <table className="table-auto w-full">
            <thead className="hidden sm:block">
              <tr className="flex justify-between pb-3">
                <th className="w-1/3 md:w-2/5">
                  <span className="font-hkbold text-sm text-secondary uppercase">
                    Product Name
                  </span>
                </th>
                <th className="w-1/4 xl:w-1/5 font-hkbold text-sm text-secondary uppercase">
                  Quantity
                </th>
                <th className="mr-3 w-1/6 text-center md:w-1/5 font-hkbold text-sm text-secondary uppercase">
                  Price
                </th>
                <th className="w-3/10 text-center md:w-1/5 font-hkbold text-sm text-secondary uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr
                  key={item._id}
                  className="mb-3 flex flex-col items-center justify-between rounded bg-white px-4 py-5 shadow sm:flex-row sm:py-4">
                  <td className="flex w-full flex-col border-b border-grey-dark pb-4 text-center sm:w-1/3 sm:border-b-0 sm:pb-0 sm:text-left md:w-2/5 md:flex-row md:items-center">
                    <span className="font-hkbold block pb-2 text-center text-sm uppercase text-secondary sm:hidden">
                      Product Name
                    </span>
                    <div className="relative mx-auto w-20 sm:mx-0 sm:mr-3 sm:pr-0">
                      <div className="flex h-20 items-center justify-center rounded">
                        <div className="aspect-w-1 aspect-h-1 w-full">
                          <Image
                            src={item.orderItems[0].images[0].url}
                            alt="product image"
                            className="object-cover"
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <span className="mt-2 font-hk text-base text-secondary">
                      {item.orderItems[0].name}
                    </span>
                  </td>
                  <td className="w-full border-b border-grey-dark pb-4 text-center sm:w-1/5 sm:border-b-0 sm:pb-0">
                    <span className="font-hkbold block pt-3 pb-2 text-center text-sm uppercase text-secondary sm:hidden">
                      Quantity
                    </span>
                    <span className="font-hk text-secondary">
                      {item.orderItems[0].quantity}
                    </span>
                  </td>
                  <td className="w-full pb-4 text-center sm:w-1/6 sm:pr-6 sm:pb-0 sm:text-right xl:w-1/5 xl:pr-16">
                    <span className="font-hkbold block pt-3 pb-2 text-center text-sm uppercase text-secondary sm:hidden">
                      Price
                    </span>
                    <span className="font-hk text-secondary">
                      {item.orderItems[0].price}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/product/${item.orderItems[0]._id}`}
                      className="button-outline whitespace-nowrap">
                      In Progress
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  )
}
