import ChevronRight from '@heroicons/react/24/solid/ChevronRightIcon'
export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="flex flex-wrap items-center">
      {[
        'Cart',
        'Customer Info',
        'Shipping Method',
        'Payment Method',
        'Place Order',
      ].map((step, index) => (
        <div key={step} className="flex flex-wrap items-center">
          <div
            className={`transition-all border-b  hover:border-primary text-sm  hover:text-primary font-hk
                  ${
                    index <= activeStep
                      ? 'border-primary text-primary'
                      : 'border-transparent text-secondary'
                  }`}>
            {step}
          </div>
          <ChevronRight className="w-8 h-8 text-secondary px-2" />
        </div>
      ))}
    </div>
  )
}
