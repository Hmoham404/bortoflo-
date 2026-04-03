import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if ('ontouchstart' in window) return

    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true))
      el.addEventListener('mouseleave', () => setIsHovering(false))
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  // Trail with delay using requestAnimationFrame
  useEffect(() => {
    let rafId
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      setTrailPosition(prev => ({
        x: lerp(prev.x, position.x, 0.12),
        y: lerp(prev.y, position.y, 0.12),
      }))
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [position])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 z-[9999] pointer-events-none mix-blend-screen"
        style={{
          translateX: position.x - 6,
          translateY: position.y - 6,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border z-[9998] pointer-events-none"
        style={{
          translateX: trailPosition.x - (isHovering ? 20 : 16),
          translateY: trailPosition.y - (isHovering ? 20 : 16),
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          borderColor: isHovering ? 'rgba(0, 245, 255, 0.8)' : 'rgba(0, 245, 255, 0.4)',
          boxShadow: isHovering
            ? '0 0 12px rgba(0,245,255,0.6), inset 0 0 12px rgba(0,245,255,0.1)'
            : '0 0 6px rgba(0,245,255,0.3)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  )
}
