import Link from 'next/link'
const CollectionItem = ({ name, trendingImage, slug, isSpecialStyle }) => (
  <div
    className={`relative h-56 bg-cover bg-left bg-no-repeat px-10 sm:h-80 sm:bg-center ${
      isSpecialStyle ? 'lg:row-span-2 lg:h-auto' : 'lg:h-68'
    }`}
    style={{ backgroundImage: `url(${trendingImage})` }}>
    <div className="absolute inset-0 w-2/3 px-6 py-14 md:px-10">
      <h3 className="font-hk text-xl font-semibold text-secondary sm:text-2xl md:text-3xl">
        {name}
      </h3>
      <Link href={`/product/${slug}`} className="group flex items-center pt-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-2">
          <i className="bx bx-chevron-right text-xl text-primary transition-colors group-hover:text-v-red"></i>
        </div>
        <p className="-mt-1 pl-3 font-hk font-semibold leading-none text-primary transition-colors group-hover:text-v-red sm:pl-5 sm:text-lg">
          Get It Now
        </p>
      </Link>
    </div>
  </div>
)

const TrendingCollections = ({ trendingProducts }) => {
  return (
    <div className="grid grid-cols-1 gap-10 pb-20 md:pb-24 lg:grid-cols-2 lg:pb-32">
      <div className="mx-auto px-10 text-center lg:mx-0 lg:text-left">
        <div className="pb-4 md:pb-10 lg:w-3/4 lg:pt-10 xl:w-2/3">
          <h1 className="font-butler text-3xl text-secondary md:text-4xl lg:text-4.5xl">
            Trending Elyssi Collections
          </h1>
          <p className="pt-4 font-hk text-lg text-secondary-lighter">
            Checkout our newest trends this coming season
          </p>
        </div>
      </div>
      {trendingProducts.map((collection, index) => (
        <CollectionItem
          key={index}
          {...collection}
          isSpecialStyle={index === 2}
        />
      ))}
    </div>
  )
}

export default TrendingCollections
