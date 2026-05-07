import type { Metadata } from 'next'
import ToolsPageClient from './tools-client'

export const metadata: Metadata = {
  title: 'Free Tools — Carter Digitals | Premium Digital Services',
  description:
    'Free premium tools for South African businesses. Website Cost Calculator, ROI Calculator, B-BBEE Score Estimator, SEO Audit, and Project Estimator — no signup, no email, instant results.',
  openGraph: {
    title: 'Free Tools — Carter Digitals',
    description:
      'Free premium tools for South African businesses. No signup, no email, instant results.',
  },
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
