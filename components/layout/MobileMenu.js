import React, { useState } from 'react'
import Link from 'next/link'

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/account/wishlist', label: 'Wishlist' },
  {
    label: 'Collections',
    children: [
      { to: '/collection-grid', label: "Men's Fashion" },
      { to: '/collection-grid', label: "Women's Fashion" },
      { to: '/collection-grid', label: 'Baggage' },
      { to: '/collection-grid', label: 'Personal Care' },
      { to: '/collection-grid', label: 'Pullovers' },
    ],
  },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function MobileMenu({ isOpen }) {
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false)

  const handleClick = () => {
    setIsParentDropdownOpen(false)
  }

  const renderMenuItem = ({ to, label, children }) => {
    if (!children) {
      return (
        <Link
          key={label}
          href={to}
          className="block w-full cursor-pointer border-b border-grey-dark py-3 font-hk font-medium text-secondary">
          {label}
        </Link>
      )
    }

    return (
      <div key={label} className="block w-full border-b border-grey-dark py-3">
        <div
          className="flex items-center justify-between"
          onClick={() => handleClick()}>
          <span
            className={`block font-hk font-medium transition-colors ${
              isParentDropdownOpen ? 'text-primary' : 'text-secondary'
            }`}>
            {label}
          </span>
          <i
            className={`bx text-xl text-secondary  ${
              isParentDropdownOpen ? 'bx-chevron-down' : 'bx-chevron-left'
            }`}></i>
        </div>
        <div
          className={`transition-all ${
            isParentDropdownOpen ? 'max-h-infinite' : 'max-h-0 overflow-hidden'
          }`}>
          {children.map(({ to, label }) => (
            <Link
              key={label}
              href={to}
              className="mt-2 block font-hk font-medium text-secondary">
              {label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } pointer-events-auto fixed inset-x-0 z-50 pt-20 transition-all md:top-28`}>
      <div className="absolute left-0 top-0 z-40 w-full bg-white px-6 shadow-sm">
        {menuLinks.map(renderMenuItem)}
        <div className="my-8">
          <Link href="/login">
            <button className="mb-4 w-full">Login Account</button>
          </Link>
          <Link
            href="/register"
            className="block pl-3 text-center font-hk text-secondary underline md:text-lg">
            Create your account
          </Link>
        </div>
      </div>
    </div>
  )
}
