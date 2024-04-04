import Link from 'next/link'

const ContactSection = () => {
  return (
    <div className="flex flex-col justify-between pb-16 md:pb-20 lg:flex-row lg:pb-24">
      <div className="mx-auto w-full border border-grey-darker px-6 py-10 text-center shadow lg:mx-0 lg:w-3/8 lg:py-8 lg:text-left xl:w-1/3 xl:px-8">
        <h2 className="border-b border-grey-dark pb-6 font-butler text-2xl text-secondary sm:text-3xl md:text-4xl">
          Quick contact
        </h2>

        <ContactInfo title="Email" content="information@elyssi.com" />
        <ContactInfo title="Phone" content="+0 321-654-0987" />

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">
          WORKING HOURS
        </h4>

        <ContactInfo title="Summer" content="Mon - Sat: 9.00 to 18.00" />
        <ContactInfo title="Winter" content="Mon - Sat: 9.00 to 17.00" />

        <div className="pt-8">
          <h4 className="font-hk text-lg font-bold uppercase text-secondary sm:text-xl">
            Follow Us
          </h4>
          <div className="flex justify-center pt-3 lg:justify-start">
            <SocialLink href="/" icon="bx bxl-facebook" />
            <SocialLink href="/" icon="bx bxl-twitter" />
            <SocialLink href="/" icon="bx bxl-google" />
            <SocialLink href="/" icon="bx bxl-linkedin" />
          </div>
        </div>
      </div>

      <ContactFormSection />
    </div>
  )
}

const ContactInfo = ({ title, content }) => (
  <>
    <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">
      {title}
    </h4>
    <p className="font-hk text-secondary">{content}</p>
  </>
)

const SocialLink = ({ href, icon }) => (
  <Link
    href={href}
    className="mr-2 flex items-center rounded-full bg-secondary-lighter p-3 text-xl transition-colors hover:bg-primary">
    <i className={icon + ' text-white'}></i>
  </Link>
)

const ContactFormSection = () => (
  <div className="mt-10 border border-grey-darker px-8 py-10 shadow md:mt-12 lg:mt-0 lg:w-3/5 lg:py-8">
    <form>
      <p className="pb-8 font-hk text-lg text-secondary">
        Any questions? Contact us through Whatsapp or on our contact form below.
      </p>
      <div className="mb-5 grid grid-cols-1 justify-between md:grid-cols-2 md:gap-10">
        <ContactFormField
          label="Name"
          placeholder="Enter your name"
          id="name"
        />
        <ContactFormField
          label="Email address"
          placeholder="Enter your email"
          id="email"
        />
      </div>
      <ContactFormField
        label="Subject"
        placeholder="Enter your subject"
        id="subject"
      />
      <ContactFormField
        label="Message"
        placeholder="Enter your message"
        id="message"
        textarea
      />
      <button className="primary-button" aria-label="Submit button">
        SUBMIT
      </button>
    </form>
  </div>
)

const ContactFormField = ({ label, placeholder, id, textarea }) => (
  <div className={textarea ? 'mb-8 w-full' : 'mb-5 sm:mb-0'}>
    <label htmlFor={id} className="mb-2 block font-hk text-secondary">
      {label}
    </label>
    {textarea ? (
      <textarea
        rows="5"
        placeholder={placeholder}
        className="form-textarea"
        id={id}></textarea>
    ) : (
      <input
        type="text"
        placeholder={placeholder}
        className="form-input"
        id={id}
      />
    )}
  </div>
)

export default ContactSection
