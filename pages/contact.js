import Breadcrumb from '@/components/Breadcrumb'
import ContactSection from '@/components/ContactFormSection'
import FaqAccordion from '@/components/FaqAccordion'
import ServicesSection from '@/components/ServicesSection'
import Layout from '@/components/layout/Layout'

export default function ContactPageScreen() {
  const breadcrumbItems = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Contact us',
    },
  ]
  return (
    <Layout title="Contact Page">
      <div className="relative flex">
        <div
          className="ml-auto h-56 w-3/4 bg-cover bg-center bg-no-repeat lg:h-68"
          style={{ backgroundImage: 'url(/images/about-hero.png)' }}></div>
        <div className="c-hero-gradient-bg absolute top-0 left-0 h-56 w-full bg-cover bg-no-repeat lg:h-68">
          <div className="py-20 px-6 sm:px-12 lg:px-20">
            <h1 className="font-butler text-2xl text-white sm:text-3xl md:text-4.5xl lg:text-5xl">
              Contact Us
            </h1>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>

      <ServicesSection />
      <ContactSection />
      <FaqAccordion />
    </Layout>
  )
}
