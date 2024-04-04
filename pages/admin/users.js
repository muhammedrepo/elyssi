import { useEffect, useReducer } from 'react'
import Link from 'next/link'
import { getError } from '@/utils/error'
import axios from 'axios'
import { toast } from 'react-toastify'
import AdminLayout from '../account'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
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
export default function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: '',
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/admin/users')
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

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) return
    try {
      dispatch({ type: 'DELETE_REQUEST' })
      await axios.delete(`/api/admin/users/${userId}`)
      dispatch({ type: 'DELETE_SUCCESS' })
      toast.success('User deleted successfully')
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' })
      toast.error(getError(err))
    }
  }

  return (
    <AdminLayout>
      <div className="bg-grey-light py-10 px-6 sm:px-10">
        <h1 className="font-hkbold mb-12 text-2xl text-secondary sm:text-left">
          Users
        </h1>

        {loadingDelete && <div>Deleting item...</div>}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="table-auto min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">NAME</th>
                  <th className="p-5 text-left">EMAIL</th>
                  <th className="p-5 text-left">ADMIN</th>
                  <th className="p-5 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className=" p-5 ">{user._id.substring(20, 24)}</td>
                    <td className=" p-5 ">{user.firstName}</td>
                    <td className=" p-5 ">{user.email}</td>
                    <td className=" p-5 ">{user.isAdmin ? 'YES' : 'NO'}</td>
                    <td className=" p-5 space-x-4 flex flex-col lg:flex-row">
                      <Link
                        href={`/admin/user/${user._id}`}
                        passHref
                        type="button"
                        className="outline-button">
                        Edit
                      </Link>
                      &nbsp;
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => deleteHandler(user._id)}>
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

AdminUsersScreen.auth = { adminOnly: true }
