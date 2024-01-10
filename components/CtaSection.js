import SubscribeForm from './SubscribeForm'

export default function CtaSection() {
  return (
    <div className="container mx-auto mb-20">
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-cta.png)' }}>
        <div className="py-16 text-center md:py-20">
          <h3 className="font-butler text-3xl tracking-wide text-white sm:text-4xl">
            Lets keep in touch
          </h3>
          <p className="px-6 pt-3 font-hk text-lg text-white sm:text-xl">
            Join our list and save 15% off your first order.
          </p>
          <SubscribeForm />
        </div>
      </div>
    </div>
  )
}
