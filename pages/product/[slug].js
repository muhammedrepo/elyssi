/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/layout/Layout'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { Store } from '@/utils/Store'
import Product from '@/models/Product'
import db from '@/utils/db'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ProductScreen(props) {
  const { product } = props
  const { state, dispatch } = useContext(Store)
  const [selectedImage, setSelectedImage] = useState()
  const router = useRouter()

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock')
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <section className="-mx-5 flex flex-col justify-between pt-16 pb-24 lg:flex-row">
        <div className="flex flex-col-reverse justify-between px-5 sm:flex-row-reverse lg:w-1/2 lg:flex-row">
          <div className="flex flex-row sm:flex-col sm:pl-5 md:pl-4 lg:pl-0 lg:pr-2 xl:pr-3">
            {product.images.map((item, index) => {
              return (
                <article
                  key={index}
                  className="relative mr-3 w-28 pb-5 sm:w-32 sm:pr-0 lg:w-24 xl:w-28">
                  <div className="relative flex w-full items-center justify-center rounded border border-grey bg-v-pink">
                    <img
                      className="cursor-pointer object-cover"
                      onClick={() => setSelectedImage(item.url)}
                      alt={`itemImage-${index}`}
                      src={item.url}
                    />
                  </div>
                </article>
              )
            })}
          </div>
          <div className="relative w-full pb-5 sm:pb-0">
            <div className="aspect-w-1 aspect-h-1 relative flex items-center justify-center rounded bg-v-pink">
              <img
                className="object-cover"
                alt="productImage"
                src={selectedImage || product.images[0].url}
              />
            </div>
          </div>
        </div>

        <div className="px-5 pt-8 lg:w-1/2 lg:pt-0">
          <div className="mb-8 border-b border-grey-dark">
            <div className="flex items-center">
              <h2 className="font-butler text-3xl md:text-4xl lg:text-5xl">
                {product.name}
              </h2>
              <p className="ml-8 rounded-full bg-primary px-5 py-2 font-sans text-sm font-bold uppercase leading-none text-white">
                20% off
              </p>
            </div>
            <div className="flex items-center pt-3">
              <span className="font-sans text-2xl text-secondary">
                ${product.price}
              </span>
              <span className="pl-5 font-sans text-xl text-grey-darker line-through">
                $35.0
              </span>
            </div>
            <div className="flex items-center pt-3 pb-8">
              <div className="flex items-center">
                <i className="bx bxs-star text-primary"></i>
                <i className="bx bxs-star text-primary"></i>
                <i className="bx bxs-star text-primary"></i>
                <i className="bx bxs-star text-primary"></i>
                <i className="bx bxs-star text-primary"></i>
              </div>
              <span className="ml-2 font-sans text-sm text-secondary">
                ({product.numReviews})
              </span>
            </div>
          </div>
          <div className="flex pb-5">
            <p className="font-sans text-secondary">Availability:</p>
            <p className="font-semibold pl-3 text-v-green">
              {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
            </p>
          </div>
          <p className="pb-5 font-sans text-secondary">{product.description}</p>
          <div className="flex justify-between pb-4">
            <div className="w-1/3 sm:w-1/5">
              <p className="font-sans text-secondary">Color</p>
            </div>
            <div className="flex w-2/3 items-center sm:w-5/6">
              <div className="mr-2 cursor-pointer rounded-full border-2 border-transparent bg-primary px-2 py-2 transition-colors hover:border-black"></div>
              <div className="mr-2 cursor-pointer rounded-full border-2 border-transparent bg-secondary-light px-2 py-2 transition-colors hover:border-black"></div>
              <div className="mr-2 cursor-pointer rounded-full border-2 border-transparent bg-v-green px-2 py-2 transition-colors hover:border-black"></div>
              <div className="cursor-pointer rounded-full border-2 border-transparent bg-v-blue px-2 py-2 transition-colors hover:border-black"></div>
            </div>
          </div>

          <div className="flex items-center justify-between pb-4">
            <div className="w-1/3 sm:w-1/5">
              <p className="font-sans text-secondary">Size</p>
            </div>
            <div className="w-2/3 sm:w-5/6">
              <select className="form-select w-2/3">
                <option value="0">Small</option>
                <option value="1">Medium</option>
                <option value="2">Large</option>
              </select>
            </div>
          </div>

          {/* <ProductQuantity /> */}

          <div className="group flex pb-8">
            <button
              onClick={addToCartHandler}
              className="outline-button mr-4 md:mr-6">
              Add to cart
            </button>

            <Link href="/cart-page">
              <button className="primary-button">BUY NOW</button>
            </Link>
          </div>
          <div className="flex pb-2">
            <p className="font-sans text-secondary">SKU:</p>
            <p className="font-semibold pl-3 text-secondary">KH12345</p>
          </div>
          <p className="font-sans text-secondary">
            <span className="pr-2">Categories:</span>
            {product.category}
          </p>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  }
}
