'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  // Motion values for smooth cursor following
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring configuration for smooth following
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  // Check if device supports cursor (not touch-only)
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      const isWideEnough = window.innerWidth >= 768
      setIsEnabled(!isTouchDevice && isWideEnough)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    },
    [cursorX, cursorY, isVisible]
  )

  // Hover detection for interactive elements
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const interactiveSelector = 'a, button, [data-cursor-hover], input, textarea, select, [role="button"]'
    if (target.closest(interactiveSelector)) {
      setIsHovering(true)
    }
  }, [])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const interactiveSelector = 'a, button, [data-cursor-hover], input, textarea, select, [role="button"]'
    if (target.closest(interactiveSelector)) {
      setIsHovering(false)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isEnabled, handleMouseMove, handleMouseOver, handleMouseOut])

  // Hide default cursor when custom cursor is active
  useEffect(() => {
    if (!isEnabled) return

    const style = document.createElement('style')
    style.textContent = `* { cursor: none !important; }`
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [isEnabled])

  // Don't render on touch/narrow devices
  if (!isEnabled) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 40 : 10,
            height: isHovering ? 40 : 10,
            borderRadius: isHovering ? '50%' : '50%',
            borderWidth: isHovering ? 2 : 0,
            borderStyle: 'solid',
            borderColor: isHovering ? '#C9A84C' : 'rgba(201,168,76,0)',
            backgroundColor: isHovering ? 'rgba(201,168,76,0)' : '#C9A84C',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            // Ensure transform origin is center for scaling
            originX: 0.5,
            originY: 0.5,
          }}
        />
      </motion.div>

      {/* Visible only when cursor is in viewport */}
      {!isVisible && isEnabled && (
        <style>{`
          @media (pointer: fine) and (min-width: 768px) {
            * { cursor: none !important; }
          }
        `}</style>
      )}
    </>
  )
}
