import { useContext } from 'react'
import CartTotal from './CartTotal'
import { Store } from '@/utils/Store'
import Image from "next/image"
export default function YourOrder() {
  const { state } = useContext(Store)

  const {
    cart: { cartItems },
  } = state
  return (
    <div className="mt-8 bg-grey-light sm:w-2/3 md:w-1/2 lg:mt-0 lg:w-1/3">
      <div className="p-8">
        <h3 className="font-hkbold pb-3 text-center text-2xl text-secondary sm:text-left">
          Your Order
        </h3>
        <p className="font-hkbold text-center uppercase text-secondary sm:text-left">
          PRODUCTS
        </p>
        <div className="mt-5 mb-8">
          {cartItems.map((item) => (
            <div key={item.slug} className="mb-5 flex items-center">
              <div className="relative mr-3 w-20 sm:pr-0">
                <div className="flex h-20 items-center justify-center rounded">
                  <Image
                    src={item.images[0].url}
                    alt="BeautifulBrownimage"
                    width={48}
                    height={64}
                    className="h-16 w-12 object-cover object-center"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary px-2 font-hk text-xs leading-none text-white">
                    {item.quantity}
                  </span>
                </div>
              </div>
              <p className="font-hk text-lg text-secondary">{item.name}</p>
            </div>
          ))}
        </div>
        <CartTotal />
      </div>
    </div>
  );
}
