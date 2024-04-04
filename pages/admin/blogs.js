import { useEffect, useReducer } from 'react'
import AdminLayout from '../account'
import { getError } from '@/utils/error'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, blogs: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, errorDelete: action.payload }
    case 'DELETE_RESET':
      return {
        ...state,
        loadingDelete: false,
        successDelete: false,
        errorDelete: '',
      }
    default:
      return state
  }
}
export default function AdminBlogScreen() {
  const router = useRouter()
  const [
    { loading, error, blogs, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    blogs: [],
    error: '',
  })

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) return

    try {
      dispatch({ type: 'CREATE_REQUEST' })
      const { data } = await axios.post('/api/admin/blogs')
      dispatch({ type: 'CREATE_SUCCESS' })
      toast.success('Blog created successfully')
      router.push(`/admin/blog/${data.post._id}`)
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' })
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/admin/blogs')
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' })
    } else {
      fetchData()
    }
  }, [successDelete])

  const deleteHandler = async (blogId) => {
    if (!window.confirm('Are you sure?')) return

    try {
      dispatch({ type: 'DELETE_REQUEST' })
      await axios.delete(`/api/admin/blogs/${blogId}`)
      dispatch({ type: 'DELETE_SUCCESS' })
      toast.success('Blog deleted successfully')
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' })
      toast.error(getError(err))
    }
  }

  return (
    <AdminLayout>
      <div className="bg-grey-light py-10 px-6 sm:px-10">
        <div className="flex justify-between mb-8">
          <h1 className="mb-4 text-xl">Blogs</h1>
          {loadingDelete && <div>Deleting...</div>}
          <button
            className="primary-button"
            disabled={loadingCreate}
            onClick={createHandler}>
            {loadingCreate ? 'Loading' : 'Create Blog'}
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">AUTHOR</th>
                  <th className="px-4 py-2">TITLE</th>
                  <th className="px-4 py-2">CATEGORY</th>
                  <th className="px-4 py-2">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="border px-4 py-2">
                      {blog._id.substring(20, 24)}
                    </td>
                    <td className="border px-4 py-2">{blog.author}</td>
                    <td className="border px-4 py-2">{blog.title}</td>
                    <td className="border px-4 py-2">{blog.category}</td>
                    <td className=" p-5 space-x-2 flex flex-col md:flex-row">
                      <Link
                        href={`/admin/blog/${blog._id}`}
                        type="button"
                        className="outline-button">
                        Edit
                      </Link>
                      &nbsp;
                      <button
                        className="primary-button"
                        onClick={() => deleteHandler(blog._id)}>
                        Delete
                      </button>
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

AdminBlogScreen.auth = { adminOnly: true }
