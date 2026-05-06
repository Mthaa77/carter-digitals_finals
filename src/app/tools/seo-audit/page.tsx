import type { Metadata } from 'next'
import SEOAuditClient from './seo-audit-client'

export const metadata: Metadata = {
  title: 'Free SEO Audit Tool | Carter Digitals — Check Your Website SEO Score',
  description:
    'Get a free SEO health check for your website. See your score across Performance, Mobile-Friendly, SEO Basics, Content Quality, and Technical SEO. No signup needed.',
  openGraph: {
    title: 'Free SEO Audit Tool | Carter Digitals',
    description:
      'Free instant SEO health check. See your score, get actionable tips. No signup required.',
  },
}

export default function SEOAuditPage() {
  return <SEOAuditClient />
}
