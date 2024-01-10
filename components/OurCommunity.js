import Image from "next/image"

export default function OurCommunity() {
  const brands = [
    '/images/brands/brand-01.png',
    '/images/brands/brand-02.png',
    '/images/brands/brand-03.png',
    '/images/brands/brand-04.png',
    '/images/brands/brand-05.png',
    '/images/brands/brand-06.png',
  ]

  return (
    <div className="border-b border-grey-dark pt-16 pb-5 sm:pt-20 sm:pb-12">
      <h4 className="text-center font-hk text-xl uppercase text-secondary">
        Our community
      </h4>
      <div className="grid grid-cols-2 gap-5 pt-8 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand, index) => (
          <Image
            key={index}
            src={brand}
            alt={`brand logo ${index + 1}`}
            className="mb-8 h-24 w-full object-cover sm:mb-10 lg:mb-0"
            height={96}
            width={100}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        ))}
      </div>
    </div>
  );
}
