import { useEffect, useReducer } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { getError } from '@/utils/error'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import AdminLayout from '../account'
import Image from 'next/image'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true }
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false }
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false }

    default:
      state
  }
}
export default function Admin() {
  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  })

  const router = useRouter()

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) return
    try {
      dispatch({ type: 'CREATE_REQUEST' })
      const { data } = await axios.post('/api/admin/products')
      dispatch({ type: 'CREATE_SUCCESS', payload: data })
      toast.success('Product created successfully')
      router.push(`/admin/product/${data.product._id}`)
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' })
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/admin/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    }
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' })
    } else {
      fetchProducts()
    }
  }, [successDelete])

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) return
    try {
      dispatch({ type: 'DELETE_REQUEST' })
      await axios.delete(`/api/admin/products/${productId}`)
      dispatch({ type: 'DELETE_SUCCESS' })
      toast.success('Product deleted successfully')
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' })
      toast.error(getError(err))
    }
  }

  return (
    <AdminLayout>
      <div className="bg-grey-light py-8 px-5 sm:px-8">
        <div className="flex justify-between">
          <h1 className="font-hkbold pb-6 text-center text-2xl text-secondary sm:text-left">
            Products
          </h1>
          {loadingDelete && <div>Deleting item...</div>}
          <button
            disabled={loadingCreate}
            onClick={createHandler}
            className="primary-button">
            {loadingCreate ? 'Loading' : 'Create'}
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <>
            <div className="hidden sm:block">
              <div className="flex justify-between pb-3">
                <div className="w-1/3 pl-4 md:w-2/5">
                  <span className="font-hkbold text-sm uppercase text-secondary">
                    Product Name
                  </span>
                </div>
                <div className="w-1/4 text-center xl:w-1/5">
                  <span className="font-hkbold text-sm uppercase text-secondary">
                    Quantity
                  </span>
                </div>
                <div className="mr-3 w-1/6 text-center md:w-1/5">
                  <span className="font-hkbold text-sm uppercase text-secondary">
                    Price
                  </span>
                </div>
                <div className="w-3/10 text-center md:w-1/5">
                  <span className="font-hkbold pr-8 text-sm uppercase text-secondary md:pr-16 xl:pr-8">
                    Action
                  </span>
                </div>
              </div>
            </div>

            {products.map((product) => (
              <div
                key={product._id}
                className="mb-3 flex flex-col items-center justify-between rounded bg-white px-4 py-5 shadow sm:flex-row sm:py-4">
                <div className="flex w-full flex-col border-b border-grey-dark pb-4 text-center sm:w-1/3 sm:border-b-0 sm:pb-0 sm:text-left md:w-2/5 md:flex-row md:items-center">
                  <span className="font-hkbold block pb-2 text-center text-sm uppercase text-secondary sm:hidden">
                    Product Name
                  </span>
                  <div className="relative mx-auto w-20 sm:mx-0 sm:mr-3 sm:pr-0">
                    <div className="flex h-20 items-center justify-center rounded">
                      <div className="aspect-w-1 aspect-h-1 w-full">
                        <Image
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0].url
                              : '/images/placeholder.png'
                          }
                          alt="product image"
                          className="object-cover"
                          width={100}
                          height={0}
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="mt-2 font-hk text-base text-secondary">
                    {product.name}
                  </span>
                </div>
                <div className="w-full border-b border-grey-dark pb-4 text-center sm:w-1/5 sm:border-b-0 sm:pb-0">
                  <span className="font-hkbold block pt-3 pb-2 text-center text-sm uppercase text-secondary sm:hidden">
                    Quantity
                  </span>
                  <span className="font-hk text-secondary">
                    {product.countInStock}
                  </span>
                </div>
                <div className="w-full pb-4 text-center sm:w-1/6 sm:pr-6 sm:pb-0 sm:text-right xl:w-1/5 xl:pr-16">
                  <span className="font-hkbold block pt-3 pb-2 text-center text-sm uppercase text-secondary sm:hidden">
                    Price
                  </span>
                  <span className="font-hk text-secondary">
                    ${product.price}
                  </span>
                </div>
                <div className="md:space-x-2 flex flex-col md:flex-row">
                  <Link
                    href={`/admin/product/${product._id}`}
                    type="button"
                    className="outline-button">
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteHandler(product._id)}
                    className="primary-button"
                    type="button">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </AdminLayout>
  )
}

Admin.auth = { adminOnly: true }
