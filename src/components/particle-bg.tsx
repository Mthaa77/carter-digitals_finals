'use client'

import { useEffect } from 'react'

// Deterministic pseudo-random number generator (same on server & client)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

// Round to 4 decimal places to ensure server/client string consistency
function r4(n: number): number {
  return Math.round(n * 10000) / 10000
}

const PARTICLE_COUNT = 35

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const size = r4(2 + seededRandom(i * 3 + 1) * 2)
  return {
    id: i,
    left: `${r4(seededRandom(i * 3 + 2) * 100)}%`,
    size,
    opacity: r4(0.1 + seededRandom(i * 3 + 3) * 0.2),
    duration: r4(15 + seededRandom(i * 3 + 4) * 25),
    delay: r4(seededRandom(i * 3 + 5) * 20),
  }
})

export default function ParticleBg() {
  useEffect(() => {
    const id = 'cd-particle-rise-keyframes'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = `
        @keyframes cd-particle-rise {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: var(--particle-opacity);
          }
          90% {
            opacity: var(--particle-opacity);
          }
          100% {
            transform: translateY(-10vh) translateX(20px);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden md:block" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#C9A84C]"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--particle-opacity': p.opacity,
            opacity: 0,
            animation: `cd-particle-rise ${p.duration}s ${p.delay}s linear infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
