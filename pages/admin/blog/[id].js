import { getError } from '@/utils/error'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AdminLayout from '@/pages/account'
import { toast } from 'react-toastify'

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
      return { ...state, loadingUpload: false, errorUpload: '' }
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload }
    default:
      return state
  }
}
export default function AdminEditBlog() {
  const router = useRouter()
  const { query } = useRouter()
  const blogId = query.id

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/blogs/${blogId}`)
        dispatch({ type: 'FETCH_SUCCESS' })
        setValue('title', data.title)
        setValue('slug', data.slug)
        setValue('author', data.author)
        setValue('category', data.category)
        setValue('image', data.image)
        setValue('authorImage', data.authorImage)
        setValue('excerpt', data.excerpt)
        setValue('featuredImage', data.featuredImage)
        setValue('altText', data.altText)
        setValue('excerptImage', data.excerptImage)
        setValue('content', data.content)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchBlog()
  }, [blogId, setValue])

  const uploadHandler = async (
    e,
    imageField1 = 'image',
    imageField2 = 'featuredImage'
  ) => {
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

      // Set the values for each image field independently
      if (imageField1) {
        setValue(imageField1, data.secure_url)
      }

      if (imageField2) {
        setValue(imageField2, data.secure_url)
      }

      toast.success('Image uploaded successfully')
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) })
      toast.error(getError(err))
    }
  }

  const submitHandler = async ({
    title,
    slug,
    author,
    category,
    image,
    excerpt,
    featuredImage,
    altText,
    content,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' })
      await axios.put(`/api/admin/blogs/${blogId}`, {
        title,
        slug,
        author,
        category,
        image,
        excerpt,
        featuredImage,
        altText,
        content,
      })
      dispatch({ type: 'UPDATE_SUCCESS' })
      toast.success('Blog updated successfully')
      router.push('/admin/blogs')
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <AdminLayout title={`Edit Blog ${blogId}`}>
      <div className="bg-grey-light py-10 px-6 sm:px-10">
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl">{`Edit Blog ${blogId}`}</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="title">
                    Title
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    {...register('title', {
                      required: 'Title is required',
                    })}
                  />
                  {errors.title && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>
                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="slug">
                    Slug
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="slug"
                    placeholder="Enter slug"
                    {...register('slug', {
                      required: 'Slug is required',
                    })}
                  />
                  {errors.slug && (
                    <span className="text-red-600">{errors.slug.message}</span>
                  )}
                </div>
                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="author">
                    Author
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="author"
                    placeholder="Enter author"
                    {...register('author', {
                      required: 'Author is required',
                    })}
                  />
                  {errors.author && (
                    <span className="text-red-600">
                      {errors.author.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="category">
                    Category
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="category"
                    placeholder="Enter category"
                    {...register('category', {
                      required: 'Category is required',
                    })}
                  />
                  {errors.category && (
                    <span className="text-red-600">
                      {errors.category.message}
                    </span>
                  )}
                </div>
                <div>
                  <div>
                    <label
                      className="block mt-4 pb-3 font-hk text-secondary"
                      htmlFor="image">
                      Image
                    </label>
                    <input
                      className="form-input mb-2"
                      type="text"
                      id="image"
                      placeholder="Enter image"
                      {...register('image', {
                        required: 'Image is required',
                      })}
                    />
                    {errors.image && (
                      <span className="text-red-600">
                        {errors.image.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="imageFile">Upload Post Image</label>
                    <input
                      type="file"
                      className="w-full"
                      id="imageFile"
                      onChange={(e) => uploadHandler(e, 'image')}
                    />
                    {loadingUpload && <div>Uploading....</div>}
                  </div>
                </div>

                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="excerpt">
                    Excerpt
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="excerpt"
                    placeholder="Enter excerpt"
                    {...register('excerpt', {
                      required: 'Excerpt is required',
                    })}></input>
                  {errors.excerpt && (
                    <span className="text-red-600">
                      {errors.excerpt.message}
                    </span>
                  )}
                </div>
                <div>
                  <div>
                    <label
                      className="block mt-4 pb-3 font-hk text-secondary"
                      htmlFor="featuredImage">
                      Featured Image
                    </label>
                    <input
                      className="form-input mb-2"
                      type="text"
                      id="featuredImage"
                      placeholder="Enter featuredImage"
                      {...register('featuredImage', {
                        required: 'Featured Image is required',
                      })}></input>
                    {errors.featuredImage && (
                      <span className="text-red-600">
                        {errors.featuredImage.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="featuredImageFile">
                      Upload featured image
                    </label>
                    <input
                      type="file"
                      className="w-full"
                      id="featuredImageFile"
                      onChange={(e) => uploadHandler(e, 'featuredImage')}
                    />
                    {loadingUpload && <div>Uploading....</div>}
                  </div>
                </div>
                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="altText">
                    Alt Text
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="altText"
                    placeholder="Enter altText"
                    {...register('altText', {
                      required: 'Alt Text is required',
                    })}></input>
                  {errors.altText && (
                    <span className="text-red-600">
                      {errors.altText.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    className="block mt-4 pb-3 font-hk text-secondary"
                    htmlFor="content">
                    Content
                  </label>
                  <input
                    className="form-input mb-2"
                    type="text"
                    id="content"
                    placeholder="Enter content"
                    {...register('content', {
                      required: 'Content is required',
                    })}></input>
                  {errors.content && (
                    <span className="text-red-600">
                      {errors.content.message}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="primary-button mt-4"
                type="submit"
                disabled={loadingUpdate}>
                {loadingUpdate ? 'Loading...' : 'Update'}
              </button>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

AdminEditBlog.auth = { adminOnly: true }
