import type { Metadata } from 'next'
import WebsiteCostCalculatorClient from './website-cost-calculator-client'

export const metadata: Metadata = {
  title: 'Website Cost Calculator | Carter Digitals — Free Instant Estimate',
  description:
    'Estimate your website cost instantly. Choose pages, features, and timeline to get a transparent price range. No email required — just honest numbers from Carter Digitals.',
  openGraph: {
    title: 'Website Cost Calculator | Carter Digitals',
    description:
      'Free instant website cost estimate. No email, no signup — just honest numbers.',
  },
}

export default function WebsiteCostCalculatorPage() {
  return <WebsiteCostCalculatorClient />
}
