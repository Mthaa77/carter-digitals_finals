'use client'

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import WhyCarter from '@/components/why-carter'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Testimonials from '@/components/testimonials'
import FreeTools from '@/components/free-tools'
import CarterStory from '@/components/carter-story'
import Pricing from '@/components/pricing'
import BlogPreview from '@/components/blog-preview'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import CustomCursor from '@/components/custom-cursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen bg-[#080808]">
        <Hero />
        <WhyCarter />
        <Services />
        <Portfolio />
        <Testimonials />
        <FreeTools />
        <CarterStory />
        <Pricing />
        <BlogPreview />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  )
}
