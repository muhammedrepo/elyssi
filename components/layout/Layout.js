import Head from 'next/head'
import React, { useState } from 'react'
import TopBar from './TopBar'
import MiddleNav from './MiddleNav'
import Navbar from './Navbar'
import MobileMenu from './MobileMenu'
import Footer from './Footer'
import MobileCart from './MobileCart'
import MobileSearch from './MobileSearch'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CtaSection from '../CtaSection'

export default function Layout({ children, title }) {
  const [activeMobileView, setActiveMobileView] = useState(null)

  const toggleMobileView = (view) => {
    setActiveMobileView((prevView) => (prevView === view ? null : view))
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} | Elyssi` : 'Elyssi'}</title>
        <meta name="description" content="E-commerce Website" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="">
        <TopBar />
        <div className="flex flex-col justify-between min-h-screen">
          <header className="container relative mx-auto px-4">
            <div className="relative z-50 py-6 shadow-xs lg:py-10">
              <MiddleNav
                toggleMobileMenu={() => toggleMobileView('menu')}
                toggleMobileSearch={() => toggleMobileView('search')}
                toggleMobileCart={() => toggleMobileView('cart')}
              />
              <Navbar />
              <MobileMenu isOpen={activeMobileView === 'menu'} />
              <MobileSearch isOpen={activeMobileView === 'search'} />
              <MobileCart isOpen={activeMobileView === 'cart'} />
            </div>
          </header>
          <main className={`container mx-auto`}>
            {children}
            <CtaSection />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
