import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../hooks/useGSAP'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)
  const brandRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Check if already visited this session (allow replay or smooth first load)
    const hasLoaded = sessionStorage.getItem('portfolio_preloader_seen')
    
    // Animate counter from 0 to 100
    const obj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('portfolio_preloader_seen', 'true')
        if (onComplete) onComplete()
      }
    })

    // Rapid cinematic counter
    tl.to(obj, {
      val: 100,
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        const currentVal = Math.floor(obj.val)
        setCount(currentVal)
        if (counterRef.current) {
          counterRef.current.innerText = currentVal < 10 ? `0${currentVal}` : `${currentVal}`
        }
        if (lineRef.current) {
          lineRef.current.style.width = `${currentVal}%`
        }
      }
    })

    // Brief hold at 100%
    tl.to({}, { duration: 0.12 })

    // Split curtain reveal upwards
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut'
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#08090d] flex flex-col items-center justify-between p-8 sm:p-12 pointer-events-auto select-none overflow-hidden"
    >
      {/* Top subtle HUD tag */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
        <span>Ali Raza • Creative Developer</span>
        <span>Engine V2.6</span>
      </div>

      {/* Center Counter and Monogram */}
      <div className="flex flex-col items-center text-center my-auto">
        <div ref={brandRef} className="w-14 h-14 rounded-2xl bg-[#14151e] border border-white/10 flex items-center justify-center font-mono font-bold text-xl text-zinc-100 shadow-2xl mb-6">
          <span>AR</span>
        </div>

        <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-white mb-4">
          <span ref={counterRef}>00</span>
          <span className="text-xs sm:text-sm font-mono text-amber-400 ml-2 uppercase tracking-widest">%</span>
        </div>

        <p className="text-xs font-mono tracking-widest uppercase text-zinc-400">
          Initializing Motion &amp; Creative Engine
        </p>
      </div>

      {/* Bottom Loading Progress Line */}
      <div className="w-full max-w-md space-y-2">
        <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            ref={lineRef}
            className="h-full bg-gradient-to-r from-zinc-400 via-amber-400 to-white w-0 rounded-full transition-all duration-75"
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase">
          <span>60 FPS Hardware Render</span>
          <span>GSAP • Lenis Motion</span>
        </div>
      </div>
    </div>
  )
}
