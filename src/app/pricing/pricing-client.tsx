'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/navigation'
import Pricing from '@/components/pricing'
import Footer from '@/components/footer'

export default function PricingPageClient() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen flex flex-col bg-[#080808]">
        {/* Hero Banner */}
        <section className="aurora-bg relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          {/* Subtle glow layer */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A84C] blur-[150px] opacity-[0.07]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Back to homepage link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--cd-text-muted)] hover:text-[#C9A84C] text-sm font-medium transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Homepage
              </Link>
            </motion.div>

            {/* Section label */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label inline-block mb-4"
            >
              Pricing
            </motion.span>

            {/* Gradient heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="gold-gradient-text heading-shadow-lg font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              Our Pricing
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[var(--cd-text-muted)] text-lg md:text-xl max-w-2xl mx-auto"
            >
              Real prices. Real work. No hidden fees.
              <br className="hidden sm:block" />
              Choose the package that fits your needs.
            </motion.p>
          </div>
        </section>

        {/* Pricing Component */}
        <Pricing />

        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </>
  )
}
