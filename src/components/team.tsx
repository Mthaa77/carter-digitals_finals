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
  { icon: Shield, label: 'B-BBEE', value: 'Level 1' },
  { icon: CheckCircle, label: 'SCORE', value: '135%' },
  { icon: Zap, label: 'DELIVERY', value: '5–7 Days' },
  { icon: Calendar, label: 'FOUNDED', value: '2023' },
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
    <section id="team" className="relative py-20 md:py-28 bg-cd-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-display text-cd-text font-bold tracking-tight" style={{ fontSize: 'var(--text-h2)' }}>
            The Person Behind <span className="text-cd-gold">The Work</span>
          </h2>
          {/* Gold accent line */}
          <div className="mt-4 mx-auto w-20 h-1 bg-cd-gold rounded-full" />
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
              className="glass-card glass-card-hover rounded-xl p-8 sm:p-10 flex flex-col items-center text-center group cursor-default"
            >
              {/* Avatar circle with gold gradient */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-cd-gold to-cd-gold-dim shadow-lg shadow-cd-gold/15">
                <span className="font-display text-2xl font-bold text-cd-bg">
                  {member.initials}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-cd-text mb-1">
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

        {/* Founder Stats Row */}
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
                className="glass-card rounded-lg px-5 py-3 flex items-center gap-3 transition-[border-color,box-shadow] duration-300 hover:border-cd-gold/30 hover:shadow-[0_0_12px_rgba(201,168,76,0.08)]"
              >
                <Icon className="w-4 h-4 text-cd-gold shrink-0" />
                <div className="flex items-center gap-2">
                  <span className="text-[#C8C8C0] text-xs font-mono uppercase tracking-wider">{stat.label}</span>
                  <span className="text-cd-gold font-display text-sm font-bold">{stat.value}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
