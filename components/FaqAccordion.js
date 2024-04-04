import { useState } from 'react'

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleFaqClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const faqData = [
    {
      question: 'How many days does the product take to arrive?',
      answer: 'It depends on the product, but it can take 3-5 days max.',
    },
    {
      question: 'How much is shipping?',
      answer:
        'It depends on various factors like your location and the number of items. We offer free shipping for orders over $50.',
    },
    // Add more FAQ items as needed
  ]

  return (
    <div className="pb-16 md:pb-20 lg:pb-24" id="faq">
      <div className="mx-auto text-center sm:w-5/6 md:mx-0 md:w-full">
        <h2 className="font-butler text-2xl text-secondary sm:text-3xl md:text-4.5xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="pt-2 font-hk text-lg text-secondary-lighter md:text-xl">
          Get the latest news & updates from Elyssi
        </p>

        <div className="pt-12">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="faq-wrapper cursor-pointer border-t border-l border-r border-primary last:border-b">
              <div
                className={`faq-question flex items-center justify-between border-primary bg-primary-lightest px-5 py-5 transition-all md:px-8 ${
                  openIndex === index ? 'border-b' : ''
                }`}
                onClick={() => handleFaqClick(index)}>
                <div className="w-5/6 text-left">
                  <span className="font-hk font-medium uppercase text-secondary md:text-lg">
                    {item.question}
                  </span>
                </div>
                <div className="w-1/6 text-right">
                  <i
                    className={`bx text-2xl text-primary bx-plus ${
                      openIndex === index ? 'bx-minus' : 'bx-plus'
                    }`}></i>
                </div>
              </div>
              <div
                className={`cursor-text transition-all max-h-0 overflow-hidden ${
                  openIndex === index
                    ? 'max-h-96 transition-all ease-in-out duration-500'
                    : 'max-h-0 overflow-hidden'
                }`}>
                <div className="px-5 py-5 md:px-8">
                  <p className="text-left font-hk text-sm leading-loose text-secondary">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
