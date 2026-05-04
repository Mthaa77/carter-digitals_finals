'use client'

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import WhyCarter from '@/components/why-carter'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Testimonials from '@/components/testimonials'
import FreeTools from '@/components/free-tools'
import WebsiteCostCalculator from '@/components/website-cost-calculator'
import BBBEECalculator from '@/components/bbbee-calculator'
import CarterStory from '@/components/carter-story'
import Pricing from '@/components/pricing'
import BlogPreview from '@/components/blog-preview'
import ContactForm from '@/components/contact-form'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import CustomCursor from '@/components/custom-cursor'
import ScrollToTop from '@/components/scroll-to-top'
import SectionDivider from '@/components/section-divider'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen bg-[#080808]">
        <Hero />
        <SectionDivider />
        <WhyCarter />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <FreeTools />
        <WebsiteCostCalculator />
        <BBBEECalculator />
        <SectionDivider />
        <CarterStory />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <BlogPreview />
        <SectionDivider />
        <ContactForm />
        <Footer />
      </main>
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
