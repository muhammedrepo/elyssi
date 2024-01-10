import Image from "next/image"
const ServiceItem = ({ iconSrc, title, description }) => (
  <div className="mx-auto flex w-4/5 items-start justify-start pb-3 last:border-r-0 sm:w-1/2 md:w-2/5 md:flex-col md:items-center md:justify-center md:border-r-2 md:border-primary-lighter md:pb-0 md:text-center lg:mx-0 lg:w-1/3 lg:flex-row lg:text-left">
    <div>
      <Image
        src={iconSrc}
        className="h-12 w-12 object-contain object-center"
        alt="icon"
        width={48}
        height={48}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
    <div className="ml-6 md:mt-3 lg:mt-0">
      <h3 className="font-hk text-xl font-semibold tracking-wide text-primary">
        {title}
      </h3>
      <p className="font-hk text-base tracking-wide text-secondary-lighter">
        {description}
      </p>
    </div>
  </div>
)

const ServicesSection = () => {
  const serviceItems = [
    {
      iconSrc: '/images/icon-shipping.svg',
      title: 'Free shipping',
      description: 'On all orders over $30',
    },
    {
      iconSrc: '/images/icon-support.svg',
      title: 'Always available',
      description: '24/7 call center available',
    },
    {
      iconSrc: '/images/icon-return.svg',
      title: 'Free returns',
      description: '30 days free return policy',
    },
  ]

  return (
    <div className="flex flex-col py-20 md:flex-row md:py-24">
      {serviceItems.map((item, index) => (
        <ServiceItem key={index} {...item} />
      ))}
    </div>
  )
}

export default ServicesSection
