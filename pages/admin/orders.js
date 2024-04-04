import { useEffect, useReducer } from 'react'
import { getError } from '@/utils/error'
import axios from 'axios'
import Link from 'next/link'
import AdminLayout from '../account'
import Image from 'next/image'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/admin/orders')
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [])

  return (
    <AdminLayout>
      <div className="bg-grey-light py-8 px-5 sm:px-8">
        <h1 className="font-hkbold pb-6 text-center text-2xl text-secondary sm:text-left">
          Order List
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead className="hidden sm:block">
                <tr className="flex justify-between pb-3">
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Order ID
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Product Name
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      User
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Quantity
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Date
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Total Price
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Paid
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold text-sm uppercase text-secondary">
                      Status
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="font-hkbold pr-8 text-sm uppercase text-secondary">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="mb-3 flex flex-col items-center justify-between rounded bg-white px-4 py-5 shadow sm:flex-row sm:py-4 space-x-4">
                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden">
                      Order Id{' '}
                    </th>
                    <td className="font-hk text-secondary">
                      {order._id.substring(20, 24)}
                    </td>

                    <th className="font-hkbold block pb-2 text-sm uppercase text-secondary sm:hidden">
                      Product Name
                    </th>
                    <td className="relative mx-auto w-20 sm:mx-0 sm:mr-3 sm:pr-0">
                      <Image
                        src={order.orderItems[0].images[0].url}
                        alt="product image"
                        className="object-cover"
                        width={100}
                        height={0}
                        sizes="100vw"
                      />
                      <span className="mt-2 font-hk text-base text-secondary">
                        {order.orderItems[0].name}
                      </span>
                    </td>
                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden">
                      User
                    </th>
                    <td className="font-hk text-secondary">
                      {order.user ? order.user.firstName : 'DELETED USER'}
                    </td>

                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden text-center">
                      Quantity
                    </th>
                    <td className="font-hk text-secondary">
                      {order.orderItems[0].quantity}
                    </td>
                    <th className="font-hkbold block text-sm uppercase text-secondary sm:hidden">
                      Date
                    </th>
                    <td className="font-hk text-secondary">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden">
                      Price
                    </th>
                    <td className="font-hk text-secondary">
                      ${order.totalPrice}
                    </td>
                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden">
                      Paid
                    </th>
                    <td className="font-hk text-secondary">
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : 'not paid'}
                    </td>
                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden">
                      Status
                    </th>
                    <td
                      className={
                        order.isDelivered
                          ? 'bg-green-50 border border-green-400 px-4 py-3 inline-block rounded font-hk text-green-600'
                          : 'bg-primary-lightest border border-primary-light px-4 py-3 inline-block rounded font-hk text-primary'
                      }>
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : 'not delivered'}
                    </td>

                    <th className="font-hkbold block pt-3 pb-2 text-sm uppercase text-secondary sm:hidden">
                      Action
                    </th>
                    <td className="font-hk text-blue-600">
                      <Link href={`/order/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

AdminOrderScreen.auth = { adminOnly: true }
