import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { useContext } from 'react'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
import { Store } from '@/utils/Store'
import { useRouter } from 'next/router'

export default function AdminLayout({ children }) {
  const { data: session } = useSession()
  const { dispatch } = useContext(Store)
  const router = useRouter()

  const logoutHandler = () => {
    Cookies.remove('cart')
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
  }
  return (
    <Layout>
      <div>
        <div className="container border-t border-grey-dark px-4">
          <div className="flex flex-col justify-between pt-10 pb-16 sm:pt-12 sm:pb-20 lg:flex-row lg:pb-24">
            <div className="lg:w-1/4">
              <p className="pb-6 font-butler text-2xl text-secondary sm:text-3xl lg:text-4xl">
                {session?.user.isAdmin ? 'Admin Dashboard' : 'My Account'}
              </p>
              <div className="flex flex-col pl-3">
                {session?.user.isAdmin ? (
                  <>
                    <Link
                      href="/admin/dashboard"
                      as="/admin/dashboard"
                      className={
                        router.pathname === '/admin/dashboard'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/orders"
                      as="/admin/orders"
                      className={
                        router.pathname === '/admin/orders'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Orders
                    </Link>
                    <Link
                      href="/admin/products"
                      as="/admin/products"
                      className={
                        router.pathname === '/admin/products'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Products
                    </Link>
                    <Link
                      href="/admin/blogs"
                      as="/admin/blogs"
                      className={
                        router.pathname === '/admin/blogs'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Blogs
                    </Link>
                    <Link
                      href="/admin/users"
                      as="/admin/users"
                      className={
                        router.pathname === '/admin/users'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Users
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/account/order-history"
                      as="/account/order-history"
                      className={
                        router.pathname === '/account/order-history'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      History
                    </Link>
                    <Link
                      href="/account/orders"
                      as="/account/orders"
                      className={
                        router.pathname === '/account/orders'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Orders
                    </Link>
                    <Link
                      href="/account/wishlist"
                      as="/account/wishlist"
                      className={
                        router.pathname === '/account/wishlist'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Wishlist
                    </Link>
                    <Link
                      href="/account/account-details"
                      as="/account/account-details"
                      className={
                        router.pathname === '/account/account-details'
                          ? 'active link-style'
                          : 'link-style'
                      }>
                      Account Details
                    </Link>
                  </>
                )}
              </div>
              <button
                onClick={logoutHandler}
                className="mt-8 inline-block rounded border border-primary px-8 py-3 font-hk font-bold text-primary transition-all hover:bg-primary hover:text-white">
                Log Out
              </button>
            </div>

            <div className="mt-12 lg:mt-0 lg:w-3/4">{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
