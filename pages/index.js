import Layout from '@/components/layout/Layout'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import Link from 'next/link'
import db from '@/utils/db'
import Product from '@/models/Product'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ServicesSection from '@/components/ServicesSection'
import TrendingCollections from '@/components/TrendingCollections'
import ElyssisTrends from '@/components/ElyssisTrends'
import NewArrivals from '@/components/NewArrivals'
import OurCommunity from '@/components/OurCommunity'
import OnSale from '@/components/OnSale'
import NewSeason from '@/components/NewSeason'

export default function Home({ products, featuredProducts, trendingProducts }) {
  console.log(products)
  const slideOptions = {
    type: 'loop',
    arrows: false,
    pagination: true,
    autoplay: true,
    interval: 3000,
  }
  const renderSlides = () => {
    {
      return featuredProducts.map((product) => (
        <SplideSlide key={product._id} style={{ width: 'calc(100%)' }}>
          <Link
            href={`/product/${product.slug}`}
            className="bg-cover bg-left bg-no-repeat sm:bg-center"
            style={{
              backgroundImage: `url(${product.banner})`,
              display: 'block',
            }}>
            <div className="py-48 px-5 text-center sm:w-5/6 sm:px-10 sm:text-left md:px-12 lg:w-3/4 xl:w-2/3 xl:px-24">
              <h3 className="font-butler text-3xl font-medium text-secondary sm:text-4xl md:text-5xl lg:text-6xl">
                Match and play Women’s Dresses
              </h3>
              <button className="primary-button mt-8" tabIndex="-1">
                Shop Now
              </button>
            </div>
          </Link>
        </SplideSlide>
      ))
    }
  }
  return (
    <Layout title="Home Page">
      <div className="container">
        <Splide options={slideOptions} hasTrack={false}>
          <SplideTrack>{renderSlides()}</SplideTrack>
        </Splide>
        <ServicesSection />
        <TrendingCollections trendingProducts={trendingProducts} />
        <ElyssisTrends products={products} />
        <NewSeason products={products} />
        <div className="container">
          <OurCommunity />
          <NewArrivals />
          <OnSale products={products} />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()

  const products = await Product.find({ isFeatured: false }).lean()
  const featuredProducts = await Product.find({ isFeatured: true }).lean()
  const trendingProducts = await Product.find({ isTrending: true }).lean()

  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      trendingProducts: trendingProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  }
}
