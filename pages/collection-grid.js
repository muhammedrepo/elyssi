import Layout from '@/components/layout/Layout'
import db from '@/utils/db'
import Product from '@/models/Product'
import Link from 'next/link'
import ProductItem from '@/components/ProductItem'
import Breadcrumb from '@/components/Breadcrumb'
import { useState } from 'react'

export default function CollectionPageScreen({ products }) {
  const [sortBy, setSortBy] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  const sortedProducts = () => {
    switch (sortBy) {
      case 'featured':
        return products.filter((a) => a.isFeatured)
      case 'lowest':
        return products.slice().sort((a, b) => a.price - b.price)
      case 'highest':
        return products.slice().sort((a, b) => b.price - a.price)
      default:
        return products
    }
  }

  const paginatedProducts = sortedProducts().slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const totalProducts = sortedProducts().length
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  const handleChangeSortby = (e) => {
    setSortBy(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const breadcrumbItems = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Collection',
    },
  ]

  return (
    <Layout title="Collection Page">
      <div className="relative flex">
        <div
          className="ml-auto h-56 w-3/4 bg-cover bg-center bg-no-repeat lg:h-68"
          style={{ backgroundImage: 'url(/images/about-hero.png)' }}></div>
        <div className="c-hero-gradient-bg absolute top-0 left-0 h-56 w-full bg-cover bg-no-repeat lg:h-68">
          <div className="py-20 px-6 sm:px-12 lg:px-20">
            <h1 className="font-butler text-2xl text-white sm:text-3xl md:text-4.5xl lg:text-5xl">
              Collection Grid
            </h1>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-col justify-between py-10 sm:flex-row">
          <div className="flex items-center justify-start">
            <i className="bx bxs-filter-alt text-xl text-primary"></i>{' '}
            <p className="block px-2 font-hk leading-none text-secondary md:text-lg">
              Filter
            </p>
            <div className="flex items-center rounded border border-grey-darker p-2">
              <Link href="/collection-list">
                <i className="bx bx-menu block text-xl leading-none text-grey-darker transition-colors hover:text-secondary-light"></i>
              </Link>
              <div className="mx-2 h-4 w-px bg-grey-darker"></div>
              <Link href="/collection-grid">
                <i className="bx bxs-grid block text-xl leading-none text-grey-darker transition-colors hover:text-secondary-light"></i>
              </Link>
            </div>
          </div>
          <div className="mt-6 flex w-80 items-center justify-start sm:mt-0 sm:justify-end">
            <span className="mr-2 -mt-2 inline-block font-hk text-secondary md:text-lg">
              Sort by:
            </span>

            <select
              className="form-select w-2/3"
              value={sortBy}
              onChange={handleChangeSortby}>
              <option value="all">All</option>
              <option value="featured">Featured</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="group relative w-full lg:last:hidden xl:last:block">
              <ProductItem product={product} />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mx-auto flex justify-center py-16">
      <span
        className="cursor-pointer pr-5 font-hk font-semibold text-grey-darkest transition-colors hover:text-black"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </span>
      {/* Render page numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors ${
            currentPage === index + 1
              ? 'bg-primary text-white hover:bg-primary hover:text-white'
              : 'hover:bg-primary hover:text-white'
          }`}
          onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </span>
      ))}
      <span
        className="cursor-pointer pl-2 font-hk font-semibold text-grey-darkest transition-colors hover:text-black"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </span>
    </div>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
