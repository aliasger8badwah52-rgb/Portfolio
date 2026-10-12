import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../hooks/useGSAP'
import { Sparkles, Code2, Zap, Layers, Cpu, Flame, ArrowUpRight } from 'lucide-react'

const tickerItems = [
  { label: "React 19 Concurrent", icon: Code2 },
  { label: "Hardware Accelerated 60 FPS", icon: Zap },
  { label: "GSAP ScrollTrigger Choreography", icon: Sparkles },
  { label: "Design Token Architecture", icon: Layers },
  { label: "Sub-Second LCP Performance", icon: Cpu },
  { label: "TypeScript Contract Precision", icon: Code2 },
  { label: "Fluid Interactive Canvas", icon: Flame }
]

export default function KineticTicker() {
  const tickerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Base continuous marquee movement
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 25,
      repeat: -1
    })

    // Velocity-reactive scroll acceleration
    ScrollTrigger.create({
      trigger: tickerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Accelerate marquee based on scroll velocity
        const velocity = Math.abs(self.getVelocity())
        const targetTimeScale = Math.min(Math.max(velocity / 400, 1), 5)
        gsap.to(tween, {
          timeScale: targetTimeScale,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={tickerRef}
      className="relative py-4 border-y border-white/[0.06] bg-[#090a0f] overflow-hidden select-none"
      aria-label="Core competencies marquee"
    >
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#090a0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#090a0f] to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform w-fit"
      >
        {/* Double array for seamless loop */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => {
          const IconComponent = item.icon
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-white transition-colors cursor-default"
            >
              <IconComponent className="w-3.5 h-3.5 text-amber-400/80" />
              <span>{item.label}</span>
              <span className="text-zinc-600 ml-4 font-sans text-sm">•</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
