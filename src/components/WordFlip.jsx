import React, { useState, useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

/**
 * WordFlip - Ultra-smooth 3D flipping word changer for headings.
 * Features:
 * - Matched word widths with smooth width tweening
 * - Butter-smooth 3D perspective rotation (rotateX) with damped easing
 * - Pixel-perfect baseline lock with surrounding static text
 *
 * @param {string[]} words - Array of words or phrases to rotate through
 * @param {number} interval - Duration in ms before flipping (default: 3400ms)
 * @param {string} className - Styling classes (e.g. text-gradient font-bold)
 * @param {boolean} interactive - Whether clicking advances to next word
 */
export default function WordFlip({
  words = ['Make an Impact.', 'Drive Progress.', 'Inspire Action.', 'Elevate Brands.'],
  interval = 3400,
  className = 'text-gradient font-bold',
  interactive = true
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentRef = useRef(null)
  const nextRef = useRef(null)
  const containerRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const timerRef = useRef(null)

  const flipToNext = () => {
    if (isAnimatingRef.current || !currentRef.current || !nextRef.current || !containerRef.current) return
    isAnimatingRef.current = true
    setIsTransitioning(true)

    const targetIndex = (currentIndex + 1) % words.length
    setNextIndex(targetIndex)

    const currentEl = currentRef.current
    const nextEl = nextRef.current
    const container = containerRef.current

    // Measure target width to smoothly tween width if slight variance exists
    const currentW = currentEl.offsetWidth
    gsap.set(nextEl, { opacity: 0, visibility: 'hidden' })
    const nextW = nextEl.offsetWidth
    gsap.set(container, { width: currentW })

    // Set initial 3D pose for incoming word
    gsap.set(nextEl, {
      rotateX: 75,
      yPercent: 55,
      opacity: 0,
      visibility: 'visible',
      transformOrigin: '50% 100%'
    })

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        setCurrentIndex(targetIndex)
        gsap.set(currentEl, { rotateX: 0, yPercent: 0, opacity: 1 })
        gsap.set(container, { width: 'auto' })
        setIsTransitioning(false)
        isAnimatingRef.current = false
      }
    })

    // Smoothly morph container width to next word width
    if (Math.abs(currentW - nextW) > 1) {
      tl.to(container, { width: nextW, duration: 0.55, ease: 'power2.inOut' }, 0)
    }

    // Outgoing word rolls upward and fades out
    tl.to(
      currentEl,
      {
        rotateX: -75,
        yPercent: -55,
        opacity: 0,
        duration: 0.52,
        ease: 'power2.in',
        transformOrigin: '50% 0%'
      },
      0
    )

    // Incoming word rolls in with a gentle, smooth settling ease
    tl.to(
      nextEl,
      {
        rotateX: 0,
        yPercent: 0,
        opacity: 1,
        duration: 0.58,
        ease: 'power2.out',
        transformOrigin: '50% 100%'
      },
      0.18
    )
  }

  
  useEffect(() => {
    timerRef.current = setInterval(() => {
      flipToNext()
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIndex, interval])

  const handleClick = (e) => {
    e.stopPropagation()
    if (!interactive) return
    if (timerRef.current) clearInterval(timerRef.current)
    flipToNext()
    timerRef.current = setInterval(() => {
      flipToNext()
    }, interval)
  }

  return (
    <span
      ref={containerRef}
      onClick={handleClick}
      title={interactive ? 'Click to flip word' : undefined}
      className="inline-grid relative align-baseline cursor-pointer select-none will-change-[width]"
      style={{
        perspective: '800px',
        verticalAlign: 'baseline',
        gridTemplateAreas: "'stack'",
        lineHeight: 'inherit'
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e)
        }
      }}
    >
      {/* Current Active Word */}
      <span
        ref={currentRef}
        className={`inline-block will-change-transform whitespace-nowrap ${className}`}
        style={{
          gridArea: 'stack',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          lineHeight: 'inherit'
        }}
      >
        {words[currentIndex]}
      </span>

      {/* Incoming Word (Shown during 3D flip) */}
      <span
        ref={nextRef}
        className={`inline-block will-change-transform pointer-events-none whitespace-nowrap ${className}`}
        style={{
          gridArea: 'stack',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          lineHeight: 'inherit',
          opacity: isTransitioning ? 1 : 0
        }}
        aria-hidden="true"
      >
        {words[nextIndex]}
      </span>
    </span>
  )
}