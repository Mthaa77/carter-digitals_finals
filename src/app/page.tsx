'use client'

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import ClientMarquee from '@/components/client-marquee'
import WhyCarter from '@/components/why-carter'
import StatsTicker from '@/components/stats-ticker'
import Services from '@/components/services'
import ServiceComparison from '@/components/service-comparison'
import Portfolio from '@/components/portfolio'
import Testimonials from '@/components/testimonials'
import FreeTools from '@/components/free-tools'
import WebsiteCostCalculator from '@/components/website-cost-calculator'
import BBBEECalculator from '@/components/bbbee-calculator'
import CarterStory from '@/components/carter-story'
import Pricing from '@/components/pricing'
import Process from '@/components/process'
import FAQ from '@/components/faq'
import BlogPreview from '@/components/blog-preview'
import ContactForm from '@/components/contact-form'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import AIChatWidget from '@/components/ai-chat-widget'
import CustomCursor from '@/components/custom-cursor'
import ScrollToTop from '@/components/scroll-to-top'
import CookieConsent from '@/components/cookie-consent'
import SectionDivider from '@/components/section-divider'
import PageLoader from '@/components/page-loader'
import ParticleBg from '@/components/particle-bg'

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen flex flex-col bg-[#080808]">
        <ParticleBg />
        <Hero />
        <ClientMarquee />
        <SectionDivider />
        <WhyCarter />
        <SectionDivider />
        <StatsTicker />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <ServiceComparison />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <FreeTools />
        <WebsiteCostCalculator />
        <BBBEECalculator />
        <SectionDivider />
        <CarterStory />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <BlogPreview />
        <SectionDivider />
        <ContactForm />
        <Newsletter />
        <div className="mt-auto">
          <Footer />
        </div>
      </main>
      <WhatsAppButton />
      <AIChatWidget />
      <ScrollToTop />
      <CookieConsent />
    </>
  )
}
