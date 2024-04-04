import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'
import { getError } from '@/utils/error'
import axios from 'axios'
import AdminLayout from '../account'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}
function DashboardScreen() {
  const [{ summary, loading, error }, dispatch] = useReducer(reducer, {
    summary: { salesData: [] },
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get('/api/admin/summary')
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [])

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: 'Sales',
        data: summary.salesData.map((x) => x.totalSales),

        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderColor: 'rgba(255, 165, 0, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
    ],
  }

  return (
    <AdminLayout>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="bg-grey-light py-10 px-6 sm:px-10">
          <h1 className="font-hkbold mb-12 text-2xl text-secondary sm:text-left">
            Dashboard
          </h1>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="card m-5 p-5">
                <p className="text-3xl">${summary.ordersPrice} </p>
                <p>Sales</p>
                <Link href="/admin/orders">View sales</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">{summary.ordersCount} </p>
                <p>Orders</p>
                <Link href="/admin/orders">View orders</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">{summary.productsCount} </p>
                <p>Products</p>
                <Link href="/admin/products">View products</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">{summary.usersCount} </p>
                <p>Users</p>
                <Link href="/admin/users">View users</Link>
              </div>
            </div>
            <h2 className="text-xl">Sales Report</h2>
            <Bar
              options={{
                legend: { display: true, position: 'right' },
              }}
              data={data}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

DashboardScreen.auth = { adminOnly: true }
export default DashboardScreen
