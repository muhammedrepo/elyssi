import Link from 'next/link'
import data from '@/utils/data'
import SocialLinks from '../SocialLinks'

export default function Footer() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-footer.png')" }}>
        <div className="container mx-auto py-16 sm:py-20 md:py-24">
          <div className="mx-auto w-full flex flex-col items-center justify-between lg:flex-row">
            <div className="text-center lg:text-left">
              <h4 className="pb-8 font-hk text-xl font-bold text-white">
                Contact
              </h4>
              <ul className="list-reset">
                {data.contactLinks.map((link, index) => (
                  <li className="block pb-2" key={index}>
                    <Link
                      href={link.href}
                      className="font-hk text-base tracking-wide text-white transition-colors hover:text-primary">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-16 text-center lg:py-0">
              <Link
                href="/"
                className="font-butler text-4xl uppercase tracking-wider text-white">
                Elyssi.
              </Link>
              <SocialLinks />
            </div>
            <div className="text-center lg:text-left">
              <h4 className="pb-8 font-hk text-xl font-bold text-white">
                Link
              </h4>
              <ul className="list-reset">
                {data.linkList.map((link, index) => (
                  <li className="block pb-2" key={index}>
                    <Link
                      href={link.href}
                      className="font-hk text-base tracking-wide text-white transition-colors hover:text-primary">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <p className="text-center font-hk text-base text-secondary">
          All rights reserved © 2024. Made with ❤️ by{' '}
          <Link
            href="https://muhammedtijani.com"
            target="_blank"
            className="text-primary">
            Muhammed Tijani
          </Link>
          .
        </p>
      </div>
    </>
  )
}
