import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import '@splidejs/react-splide/css/core'
import ProductItem from './ProductItem'

export default function OnSale({ products }) {
  const slideOptions = {
    type: 'loop',
    start: 1,
    perPage: 4,
    gap: 0,
    perMove: 1,
    rewind: true,
    pagination: false,
    padding: {
      left: 50,
      right: 50,
    },
    breakpoints: {
      1024: {
        perPage: 3,
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

  const renderOnSaleProductsSlides = () => {
    return products.map((product) => (
      <SplideSlide
        key={product._id}
        className="splide__slide group relative pt-16 md:pt-0 is-visible is-active"
        style={{ width: 'calc(25%)' }}>
        <ProductItem product={product} />
      </SplideSlide>
    ))
  }

  return (
    <div className="pb-20 md:pb-32">
      <div className="pb-12 text-center">
        <h2 className="font-butler text-3xl text-secondary md:text-4xl lg:text-4.5xl">
          On Sale, only today
        </h2>
        <p className="font-hk text-lg text-secondary-lighter md:text-xl">
          Get it while they last!
        </p>
      </div>
      <div className="relative">
        <div className="splide__arrows">
          <div className="splide__arrow splide__arrow--prev group absolute left-25 top-50 z-30 -translate-y-1/2 transform cursor-pointer rounded-full border border-grey-dark bg-grey shadow-md transition-all hover:bg-primary sm:left-35 md:left-0">
            <div className="flex h-12 w-12 items-center justify-center">
              <i className="bx bx-chevron-left text-3xl leading-none text-primary transition-colors group-hover:text-white"></i>
            </div>
          </div>
          <div className="splide__arrow splide__arrow--next group absolute right-25 top-50 z-30 -translate-y-1/2 transform cursor-pointer rounded-full border border-grey-dark bg-grey shadow-md transition-all hover:bg-primary sm:right-35 md:right-0">
            <div className="flex h-12 w-12 items-center justify-center">
              <i className="bx bx-chevron-right text-3xl leading-none text-primary transition-colors group-hover:text-white"></i>
            </div>
          </div>
        </div>
        <Splide options={slideOptions} hasTrack={false} className="relative">
          <SplideTrack>{renderOnSaleProductsSlides()}</SplideTrack>
        </Splide>
      </div>
    </div>
  )
}
