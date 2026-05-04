'use client'

import { useMemo } from 'react'

export default function ParticleBg() {
  const particles = useMemo(() => {
    const count = 35
    return Array.from({ length: count }, (_, i) => {
      const size = 2 + Math.random() * 2
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size,
        opacity: 0.1 + Math.random() * 0.2,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 20,
      }
    })
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
      <style>{`
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
      `}</style>
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
