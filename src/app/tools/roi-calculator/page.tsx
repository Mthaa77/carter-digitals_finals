import type { Metadata } from 'next'
import ROICalculatorClient from './roi-calculator-client'

export const metadata: Metadata = {
  title: 'ROI Calculator | Carter Digitals — See Your Return on Investment',
  description:
    'Calculate the return on investment of a professional website. Enter your revenue and expected traffic increase to see how a website pays for itself. Free tool by Carter Digitals.',
  openGraph: {
    title: 'ROI Calculator | Carter Digitals',
    description:
      'See how a professional website pays for itself. Free ROI calculator — no signup needed.',
  },
}

export default function ROICalculatorPage() {
  return <ROICalculatorClient />
}
