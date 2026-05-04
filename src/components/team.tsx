'use client'

import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'

interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
}

const members: TeamMember[] = [
  {
    initials: 'TM',
    name: 'Thabo Molefe',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer with a passion for building tools that help SA SMEs compete digitally.',
  },
  {
    initials: 'LR',
    name: 'Lerato Radebe',
    role: 'UI/UX Designer',
    bio: 'Designs interfaces that are beautiful, accessible, and rooted in the South African user experience.',
  },
  {
    initials: 'DK',
    name: 'Dineo Khumalo',
    role: 'Business Strategist',
    bio: 'Helps businesses align their digital presence with growth goals and B-BBEE compliance.',
  },
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
            The People Behind <span className="text-cd-gold">Carter Digitals</span>
          </h2>
          {/* Gold accent line */}
          <div className="mt-4 mx-auto w-20 h-1 bg-cd-gold rounded-full" />
          <p className="mt-6 text-[#C8C8C0] text-lg font-sans max-w-2xl mx-auto">
            Small team. Big results. 100% South African.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.initials}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="glass-card glass-card-hover rounded-xl p-6 sm:p-8 flex flex-col items-center text-center group cursor-default"
            >
              {/* Avatar circle with gold gradient */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-gradient-to-br from-cd-gold to-cd-gold-dim shadow-lg shadow-cd-gold/15">
                <span className="font-display text-xl font-bold text-cd-bg">
                  {member.initials}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-lg font-semibold text-cd-text mb-1">
                {member.name}
              </h3>

              {/* Role */}
              <p className="font-mono text-sm text-cd-gold mb-4">
                {member.role}
              </p>

              {/* Bio */}
              <p className="text-[#C8C8C0] text-sm leading-relaxed line-clamp-2 mb-5">
                {member.bio}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-auto">
                <span
                  className="w-9 h-9 rounded-full border border-cd-border flex items-center justify-center text-[#9A9A92] hover:text-cd-gold hover:border-cd-gold/40 transition-colors duration-300 cursor-pointer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
