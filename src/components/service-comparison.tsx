'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, X, Minus } from 'lucide-react'

type FeatureValue = 'yes' | 'no' | 'partial'

interface Feature {
  name: string
  sme: FeatureValue
  dashboards: FeatureValue
  seo: FeatureValue
}

const features: Feature[] = [
  { name: 'Custom Design', sme: 'yes', dashboards: 'yes', seo: 'partial' },
  { name: 'Mobile Responsive', sme: 'yes', dashboards: 'yes', seo: 'yes' },
  { name: 'SEO Optimized', sme: 'yes', dashboards: 'no', seo: 'yes' },
  { name: 'Analytics Dashboard', sme: 'no', dashboards: 'yes', seo: 'yes' },
  { name: 'CMS Access', sme: 'yes', dashboards: 'yes', seo: 'no' },
  { name: 'Performance Monitoring', sme: 'no', dashboards: 'yes', seo: 'yes' },
  { name: 'E-commerce Ready', sme: 'partial', dashboards: 'no', seo: 'no' },
  { name: 'Priority Support', sme: 'no', dashboards: 'yes', seo: 'yes' },
]

const services = [
  { key: 'sme' as const, name: 'SME Websites', color: '#C9A84C' },
  { key: 'dashboards' as const, name: 'Dashboards', color: '#E8CA7A' },
  { key: 'seo' as const, name: 'SEO & Growth', color: '#7A6330' },
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
          <X size={14} className="text-[#8A8A82]" strokeWidth={2} />
        </span>
      )
  }
}

export default function ServiceComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="compare" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2 className="font-display text-[var(--text-h2)] font-semibold text-[#F0EFE8] tracking-tight">
            Compare Our Services
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-gradient-to-r from-[#7A6330] via-[#C9A84C] to-[#E8CA7A] rounded-full" />
          <p className="mt-4 text-[#B8B8B0] text-base max-w-xl mx-auto font-sans">
            Find the right package for your business needs
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#242424]">
                  <th className="text-left py-5 px-6 text-[#B8B8B0] text-sm font-sans font-medium">
                    Feature
                  </th>
                  {services.map((service) => (
                    <th
                      key={service.key}
                      className="text-center py-5 px-6 font-display font-semibold text-base"
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
                    <td className="py-4 px-6 text-[#F0EFE8] text-sm font-sans">
                      {feature.name}
                    </td>
                    {services.map((service) => (
                      <td
                        key={service.key}
                        className="py-4 px-6 text-center"
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
