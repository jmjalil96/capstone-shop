import { Navbar } from '@/components/navbar'
import { About, Contact, Footer, Hero, Services, Testimonials } from '@/features/landing/sections'

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
