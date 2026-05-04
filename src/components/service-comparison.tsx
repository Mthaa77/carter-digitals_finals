'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, X, Minus } from 'lucide-react'

type FeatureValue = 'yes' | 'no' | 'partial'

interface Feature {
  name: string
  websites: FeatureValue
  webApps: FeatureValue
  internalTools: FeatureValue
}

const features: Feature[] = [
  { name: 'Custom Design', websites: 'yes', webApps: 'yes', internalTools: 'partial' },
  { name: 'Mobile Responsive', websites: 'yes', webApps: 'yes', internalTools: 'yes' },
  { name: 'SEO Optimized', websites: 'yes', webApps: 'no', internalTools: 'no' },
  { name: 'Analytics Dashboard', websites: 'no', webApps: 'yes', internalTools: 'yes' },
  { name: 'CMS Access', websites: 'yes', webApps: 'yes', internalTools: 'yes' },
  { name: 'Performance Monitoring', websites: 'no', webApps: 'yes', internalTools: 'yes' },
  { name: 'E-commerce Ready', websites: 'partial', webApps: 'yes', internalTools: 'no' },
  { name: 'Priority Support', websites: 'no', webApps: 'yes', internalTools: 'yes' },
]

const services = [
  { key: 'websites' as const, name: 'Website Development', color: '#C9A84C' },
  { key: 'webApps' as const, name: 'Web Applications', color: '#E8CA7A' },
  { key: 'internalTools' as const, name: 'Internal Tools', color: '#7A6330' },
]

function FeatureIcon({ value }: { value: FeatureValue }) {
  switch (value) {
    case 'yes':
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(201,168,76,0.1)]">
          <Check size={14} className="text-[#C9A84C]" strokeWidth={3} />
        </span>
      )
    case 'partial':
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(122,99,48,0.1)]">
          <Minus size={14} className="text-[#7A6330]" strokeWidth={3} />
        </span>
      )
    case 'no':
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full">
          <X size={14} className="text-[#9A9A92]" strokeWidth={2} />
        </span>
      )
  }
}

export default function ServiceComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="compare" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="section-label inline-block">Compare</span>
          <h2 className="section-heading text-[var(--text-h2)] tracking-tight">
            Compare Our Digital Services
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
          <p className="mt-4 text-[#C8C8C0] text-base max-w-xl mx-auto font-sans">
            Find the right package for your business needs
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden max-w-full"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto max-w-full">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#242424]">
                  <th className="text-left py-5 px-6 text-[#C8C8C0] text-sm font-sans font-medium">
                    Feature
                  </th>
                  {services.map((service) => (
                    <th
                      key={service.key}
                      className="text-center py-5 px-6 font-display font-semibold text-base w-[160px]"
                      style={{ color: service.color }}
                    >
                      {service.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-[#242424]/50 ${
                      i % 2 === 0 ? 'bg-[rgba(255,255,255,0.01)]' : ''
                    }`}
                  >
                    <td className="py-5 px-6 text-[#F0EFE8] text-sm font-sans">
                      {feature.name}
                    </td>
                    {services.map((service) => (
                      <td
                        key={service.key}
                        className="py-5 px-6 text-center w-[160px]"
                      >
                        <div className="flex justify-center">
                          <FeatureIcon
                            value={feature[service.key]}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {services.map((service) => (
              <div
                key={service.key}
                className="border-b border-[#242424]/50 last:border-b-0 p-6"
              >
                <h3
                  className="font-display font-semibold text-base mb-4"
                  style={{ color: service.color }}
                >
                  {service.name}
                </h3>
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[#F0EFE8] text-sm font-sans">
                        {feature.name}
                      </span>
                      <FeatureIcon value={feature[service.key]} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
