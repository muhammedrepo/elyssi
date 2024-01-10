import Link from 'next/link'

export default function MobileCart({ isOpen }) {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } pointer-events-auto absolute inset-x-0 z-50`}>
      <div className="absolute right-0 top-0 z-10 w-full rounded bg-white px-6 py-6 shadow-sm sm:w-1/2">
        <div className="flex items-center justify-between border-b border-grey-dark pb-2">
          <div className="flex items-center">
            <i className="bx bx-x mr-2 cursor-pointer text-2xl text-grey-darkest sm:text-3xl"></i>
            <div className="mx-0 flex h-20 w-20 items-center justify-center rounded">
              <div
                className="mx-auto h-16 w-16 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(/images/unlicensed/backpack-1.png)`,
                }}></div>
            </div>
            <div className="pl-2">
              <span className="block font-hk text-base text-grey-darkest">
                Winter Bag
              </span>
              <span className="mt-2 font-hk text-base text-secondary">$19</span>
            </div>
          </div>
          <div className="flex items-center pl-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary">
              <i className="bx bx-minus text-primary"></i>
            </span>
            <span className="font-hkbold block px-2 text-lg text-primary">
              1
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary">
              <i className="bx bx-plus text-primary"></i>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-grey-dark pb-2">
          <div className="flex items-center">
            <i className="bx bx-x mr-2 cursor-pointer text-2xl text-grey-darkest sm:text-3xl"></i>
            <div className="mx-0 flex h-20 w-20 items-center justify-center rounded">
              <div
                className="mx-auto h-16 w-16 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(/images/unlicensed/backpack-1.png)`,
                }}></div>
            </div>
            <div className="pl-2">
              <span className="block font-hk text-base text-grey-darkest">
                Winter Bag
              </span>
              <span className="mt-2 font-hk text-base text-secondary">$19</span>
            </div>
          </div>
          <div className="flex items-center pl-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary">
              <i className="bx bx-minus text-primary"></i>
            </span>
            <span className="font-hkbold block px-2 text-lg text-primary">
              1
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary">
              <i className="bx bx-plus text-primary"></i>
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <span className="font-hkbold text-lg text-secondary">Total</span>
          <span className="font-hkbold text-lg text-secondary">$38</span>
        </div>

        <button type="submit" className="primary-button mt-5 w-full">
          Checkout
        </button>

        <Link
          href="/cart"
          className="mt-4 block pl-3 text-center font-hk text-secondary underline md:text-lg">
          Go to cart page
        </Link>
      </div>
    </div>
  )
}
