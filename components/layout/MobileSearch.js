import { useRouter } from 'next/router'
import Search from '../Search'
import { useState } from 'react'

export default function MobileSearch({ isOpen }) {
  const [query, setQuery] = useState('')

  const router = useRouter()

  const submitHandler = (e) => {
    e.preventDefault()
    router.push(`/search?query=${query}`)
  }

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } pointer-events-auto absolute inset-x-0 top-20 z-50  lg:top-28`}>
      <div className="container">
        <div className="z-10 w-full rounded bg-white shadow-sm sm:w-1/2 lg:w-1/4">
          <Search setQuery={setQuery} submitHandler={submitHandler} />
        </div>
      </div>
    </div>
  )
}
