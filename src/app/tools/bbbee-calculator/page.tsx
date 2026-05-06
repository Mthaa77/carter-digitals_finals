import type { Metadata } from 'next'
import BBBEECalculatorClient from './bbbee-calculator-client'

export const metadata: Metadata = {
  title: 'B-BBEE Score Estimator | Carter Digitals — 135% Procurement Recognition',
  description:
    "South Africa's only B-BBEE supplier score estimator. Calculate your qualifying spend when procuring from a Level 1, 100% Black-Owned supplier. Free tool by Carter Digitals.",
  openGraph: {
    title: 'B-BBEE Score Estimator | Carter Digitals',
    description:
      'See what your spend qualifies for. 135% B-BBEE procurement recognition from a Level 1 supplier.',
  },
}

export default function BBBEECalculatorPage() {
  return <BBBEECalculatorClient />
}
