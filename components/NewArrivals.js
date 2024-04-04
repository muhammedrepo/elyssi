import Link from 'next/link'

export default function NewArrivals() {
  return (
    <div className="relative mt-10 mb-12 w-full py-5 sm:mb-6 sm:py-16 md:mt-16 md:mb-12 lg:mb-28">
      <div
        className="relative z-20 h-80 bg-cover bg-left bg-no-repeat sm:h-[25rem] md:h-[27rem] lg:h-[30rem] lg:w-6/11 xl:w-3/5"
        style={{ backgroundImage: `url(/images/coupon-image.jpg)` }}></div>
      <div
        className="right-0 bottom-0 ml-auto h-80 bg-cover bg-right bg-no-repeat sm:h-[25rem] md:h-[27rem] lg:h-[30rem] lg:absolute lg:w-6/11 xl:w-3/5"
        style={{ backgroundImage: `url(/images/bg-coupon.png)` }}>
        <div className="mx-auto w-5/6 py-14 text-center sm:w-3/5 sm:py-20 lg:w-full lg:pr-8 lg:pl-40 lg:text-left xl:py-24 xl:pl-80">
          <span className="font-hk text-lg font-medium uppercase text-white md:text-xl">
            New Arrivals
          </span>
          <h2 className="pt-5 font-butler text-3xl font-medium leading-tight text-white sm:text-4xl md:text-4.5xl xl:text-5xl">
            Blouses &amp; Jeans Up to 70% Off
          </h2>
          <Link href="/collection-grid">
            <button className="primary-button mt-8 md:mt-10">Get it now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
