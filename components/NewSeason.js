import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import Link from 'next/link'
import ProductItem from './ProductItem'

export default function NewSeason({ products }) {
  const displayShoes = 'Shoe'
  const displayGlasses = 'Glass'
  const displayBags = 'Bag'

  const shoesCategories = products.filter(
    (product) => product.category === displayShoes
  )
  const glassesCategories = products.filter(
    (product) => product.category === displayGlasses
  )

  const bagsCategories = products.filter(
    (product) => product.category === displayBags
  )

  const slideOptions = {
    type: 'loop',
    autoplay: true,
    arrows: false,
    start: 1,
    perPage: 3,
    gap: 0,
    perMove: 1,
    rewind: true,
    pagination: false,

    breakpoints: {
      1024: {
        perPage: 2,
        padding: {
          left: 20,
          right: 20,
        },
      },
      768: {
        perPage: 2,
        padding: {
          left: 10,
          right: 10,
        },
      },
      600: {
        perPage: 1,
        padding: {
          left: 0,
          right: 0,
        },
      },
    },
  }

  function renderShoes() {
    return shoesCategories.map((product) => {
      return (
        <SplideSlide
          key={product._id}
          className="splide__slide group relative pt-16 md:pt-0 is-visible is-active"
          style={{ width: 'calc(25%)' }}>
          <ProductItem product={product} />
        </SplideSlide>
      )
    })
  }
  function renderBags() {
    return bagsCategories.map((product) => {
      return (
        <SplideSlide
          key={product._id}
          className="splide__slide group relative pt-16 md:pt-0 is-visible is-active"
          style={{ width: 'calc(25%)' }}>
          <ProductItem product={product} />
        </SplideSlide>
      )
    })
  }

  function renderGlasses() {
    return glassesCategories.map((product) => {
      return (
        <SplideSlide
          key={product._id}
          className="splide__slide group relative pt-16 md:pt-0 is-visible is-active"
          style={{ width: 'calc(25%)' }}>
          <ProductItem product={product} />
        </SplideSlide>
      )
    })
  }

  return (
    <div className="relative w-full">
      <div
        className="absolute inset-y-0 right-0 w-[93%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/bg-products.png)` }}></div>
      <div className="2xl:max-w-screen-xxl relative z-10 mx-auto w-5/6 md:max-w-screen-sm lg:ml-auto lg:mr-10 lg:max-w-full xl:mr-16 xl:w-5/6 2xl:mx-auto">
        <div className="flex flex-col-reverse items-center py-16 lg:flex-row">
          <div className="relative mt-8 ml-6 w-full bg-white px-4 pt-8 pb-6 sm:ml-10 lg:mt-0 lg:ml-0 lg:w-3/5 2xl:w-3/4">
            <div className="collection-slider">
              <Splide options={slideOptions} hasTrack={false}>
                <SplideTrack>{renderShoes()}</SplideTrack>
              </Splide>
            </div>
          </div>

          <div className="ml-6 w-full sm:ml-10 lg:ml-0 lg:w-1/3 lg:pl-6 xl:pl-8 2xl:w-1/4">
            <div className="text-center lg:text-right">
              <h2 className="font-hk font-bold text-2xl tracking-wide text-white lg:text-xl xl:text-2xl 2xl:text-3xl">
                New season, matching shoes
              </h2>
              <p className="pt-1 font-sans text-lg text-secondary-lighter">
                Featured Collection
              </p>
              <div className="block lg:hidden">
                <Link
                  href="/"
                  className="mt-4 inline-block rounded bg-primary px-5 py-4 font-hk text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-light focus:outline-none md:px-8 md:py-5">
                  View All Shoes
                </Link>
              </div>
            </div>
            <div className="group relative hidden lg:block">
              <div
                className="ml-auto mb-auto mt-8 h-56 bg-cover bg-center bg-no-repeat xl:mt-10 xl:h-64 2xl:mt-14 2xl:h-80"
                style={{
                  backgroundImage: `url(/images/collection-shoes.jpg)`,
                }}></div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden bg-secondary opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-75"></div>
              <div className="group absolute inset-0 mx-auto flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  href="/"
                  className="inline-block rounded bg-primary px-5 py-4 font-hk text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-light focus:outline-none md:px-8 md:py-5">
                  View All Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pb-16 lg:flex-row">
          <div className="ml-6 w-full sm:ml-10 lg:ml-0 lg:w-1/3 lg:pr-6 xl:pr-8 2xl:w-1/4">
            <div className="text-center lg:text-right">
              <h2 className="font-hk font-bold text-2xl tracking-wide text-white lg:text-xl xl:text-2xl 2xl:text-3xl">
                Stylish Backpacks, Only For You
              </h2>
              <p className="pt-1 font-hk text-lg text-secondary-lighter">
                Featured Collection
              </p>
              <div className="block lg:hidden">
                <Link
                  href="/"
                  className="mt-4 inline-block rounded bg-primary px-5 py-4 font-hk text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-light focus:outline-none md:px-8 md:py-5">
                  View All Backpacks
                </Link>
              </div>
            </div>

            <div className="group relative hidden lg:block">
              <div
                className="ml-auto mb-auto mt-8 h-56 bg-cover bg-center bg-no-repeat xl:mt-10 xl:h-64 2xl:mt-14 2xl:h-80"
                style={{
                  backgroundImage: `url(/images/backpack-image-04.jpg)`,
                }}></div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden bg-secondary opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-75"></div>
              <div className="group absolute inset-0 mx-auto flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  href="/"
                  className="inline-block rounded bg-primary px-5 py-4 font-hk text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-light focus:outline-none md:px-8 md:py-5">
                  View All Product
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-8 ml-6 w-full bg-white px-4 pt-8 pb-6 sm:ml-10 lg:mt-0 lg:ml-auto lg:w-3/5 2xl:w-3/4">
            <div className="collection-slider">
              <Splide options={slideOptions} hasTrack={false}>
                <SplideTrack>{renderBags()}</SplideTrack>
              </Splide>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center pb-16 lg:flex-row">
          <div className="relative mt-8 ml-6 w-full bg-white px-4 pt-8 pb-6 sm:ml-10 lg:mt-0 lg:ml-0 lg:w-3/5 2xl:w-3/4">
            <div className="collection-slider">
              <Splide options={slideOptions} hasTrack={false}>
                <SplideTrack>{renderGlasses()}</SplideTrack>
              </Splide>
            </div>
          </div>

          <div className="ml-6 w-full sm:ml-10 lg:ml-0 lg:w-1/3 lg:pl-6 xl:pl-8 2xl:w-1/4">
            <div className="text-center lg:text-right">
              <h2 className="font-hk font-bold text-2xl tracking-wide text-white lg:text-xl xl:text-2xl 2xl:text-3xl">
                Summer? You need chick sunglasses
              </h2>
              <p className="pt-1 font-hk text-lg text-secondary-lighter">
                Featured Collection
              </p>
              <div className="block lg:hidden">
                <Link
                  href="/"
                  className="mt-4 inline-block rounded bg-primary px-5 py-4 font-hk text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-light focus:outline-none md:px-8 md:py-5">
                  View All Sunglasses
                </Link>
              </div>
            </div>
            <div className="group relative hidden lg:block">
              <div
                className="ml-auto mb-auto mt-8 h-56 bg-cover bg-center bg-no-repeat xl:mt-10 xl:h-64 2xl:mt-14 2xl:h-80"
                style={{
                  backgroundImage: `url(/images/sunglasses-image-03.jpg)`,
                }}></div>
              <div className="pointer-events-none absolute inset-0 overflow-hidden bg-secondary opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-75"></div>
              <div className="group absolute inset-0 mx-auto flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  href="/"
                  className="inline-block rounded bg-primary px-5 py-4 font-hk text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-light focus:outline-none md:px-8 md:py-5">
                  View All Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
