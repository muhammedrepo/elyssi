import ThreeIcons from './ThreeIcons'
import Link from 'next/link'
import Image from 'next/image'

/* eslint-disable @next/next/no-img-element */
export default function ProductItem({ product }) {
  console.log(product)
  if (!product) return null
  return (
    <div className="sm:px-5 lg:px-4">
      <div className="relative flex items-center justify-center rounded">
        <div className="aspect-w-1 aspect-h-1 w-full">
          <Image
            src={
              product.images && product.images.length > 0
                ? product.images[0].url
                : '/images/placeholder.png'
            }
            alt="product image"
            className="object-cover"
            width={500}
            height={500}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="absolute top-0 right-0 m-4 rounded-full bg-white px-5 py-1">
          <p className="text-v-red font-hk font-bold text-sm uppercase tracking-wide">
            {product.brand}
          </p>
        </div>
        <ThreeIcons product={product} />
      </div>
      <Link
        href={`/product/${product.slug}`}
        className="flex items-center justify-between pt-6">
        <div>
          <h3 className="font-hk text-base text-secondary">{product.name}</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              {Array.from({ length: product.rating }, (_, index) => (
                <i key={index} className="bx bxs-star text-primary"></i>
              ))}
              <span className="ml-2 font-hk text-sm text-secondary">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
        <span className="font-hkbold text-xl text-primary">
          ${product.price}
        </span>
      </Link>
    </div>
  )
}
