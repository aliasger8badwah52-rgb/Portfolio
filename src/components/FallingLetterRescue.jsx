import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '../hooks/useGSAP'
import { Sparkles, RefreshCw, Anchor } from 'lucide-react'

/**
 * FallingLetterRescue
 *
 * An impactful physics-driven storytelling animation where:
 * 1. A letter in a word loses footing and plummets downward with gravity.
 * 2. An adjacent "rescuer" word catches it with an elastic glowing tether.
 * 3. The rescuer strains against the weight with pendulum & spring dynamics.
 * 4. The rescuer pulls the falling letter back upward, snapping it securely into place!
 */
export default function FallingLetterRescue({
  holderText = 'HOLD',
  targetPrefix = 'F',
  fallingChar = 'A',
  targetSuffix = 'LL',
  caption = 'When details fall, clean code holds them together.',
  autoPlay = true,
  autoPlayInterval = 7000
}) {
  const containerRef = useRef(null)
  const holderWordRef = useRef(null)
  const targetWordRef = useRef(null)
  const fallingLetterRef = useRef(null)
  const pathRef = useRef(null)
  const sparkleRef = useRef(null)
  const statusBadgeRef = useRef(null)

  const [status, setStatus] = useState('Stable') // 'Stable' | 'Falling' | 'Caught' | 'Pulling Up' | 'Rescued'
  const isAnimatingRef = useRef(false)
  const autoPlayTimerRef = useRef(null)

  // Calculate coordinates and redraw the dynamic tether line
  const updateTether = useCallback(() => {
    if (!containerRef.current || !holderWordRef.current || !fallingLetterRef.current || !pathRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const holderRect = holderWordRef.current.getBoundingClientRect()
    const letterRect = fallingLetterRef.current.getBoundingClientRect()

    // Rescuer anchor point (top right corner of the holding word)
    const x1 = holderRect.right - containerRect.left - 4
    const y1 = holderRect.top - containerRect.top + holderRect.height * 0.45

    // Falling letter attachment point (top center of the falling letter)
    const x2 = letterRect.left - containerRect.left + letterRect.width * 0.5
    const y2 = letterRect.top - containerRect.top + 2

    // Dynamic curve sag based on vertical distance
    const distY = y2 - y1
    const midX = (x1 + x2) / 2
    // Curve sags downward slightly when hanging, tightens when pulled
    const sag = distY > 15 ? 12 : 0
    const midY = (y1 + y2) / 2 + sag

    pathRef.current.setAttribute('d', `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`)
  }, [])

  const runRescueAnimation = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setStatus('Falling')

    const holder = holderWordRef.current
    const letter = fallingLetterRef.current
    const path = pathRef.current
    const sparkle = sparkleRef.current

    if (!holder || !letter || !path) {
      isAnimatingRef.current = false
      return
    }

    // Set up ticker to update tether on every frame
    const tickerCallback = () => updateTether()
    gsap.ticker.add(tickerCallback)

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.ticker.remove(tickerCallback)
        isAnimatingRef.current = false
        setStatus('Stable')
      }
    })

    // Step 0: Ensure starting state
    gsap.set(path, { opacity: 0 })
    gsap.set(sparkle, { opacity: 0, scale: 0 })

    // Step 1: Letter wobbles and loses grip (Teetering)
    tl.to(letter, {
      y: 4,
      rotation: -12,
      duration: 0.28,
      ease: 'power1.in',
      transformOrigin: 'bottom left'
    })

    // Step 2: Sudden Plummet! (Gravity acceleration)
    tl.to(letter, {
      y: 56,
      rotation: -38,
      duration: 0.45,
      ease: 'power2.in',
      transformOrigin: 'top center'
    })

    // Step 3: Tether catches! The line appears and snaps taut
    tl.add(() => {
      setStatus('Caught')
      gsap.to(path, { opacity: 1, duration: 0.08 })
    }, '-=0.1')

    // Holder reacts to the sudden weight impact (dips down and tilts)
    tl.to(
      holder,
      {
        y: 6,
        rotation: -6,
        duration: 0.2,
        ease: 'power2.out',
        transformOrigin: 'bottom left'
      },
      '-=0.08'
    )

    // Letter swings like a suspended pendulum under the rope
    tl.to(
      letter,
      {
        y: 46,
        rotation: 24,
        duration: 0.32,
        ease: 'sine.out'
      },
      '-=0.05'
    )

    tl.to(letter, {
      y: 50,
      rotation: -14,
      duration: 0.26,
      ease: 'sine.inOut'
    })

    tl.to(letter, {
      y: 48,
      rotation: 6,
      duration: 0.22,
      ease: 'sine.inOut'
    })

    // Step 4: Rescuer prepares and strains to hoist (Pulling upward)
    tl.add(() => setStatus('Pulling Up'))

    tl.to(holder, {
      y: -9,
      rotation: 4,
      duration: 0.35,
      ease: 'power2.out'
    })

    // Letter gets hauled forcefully back up to the word baseline!
    tl.to(
      letter,
      {
        y: 0,
        rotation: 0,
        duration: 0.65,
        ease: 'back.out(2.4)'
      },
      '-=0.25'
    )

    // Holder returns to neutral resting posture with a satisfied bounce
    tl.to(
      holder,
      {
        y: 0,
        rotation: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.4)'
      },
      '-=0.4'
    )

    // Step 5: Tether retracts and sparks celebrate safe landing!
    tl.to(
      path,
      {
        opacity: 0,
        duration: 0.15
      },
      '-=0.2'
    )

    tl.add(() => {
      setStatus('Rescued')
    }, '-=0.15')

    tl.fromTo(
      sparkle,
      { opacity: 0, scale: 0.2, rotate: -45 },
      { opacity: 1, scale: 1.2, rotate: 45, duration: 0.3, ease: 'back.out(2)' },
      '-=0.1'
    )

    tl.to(sparkle, { opacity: 0, scale: 0.4, duration: 0.35, delay: 0.4 })
  }, [updateTether])

  // Setup auto-play loop
  useEffect(() => {
    if (!autoPlay) return

    const startTimer = () => {
      autoPlayTimerRef.current = setInterval(() => {
        if (!isAnimatingRef.current) {
          runRescueAnimation()
        }
      }, autoPlayInterval)
    }

    // Initial trigger after brief delay
    const initialDelay = setTimeout(() => {
      runRescueAnimation()
      startTimer()
    }, 2200)

    return () => {
      clearTimeout(initialDelay)
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [autoPlay, autoPlayInterval, runRescueAnimation])

  const handleManualTrigger = () => {
    if (isAnimatingRef.current) return
    runRescueAnimation()
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg rounded-2xl bg-[#13141b]/90 border border-white/[0.09] p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden select-none transition-all duration-300 hover:border-amber-400/30 group"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Layer for Dynamic Rescue Tether Line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Luminous rope gradient */}
          <linearGradient id="rescueTetherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.9" />
          </linearGradient>
          <filter id="ropeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M 0 0"
          fill="none"
          stroke="url(#rescueTetherGradient)"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#ropeGlow)"
          className="transition-opacity duration-150"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* Top Header: Badge & Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            Interactive Physics Motion
          </span>
        </div>

        {/* Live Status indicator */}
        <div
          ref={statusBadgeRef}
          className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border transition-colors ${
            status === 'Falling'
              ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              : status === 'Caught' || status === 'Pulling Up'
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
              : status === 'Rescued'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-white/5 border-white/10 text-zinc-400'
          }`}
        >
          {status === 'Falling' && '⚠️ Letter Falling!'}
          {status === 'Caught' && '🪢 Caught by Rope!'}
          {status === 'Pulling Up' && '⬆️ Pulling Up!'}
          {status === 'Rescued' && '✨ Safely Restored!'}
          {status === 'Stable' && 'Ready'}
        </div>
      </div>

      {/* Main Interactive Stage: The Holding Word & The Falling Letter */}
      <div
        onClick={handleManualTrigger}
        className="relative py-5 px-4 rounded-xl bg-[#0e0f14]/80 border border-white/[0.06] flex items-center justify-center gap-8 sm:gap-12 cursor-pointer"
        title="Click anywhere to trigger the letter drop & rescue!"
      >
        {/* Rescuer Word */}
        <div className="relative flex items-center">
          <span
            ref={holderWordRef}
            className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-wider inline-block will-change-transform select-none"
          >
            {holderText}
          </span>
          {/* Subtle anchor ring icon attached to holding word */}
          <span className="absolute -top-2 -right-3 text-amber-400 opacity-70 group-hover:opacity-100 transition-opacity">
            <Anchor className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Dynamic Connector Indicator */}
        <span className="text-zinc-600 font-mono text-xs tracking-widest select-none">
          ···&gt;
        </span>

        {/* Target Word with the Falling Character */}
        <div
          ref={targetWordRef}
          className="relative text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-wider select-none flex items-center"
        >
          {/* Prefix (e.g. "F") */}
          <span>{targetPrefix}</span>

          {/* THE FALLING LETTER */}
          <span
            ref={fallingLetterRef}
            className="text-gradient inline-block will-change-transform relative z-30 px-0.5 cursor-pointer"
            style={{ transformOrigin: 'top center' }}
          >
            {fallingChar}
          </span>

          {/* Suffix (e.g. "LL") */}
          <span>{targetSuffix}</span>

          {/* Sparkle burst on successful rescue */}
          <span
            ref={sparkleRef}
            className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none text-amber-300 z-40"
            style={{ opacity: 0 }}
          >
            <Sparkles className="w-5 h-5 fill-amber-300" />
          </span>
        </div>
      </div>

      {/* Bottom Controls & Caption */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/[0.05]">
        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
          {caption}
        </p>

        <button
          type="button"
          onClick={handleManualTrigger}
          disabled={status !== 'Stable'}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.07] hover:bg-amber-400/20 text-zinc-200 hover:text-amber-200 border border-white/10 hover:border-amber-400/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <RefreshCw className={`w-3 h-3 ${status !== 'Stable' ? 'animate-spin' : ''}`} />
          <span>{status === 'Stable' ? 'Drop Letter' : 'Rescuing...'}</span>
        </button>
      </div>
    </div>
  )
}
