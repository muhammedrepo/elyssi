import { getError } from '@/utils/error'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import AdminLayout from '@/pages/account'
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' }
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' }
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload }

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      }
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload }

    default:
      return state
  }
}
export default function AdminProductEditScreen() {
  const router = useRouter()
  const { query } = useRouter()

  const productId = query.id
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      images: [],
    })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/products/${productId}`)
        dispatch({ type: 'FETCH_SUCCESS' })
        setValue('name', data.name)
        setValue('slug', data.slug)
        setValue('price', data.price)
        setValue('images', data.images || [])
        setValue('category', data.category)
        setValue('brand', data.brand)
        setValue('rating', data.rating)
        setValue('countInStock', data.countInStock)
        setValue('description', data.description)
        setValue('isFeatured', data.isFeatured)
        setValue('banner', data.banner)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }

    fetchData()
  }, [productId, setValue])

  // uploadHandler
  const uploadHandler = async (e, imageField = 'images') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`

    try {
      dispatch({ type: 'UPLOAD_REQUEST' })
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign')

      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)

      const { data } = await axios.post(url, formData)
      dispatch({ type: 'UPLOAD_SUCCESS' })

      setValue(
        imageField,
        Array.isArray(data.secure_url)
          ? data.secure_url.map((item) => item.url)
          : [data.secure_url]
      )
      setValue('isFeatured', true)

      toast.success('File uploaded successfully')
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) })
      toast.error(getError(err))
    }
  }

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    images,
    brand,
    countInStock,
    description,
    rating,
    isFeatured,
    banner,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' })
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        images,
        brand,
        countInStock,
        description,
        rating,
        isFeatured,
        banner,
      })
      dispatch({ type: 'UPDATE_SUCCESS' })
      toast.success('Product updated successfully')
      router.push('/admin/products')
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <AdminLayout>
      <div className="bg-grey-light py-10 px-6 sm:px-10">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <>
            <h1 className="font-hkbold mb-12 text-2xl text-secondary sm:text-left">
              {`Edit Product ${productId}`}
            </h1>

            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}>
              <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="slug">
                  Slug
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="slug"
                  {...register('slug', {
                    required: 'Please enter slug',
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="price">
                  Price
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="price"
                  {...register('price', {
                    required: 'Please enter price',
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="image">
                  image
                </label>
                <Controller
                  name="images"
                  control={control}
                  rules={{ required: 'Please enter image' }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="form-input mb-2"
                      id="image"
                      value={field.value.map((obj) => obj.url).join(', ')}
                      onChange={(e) =>
                        field.onChange(e.target.value.split(', '))
                      }
                    />
                  )}
                />

                {errors.image && (
                  <div className="text-red-500">{errors.image.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="imageFile">
                  Upload image
                </label>

                <input
                  type="file"
                  className="form-input mb-2"
                  id="imageFile"
                  onChange={uploadHandler}
                />

                {loadingUpload && <div>Uploading....</div>}
              </div>

              {/* I want to add featured image by turning isFeatured to true for product image added */}
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="isFeatured">
                  Set as Featured Image
                </label>
                <input
                  type="checkbox"
                  className=""
                  id="isFeatured"
                  {...register('isFeatured')}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="category">
                  category
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="category"
                  {...register('category', {
                    required: 'Please enter category',
                  })}
                />
                {errors.category && (
                  <div className="text-red-500">{errors.category.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="brand">
                  brand
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="brand"
                  {...register('brand', {
                    required: 'Please enter brand',
                  })}
                />
                {errors.brand && (
                  <div className="text-red-500">{errors.brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="countInStock">
                  countInStock
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="countInStock"
                  {...register('countInStock', {
                    required: 'Please enter countInStock',
                  })}
                />
                {errors.countInStock && (
                  <div className="text-red-500">
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="rating">
                  rating
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="rating"
                  {...register('rating', {
                    required: 'Please enter rating',
                  })}
                />
                {errors.rating && (
                  <div className="text-red-500">{errors.rating.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block mt-4 pb-3 font-hk text-secondary"
                  htmlFor="countInStock">
                  description
                </label>
                <input
                  type="text"
                  className="form-input mb-2"
                  id="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/products`}>Back</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

AdminProductEditScreen.auth = { adminOnly: true }
