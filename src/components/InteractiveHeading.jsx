import React, { useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

/**
 * InteractiveHeading
 * Wraps text so each letter reacts dynamically to hover/cursor physics with an elastic bounce.
 * Completely preserves the heading's font, theme, color, and accessibility tags.
 */
export default function InteractiveHeading({
  children,
  className = '',
  as: Component = 'span',
  hoverColor = null
}) {
  const containerRef = useRef(null)

  const handleMouseEnterLetter = (e) => {
    const el = e.currentTarget
    gsap.killTweensOf(el)

    // Physics bounce jump with slight tilt
    const randomTilt = (Math.random() - 0.5) * 16

    gsap.timeline()
      .to(el, {
        y: -9,
        rotation: randomTilt,
        duration: 0.16,
        ease: 'power2.out'
      })
      .to(el, {
        y: 0,
        rotation: 0,
        duration: 0.55,
        ease: 'elastic.out(1.2, 0.35)'
      })
  }

  // If children is a simple string, split into interactive character spans
  if (typeof children === 'string') {
    return (
      <Component ref={containerRef} className={`inline-block ${className}`}>
        {children.split('').map((char, index) => {
          if (char === ' ') {
            return <span key={index}>&nbsp;</span>
          }
          return (
            <span
              key={index}
              onMouseEnter={handleMouseEnterLetter}
              className="inline-block will-change-transform transition-colors cursor-default select-none"
            >
              {char}
            </span>
          )
        })}
      </Component>
    )
  }

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  )
}
