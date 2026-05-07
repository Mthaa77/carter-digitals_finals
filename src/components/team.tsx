'use client'

import { motion } from 'framer-motion'
import { Shield, CheckCircle, Zap, Calendar } from 'lucide-react'

interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
}

const members: TeamMember[] = [
  {
    initials: 'KK',
    name: 'Kabelo Kadiaka',
    role: 'Founder & Director',
    bio: 'AI-Augmented. Human-Driven. Built to Deliver. Full-stack web development, enterprise cloud architecture on GCP, and AI-augmented systems engineering — enterprise-grade output at startup speed.',
  },
]

const founderStats = [
  { icon: Shield, label: 'B-BBEE', value: 'Level 1', accent: '#34D399', accentBg: 'rgba(52,211,153,0.08)', accentBorder: 'rgba(52,211,153,0.2)' },
  { icon: CheckCircle, label: 'SCORE', value: '135%', accent: '#C9A84C', accentBg: 'rgba(201,168,76,0.08)', accentBorder: 'rgba(201,168,76,0.2)' },
  { icon: Zap, label: 'DELIVERY', value: '5–7 Days', accent: '#22D3EE', accentBg: 'rgba(34,211,238,0.08)', accentBorder: 'rgba(34,211,238,0.2)' },
  { icon: Calendar, label: 'FOUNDED', value: '2023', accent: '#A78BFA', accentBg: 'rgba(167,139,250,0.08)', accentBorder: 'rgba(167,139,250,0.2)' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function Team() {
  return (
    <section id="team" className="relative py-20 md:py-28 bg-cd-bg overflow-hidden">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(167,139,250,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-display text-cd-text font-bold tracking-tight heading-shadow-lg" style={{ fontSize: 'var(--text-h2)' }}>
            The Person Behind <span className="text-cd-gold">The Work</span>
          </h2>
          {/* Multi-color gradient accent line */}
          <div
            className="mt-4 mx-auto w-24 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE)' }}
          />
          <p className="mt-6 text-[#C8C8C0] text-lg font-sans max-w-2xl mx-auto">
            AI-Augmented. Human-Driven. Built to Deliver.
          </p>
        </motion.div>

        {/* Single founder card — centered and larger */}
        <div className="max-w-xl mx-auto">
          {members.map((member, i) => (
            <motion.div
              key={member.initials}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="glass-card glass-card-hover rounded-xl p-8 sm:p-10 flex flex-col items-center text-center group cursor-default relative overflow-hidden"
            >
              {/* Gradient top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #34D399, #22D3EE, #A78BFA)' }}
              />

              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 pointer-events-none shimmer-sweep" />

              {/* Avatar circle with gradient */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #34D399)',
                  boxShadow: '0 8px 32px rgba(201,168,76,0.15), 0 0 40px rgba(52,211,153,0.08)',
                }}
              >
                <span className="font-display text-2xl font-bold text-cd-bg">
                  {member.initials}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-cd-text mb-1 group-hover:text-cd-gold transition-colors duration-300">
                {member.name}
              </h3>

              {/* Role */}
              <p className="font-mono text-sm text-cd-gold mb-5">
                {member.role}
              </p>

              {/* Bio */}
              <p className="text-[#C8C8C0] text-base leading-relaxed mb-0">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Founder Stats Row — color-coded */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {founderStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-lg px-5 py-3 flex items-center gap-3 transition-all duration-300 border cursor-default"
                style={{
                  background: stat.accentBg,
                  borderColor: stat.accentBorder,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${stat.accent}15, 0 0 40px ${stat.accent}06`
                  e.currentTarget.style.borderColor = `${stat.accent}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderColor = stat.accentBorder
                }}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: stat.accent }} />
                <div className="flex items-center gap-2">
                  <span className="text-cd-text-dim text-xs font-mono uppercase tracking-wider">{stat.label}</span>
                  <span className="font-display text-sm font-bold" style={{ color: stat.accent }}>{stat.value}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
