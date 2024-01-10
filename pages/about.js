import Breadcrumb from '@/components/Breadcrumb'
import IntroSection from '@/components/IntroSection'
import MissionSection from '@/components/MissionSection'
import TeamSection from '@/components/TeamSection'
import Layout from '@/components/layout/Layout'
import Image from 'next/image'

export default function AboutPageScreen() {
  const breadcrumbItems = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'About us',
    },
  ]
  return (
    <Layout title="About Page">
      <div className="container">
        <div className="relative flex">
          <div
            className="ml-auto h-56 w-3/4 bg-cover bg-center bg-no-repeat lg:h-68"
            style={{ backgroundImage: 'url(/images/about-hero.png)' }}></div>
          <div className="c-hero-gradient-bg absolute top-0 left-0 h-56 w-full bg-cover bg-no-repeat lg:h-68">
            <div className="py-20 px-6 sm:px-12 lg:px-20">
              <h1 className="font-butler text-2xl text-white sm:text-3xl md:text-4.5xl lg:text-5xl">
                About Us
              </h1>
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
        </div>

        <div className="py-20 lg:py-24">
          <span className="mb-3 block text-center font-hk text-sm uppercase text-secondary sm:text-base md:text-lg">
            Our Story
          </span>
          <h1 className="text-center font-butler text-2xl text-secondary sm:text-3xl md:text-4.5xl lg:text-5xl">
            Get To Know Us
          </h1>
          <p className="mx-auto mt-6 mb-12 text-center font-hk text-base text-secondary lg:mt-10 lg:w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
            ultricies tristique nulla aliquet enim tortor at auctor. Mattis
            vulputate enim nulla aliquet porttitor lacus luctus accumsan.
            Volutpat ac tincidunt vitae semper quis lectus nulla at. Odio
            euismod lacinia at quis.
          </p>
          <div className="flex flex-col justify-between text-center sm:text-left md:flex-row">
            <div className="md:w-1/2">
              <div className="px-4">
                <div className="aspect-w-16 aspect-h-11">
                  <Image
                    src="/images/about-image-01.png"
                    alt="column image"
                    className="object-cover"
                    width={500}
                    height={352}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                    }}
                  />
                </div>
                <p className="mt-10 font-hk text-base text-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Dignissim diam quis enim lobortis scelerisque. Suspendisse
                  interdum consectetur libero id faucibus nisl tincidunt eget
                  nullam. Morbi non arcu risus quis varius quam quisque id diam.
                  Lectus proin nibh nisl condimentum. Sed cras ornare arcu dui
                  vivamus. Placerat vestibulum lectus mauris ultrices. A iaculis
                  at erat pellentesque adipiscing commodo elit at. Euismod
                  lacinia at quis risus. <br /> <br /> Mattis nunc sed blandit
                  libero. Turpis egestas sed tempus urna. Morbi quis commodo
                  odio aenean sed adipiscing diam. Euismod quis viverra nibh
                  cras pulvinar mattis nunc sed blandit. Amet mauris commodo
                  quis imperdiet massa tincidunt. Faucibus ornare suspendisse
                  sed nisi lacus sed viverra tellus. Id semper risus in
                  hendrerit gravida rutrum. Eget nunc scelerisque viverra mauris
                  in. Tortor vitae purus faucibus ornare suspendisse sed nisi
                  lacus. Justo eget magna fermentum iaculis eu non diam
                  phasellus vestibulum.
                </p>
              </div>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2">
              <div className="px-4">
                <div className="aspect-w-16 aspect-h-11">
                  <Image
                    src="/images/about-image-02.jpg"
                    alt="column image"
                    className="object-cover"
                    width={500}
                    height={352}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                    }}
                  />
                </div>
                <p className="mt-10 font-hk text-base text-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Dignissim diam quis enim lobortis scelerisque. Suspendisse
                  interdum consectetur libero id faucibus nisl tincidunt eget
                  nullam. Morbi non arcu risus quis varius quam quisque id diam.{' '}
                  <br /> <br /> Mattis nunc sed blandit libero. Turpis egestas
                  sed tempus urna. Morbi quis commodo odio aenean sed adipiscing
                  diam. Euismod quis viverra nibh cras pulvinar mattis nunc sed
                  blandit. Amet mauris commodo quis imperdiet massa tincidunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16 text-center md:mt-5 md:mb-20 lg:mb-24">
        <div className="mx-auto h-56 w-56 overflow-hidden rounded-full">
          <div className="aspect-w-1 aspect-h-1">
            <Image
              src="/images/team/team-01.jpg"
              alt="profile image"
              className="object-cover"
              width={224}
              height={224}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
        <h3 className="mx-auto mt-12 px-6 text-center font-butler text-2xl leading-tight text-secondary sm:px-16 sm:text-3xl md:text-4xl xl:text-5xl">
          We aim for you to get the ultimate stylish look at an affordable price
        </h3>
        <p className="font-hkbold mt-8 text-lg text-secondary md:mt-12">
          Elmer Howard
        </p>
        <p className="mt-1 font-hk text-secondary md:text-lg">
          CEO &amp; Co-Founder
        </p>
      </div>
      <MissionSection />
      <IntroSection />
      <TeamSection />
    </Layout>
  )
}
