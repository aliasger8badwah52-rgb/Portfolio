import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '../hooks/useGSAP'
import { Sparkles } from 'lucide-react'

/**
 * NameLetterRescue
 *
 * Choreographed Hero Name Animation:
 * 1. The letters of "Aliasgar" drop from the top to their original place.
 * 2. Letter "r" fails to stop and over-falls towards the bottom.
 * 3. Letter "a" (immediately previous to "r") looks over the ledge.
 * 4. An arm and grasping hand reaches down from letter "a" to grab letter "r".
 * 5. Letter "a" pulls letter "r" all the way back up into its original place!
 * 6. Letter "r" snaps home with an elastic bounce and sparkles.
 */
export default function NameLetterRescue({
  name = 'Aliasgar',
  preloaderDone = false
}) {
  const containerRef = useRef(null)
  const letterRefs = useRef([])
  const armPathRef = useRef(null)
  const armInnerRef = useRef(null)
  const handGroupRef = useRef(null)
  const rescueGroupRef = useRef(null)
  const sparkleRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const [, setIsRescued] = useState(false)

  // Split name into array of characters
  const chars = name.split('')

  // Identify letter 'r' (the last letter) and the letter 'a' immediately previous to it
  const indexR = chars.map((c) => c.toLowerCase()).lastIndexOf('r') >= 0
    ? chars.map((c) => c.toLowerCase()).lastIndexOf('r')
    : chars.length - 1

  // Letter immediately previous to 'r'
  const indexPrevA = Math.max(0, indexR - 1)

  // Dynamically update arm path and hand position & rotation on every frame
  const updateArmAndHand = useCallback(() => {
    if (!containerRef.current || !armPathRef.current || !handGroupRef.current) return
    const elPrevA = letterRefs.current[indexPrevA]
    const elR = letterRefs.current[indexR]
    if (!elPrevA || !elR) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const aRect = elPrevA.getBoundingClientRect()
    const rRect = elR.getBoundingClientRect()

    // Shoulder anchor point on right edge of previous letter 'a'
    const x1 = aRect.right - containerRect.left - 2
    const y1 = aRect.top - containerRect.top + aRect.height * 0.42

    // Target anchor point at top center of falling letter 'r'
    const x2 = rRect.left - containerRect.left + rRect.width * 0.5
    const y2 = rRect.top - containerRect.top + 2

    // Vector calculations for angle and curvature
    const dx = x2 - x1
    const dy = y2 - y1
    const dist = Math.sqrt(dx * dx + dy * dy)
    const angleRad = Math.atan2(dy, dx)
    const angleDeg = angleRad * (180 / Math.PI)

    // Gentle natural arm curve
    const sag = dist > 40 ? 12 : 2
    const midX = (x1 + x2) / 2 + (dx < 0 ? -sag : sag) * 0.5
    const midY = (y1 + y2) / 2 + sag

    // Update arm SVG curve
    const pathData = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`
    armPathRef.current.setAttribute('d', pathData)
    if (armInnerRef.current) {
      armInnerRef.current.setAttribute('d', pathData)
    }

    // Orient and translate hand at the end of the arm
    handGroupRef.current.setAttribute(
      'transform',
      `translate(${x2}, ${y2}) rotate(${angleDeg - 90})`
    )
  }, [indexPrevA, indexR])

  const playDropAndRescue = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setIsRescued(false)

    const elPrevA = letterRefs.current[indexPrevA]
    const elR = letterRefs.current[indexR]
    const rescueGroup = rescueGroupRef.current
    const sparkle = sparkleRef.current

    if (!elPrevA || !elR || !rescueGroup) {
      isAnimatingRef.current = false
      return
    }

    const tickerCallback = () => updateArmAndHand()
    gsap.ticker.add(tickerCallback)

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.ticker.remove(tickerCallback)
        isAnimatingRef.current = false
        setIsRescued(true)
      }
    })

    // Reset arm, hand, and sparkle visibility
    gsap.set(rescueGroup, { opacity: 0 })
    gsap.set(sparkle, { opacity: 0, scale: 0 })

    // Step 1: All letters drop from the top into their original place
    chars.forEach((_, i) => {
      const el = letterRefs.current[i]
      if (!el) return
      gsap.set(el, { y: -120, opacity: 0, rotation: (Math.random() - 0.5) * 14 })
    })

    // Staggered drop for all letters
    chars.forEach((_, i) => {
      const el = letterRefs.current[i]
      if (!el || i === indexR) return

      tl.to(
        el,
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.8)'
        },
        i * 0.04
      )
    })

    // Step 2: Letter 'r' drops with them, but over-falls past the baseline!
    tl.to(
      elR,
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.48,
        ease: 'power2.in'
      },
      indexR * 0.04
    )

    // Letter 'r' over-falls toward the bottom of the screen!
    tl.to(
      elR,
      {
        y: 200,
        rotation: 65,
        duration: 0.55,
        ease: 'power2.in',
        transformOrigin: 'top center'
      },
      '-=0.06'
    )

    // Step 3: Letter 'a' (previous to 'r') looks down over the ledge!
    tl.to(
      elPrevA,
      {
        rotation: 18,
        y: 4,
        duration: 0.24,
        ease: 'power2.out',
        transformOrigin: 'bottom left'
      },
      '-=0.18'
    )

    // Arm and grasping hand shoot out from letter 'a' down to 'r'
    tl.to(
      rescueGroup,
      {
        opacity: 1,
        duration: 0.1
      },
      '-=0.08'
    )

    // Hand grabs letter 'r'; letter 'a' absorbs the tug strain
    tl.to(
      elPrevA,
      {
        rotation: -8,
        y: 6,
        duration: 0.18,
        ease: 'power2.out'
      },
      '-=0.04'
    )

    // Letter 'r' dangles and swings in the hand's grip
    tl.to(
      elR,
      {
        y: 188,
        rotation: 26,
        duration: 0.28,
        ease: 'sine.out'
      },
      '-=0.06'
    )

    tl.to(elR, {
      y: 194,
      rotation: -14,
      duration: 0.22,
      ease: 'sine.inOut'
    })

    // Step 4: Letter 'a' braces and pulls letter 'r' upward!
    tl.to(elPrevA, {
      y: -8,
      rotation: -14,
      duration: 0.35,
      ease: 'power2.out'
    })

    // Letter 'r' is hauled straight back up to its place next to 'a'!
    tl.to(
      elR,
      {
        y: 0,
        rotation: 0,
        duration: 0.62,
        ease: 'back.out(2.4)'
      },
      '-=0.25'
    )

    // Letter 'a' settles back to upright pose with an elastic nod
    tl.to(
      elPrevA,
      {
        y: 0,
        rotation: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.4)'
      },
      '-=0.35'
    )

    // Arm and hand smoothly release and retract
    tl.to(
      rescueGroup,
      {
        opacity: 0,
        duration: 0.18
      },
      '-=0.22'
    )

    // Step 5: Sparkle burst on successful rescue!
    tl.fromTo(
      sparkle,
      { opacity: 0, scale: 0.2, rotate: -45 },
      { opacity: 1, scale: 1.25, rotate: 45, duration: 0.3, ease: 'back.out(2)' },
      '-=0.12'
    )

    tl.to(sparkle, { opacity: 0, scale: 0.4, duration: 0.35, delay: 0.3 })
  }, [chars, indexPrevA, indexR, updateArmAndHand])

  // Play on initial entrance
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      playDropAndRescue()
    }, preloaderDone ? 200 : 1200)

    return () => clearTimeout(delayTimer)
  }, [preloaderDone, playDropAndRescue])

  return (
    <span
      ref={containerRef}
      onClick={playDropAndRescue}
      title="Click to replay letter drop & hand rescue!"
      className="inline-block relative overflow-visible cursor-pointer select-none align-baseline group"
    >
      {/* SVG Layer for Arm & grasping Hand from previous 'a' to 'r' */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible w-full h-full z-40"
        aria-hidden="true"
      >
        <defs>
          {/* Warm arm gradient matching portfolio aesthetic */}
          <linearGradient id="armSkinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <filter id="armGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Group containing Arm and Hand */}
        <g ref={rescueGroupRef} style={{ opacity: 0 }}>
          {/* Main arm limb */}
          <path
            ref={armPathRef}
            d="M 0 0"
            fill="none"
            stroke="url(#armSkinGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
            filter="url(#armGlow)"
          />

          {/* Inner arm highlight for tactile 3D feel */}
          <path
            ref={armInnerRef}
            d="M 0 0"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Hand at the tip of the arm */}
          <g ref={handGroupRef} transform="translate(0, 0)">
            {/* Wrist band / cuff */}
            <rect
              x="-5.5"
              y="-10"
              width="11"
              height="4"
              rx="2"
              fill="#d97706"
              stroke="#fbbf24"
              strokeWidth="0.8"
            />

            {/* Palm */}
            <path
              d="M -6 -7 C -6 -2, -5 2, -3 5 C -1 7, 2 7, 4 5 C 6 2, 7 -2, 7 -7 Z"
              fill="url(#armSkinGradient)"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />

            {/* Four grasping fingers curving around letter 'r' */}
            <path
              d="M -5 2 C -7 5, -6 9, -3 10 C -1 10, -2 6, -3 3"
              fill="url(#armSkinGradient)"
              stroke="#d97706"
              strokeWidth="0.8"
            />
            <path
              d="M -2.5 4 C -3.5 8, -2 12, 1 12 C 2.5 12, 1 8, 0 4"
              fill="url(#armSkinGradient)"
              stroke="#d97706"
              strokeWidth="0.8"
            />
            <path
              d="M 0.5 4 C 0 8, 1.5 12, 4.5 11 C 6 10, 4.5 7, 3 4"
              fill="url(#armSkinGradient)"
              stroke="#d97706"
              strokeWidth="0.8"
            />
            <path
              d="M 3.5 2 C 5 5, 6 8, 8 7 C 9 6, 7.5 4, 6 2"
              fill="url(#armSkinGradient)"
              stroke="#d97706"
              strokeWidth="0.8"
            />
          </g>
        </g>
      </svg>

      {/* Render each letter */}
      <span className="inline-flex relative z-10">
        {chars.map((char, index) => {
          const isPrevA = index === indexPrevA
          const isR = index === indexR

          return (
            <span
              key={index}
              ref={(el) => (letterRefs.current[index] = el)}
              className="text-gradient inline-block will-change-transform font-heading font-bold"
              style={{
                transformOrigin: isPrevA ? 'bottom left' : isR ? 'top center' : 'center bottom',
                display: 'inline-block'
              }}
            >
              {char}
            </span>
          )
        })}
      </span>

      {/* Sparkle burst at letter 'r' slot upon successful rescue */}
      <span
        ref={sparkleRef}
        className="absolute -top-3 right-0 pointer-events-none text-amber-300 z-50"
        style={{ opacity: 0 }}
      >
        <Sparkles className="w-5 h-5 fill-amber-300" />
      </span>
    </span>
  )
}
