import Link from 'next/link'
import Image from "next/image"

import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { Store } from '@/utils/Store'
import dynamic from 'next/dynamic'

function MiddleNav({ toggleMobileMenu, toggleMobileSearch, toggleMobileCart }) {
  const { state } = useContext(Store)
  const { cartItemsCount } = state
  const { status, data: session } = useSession()

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <button className="block lg:hidden">
          <i
            className="bx bx-menu text-4xl text-primary"
            onClick={toggleMobileMenu}
          />
        </button>

        <Link
          href="/search"
          className="group ml-3 hidden cursor-pointer rounded-full border-2 border-transparent p-2 transition-colors hover:border-primary focus:outline-none sm:ml-2 sm:p-4 md:ml-3 lg:mr-8 lg:block">
          <Image
            src="/images/icon-search.svg"
            className="block h-5 w-5 group-hover:hidden sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon search"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/images/icon-search-hover.svg"
            className="hidden h-5 w-5 group-hover:block sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon search hover"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </Link>

        <button
          onClick={toggleMobileSearch}
          className="group ml-2 block cursor-pointer rounded-full border-2 border-transparent p-2 transition-colors hover:border-primary focus:outline-none sm:ml-3 sm:p-4 md:ml-5 lg:mr-8 lg:hidden">
          <Image
            src="/images/icon-search.svg"
            className="block h-5 w-5 group-hover:hidden sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon search"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/images/icon-search-hover.svg"
            className="hidden h-5 w-5 group-hover:block sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon search hover"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </button>

        <Link
          href="/wishlist"
          className="group hidden rounded-full border-2 border-transparent p-2 transition-all hover:border-primary sm:p-4 lg:block">
          <Image
            src="/images/icon-heart.svg"
            className="block h-5 w-5 group-hover:hidden sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon heart"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/images/icon-heart-hover.svg"
            className="hidden h-5 w-5 group-hover:block sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon heart hover"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </Link>
      </div>
      <Link href="/">
        <Image
          src="/images/logo-elyssi.svg"
          className="h-auto w-28 sm:w-48"
          alt="logo"
          width={192}
          height={48}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </Link>
      <div className="flex items-center">
        {status === 'loading' ? (
          'Loading'
        ) : session?.user ? (
          <Link
            href={
              session.user.isAdmin
                ? '/admin/dashboard'
                : '/account/order-history'
            }
            className="group rounded-full border-2 border-transparent p-2 transition-all hover:border-primary sm:p-4">
            <Image
              src="/images/icon-user.svg"
              className="block h-5 w-5 group-hover:hidden sm:h-6 sm:w-6 md:h-8 md:w-8"
              alt="icon user"
              width={24}
              height={24}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <Image
              src="/images/icon-user-hover.svg"
              className="hidden h-5 w-5 group-hover:block sm:h-6 sm:w-6 md:h-8 md:w-8"
              alt="icon user hover"
              width={24}
              height={24}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            {session.user.email.split('@')[0]}
          </Link>
        ) : (
          <Link
            href="/login"
            className="group rounded-full border-2 border-transparent p-2 transition-all hover:border-primary sm:p-4">
            Login
          </Link>
        )}

        <Link
          href="/cart"
          className="group ml-2 hidden rounded-full border-2 border-transparent p-2 transition-all hover:border-primary sm:ml-3 sm:p-4 md:ml-5 lg:ml-8 lg:block">
          {cartItemsCount > 0 && (
            <span className="absolute right-6 left-auto bg-primary text-white text-xs rounded-full px-1">
              {cartItemsCount}
            </span>
          )}

          <Image
            src="/images/icon-cart.svg"
            className="block h-5 w-5 group-hover:hidden sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon cart"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/images/icon-cart-hover.svg"
            className="hidden h-5 w-5 group-hover:block sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon cart hover"
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </Link>

        <span
          onClick={toggleMobileCart}
          className="group ml-2 block rounded-full border-2 border-transparent p-2 transition-all hover:border-primary sm:ml-3 sm:p-4 md:ml-5 lg:ml-8 lg:hidden">
          {cartItemsCount > 0 && (
            <span className="absolute right-3 left-auto bg-primary text-white text-xs rounded-full px-1">
              {cartItemsCount}
            </span>
          )}
          <Image
            src="/images/icon-cart.svg"
            className="block h-7 w-7 group-hover:hidden sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon cart"
            width={28}
            height={28}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <Image
            src="/images/icon-cart-hover.svg"
            className="hidden h-7 w-7 group-hover:block sm:h-6 sm:w-6 md:h-8 md:w-8"
            alt="icon cart hover"
            width={28}
            height={28}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </span>
      </div>
      <div className="hidden">
        <i className="bx bx-menu text-3xl text-primary"></i>
      </div>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(MiddleNav), { ssr: false })
