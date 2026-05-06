import type { Metadata } from 'next'
import ProjectEstimatorClient from './project-estimator-client'

export const metadata: Metadata = {
  title: 'Project Estimator | Carter Digitals — Instant Project Estimate',
  description:
    'Get an instant project estimate. Select your service type, choose features, and see a price range — no commitment needed. Free tool by Carter Digitals.',
  openGraph: {
    title: 'Project Estimator | Carter Digitals',
    description:
      'Instant project estimates. Select a service, pick features, see the price. Free and easy.',
  },
}

export default function ProjectEstimatorPage() {
  return <ProjectEstimatorClient />
}
