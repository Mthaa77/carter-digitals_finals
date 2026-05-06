import type { Metadata } from 'next'
import PricingPageClient from './pricing-client'

export const metadata: Metadata = {
  title: 'Pricing | Carter Digitals — Transparent Digital Services Pricing',
  description:
    'Transparent pricing for websites, web apps, and digital services. No hidden fees. Small business packages from R3,999 and school website packages from R4,999.',
  openGraph: {
    title: 'Pricing | Carter Digitals',
    description:
      'Transparent pricing for websites, web apps, and digital services. No hidden fees. From R3,999.',
  },
}

export default function PricingPage() {
  return <PricingPageClient />
}
