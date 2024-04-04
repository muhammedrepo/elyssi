import ProductItem from './ProductItem'
import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon'
import Link from 'next/link'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import '@splidejs/react-splide/css/core'

export default function ElyssisTrends({ products }) {
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

  const renderProductItemsSlides = () => {
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
    <div className="pb-20 md:pb-24 lg:pb-32 px-4">
      <div className="mb-12 flex flex-col items-center justify-between sm:mb-10 sm:flex-row sm:pb-4 lg:pb-0">
        <div className="text-center sm:text-left">
          <h2 className="font-butler text-3xl text-secondary md:text-4xl lg:text-4.5xl">
            Elyssi’s trends
          </h2>
          <p className="pt-2 font-hk text-lg text-secondary-lighter md:text-xl">
            Be styling, no matter the season!
          </p>
        </div>
        <Link
          href="/collection-grid"
          className="group flex items-center border-b border-primary pt-1 font-hk text-xl text-primary transition-colors hover:border-primary-light sm:pt-0">
          Show more
          <ChevronRight className="w-7 h-7 pl-3 pt-2 text-xl font-bold text-primary transition-colors group-hover:text-primary-light" />
        </Link>
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
          <SplideTrack style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            {renderProductItemsSlides()}
          </SplideTrack>
        </Splide>
      </div>
    </div>
  )
}
