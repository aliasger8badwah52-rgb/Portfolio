import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../hooks/useGSAP'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows cursor immediately
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.05,
        ease: 'none'
      })

      // Ring trails with smooth fluid damping
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.28,
        ease: 'power2.out'
      })
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    // Contextual hover listeners
    const handleMouseOver = (e) => {
      const target = e.target

      // Check if hovering over project card
      const projectCard = target.closest('.project-card')
      if (projectCard) {
        setIsHovered(true)
        setCursorText('VIEW ↗')
        return
      }

      // Check if hovering over interactive buttons / links
      const interactive = target.closest('a, button, [role="button"]')
      if (interactive) {
        setIsHovered(true)
        setCursorText('')
        return
      }

      setIsHovered(false)
      setCursorText('')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white will-change-transform z-10"
      />

      {/* Trailing fluid magnetic ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 backdrop-blur-[1px] will-change-transform flex items-center justify-center transition-all duration-200 ${cursorText
            ? 'w-16 h-16 bg-white/10 border-white/40 scale-100'
            : isHovered
              ? 'w-11 h-11 bg-white/10 border-white/50 scale-105'
              : isClicking
                ? 'w-6 h-6 border-white/60 bg-white/20'
                : 'w-8 h-8 bg-transparent'
          }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-white select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
