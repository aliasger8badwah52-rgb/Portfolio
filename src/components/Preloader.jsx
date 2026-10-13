import React, { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'
import { personalInfo } from '../data/portfolioData'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const obj = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('portfolio_preloader_seen', 'true')
        if (onComplete) onComplete()
      }
    })

    tl.to(obj, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const currentVal = Math.floor(obj.val)
        if (counterRef.current) {
          counterRef.current.innerText = currentVal < 10 ? `0${currentVal}` : `${currentVal}`
        }
        if (lineRef.current) {
          lineRef.current.style.width = `${currentVal}%`
        }
      }
    })

    tl.to({}, { duration: 0.1 })

    // Curtain reveal upwards
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
      className="fixed inset-0 z-[100] bg-[#08090d] flex flex-col items-center justify-center gap-8 select-none overflow-hidden"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#14151e] border border-white/10 flex items-center justify-center font-heading font-bold text-2xl text-amber-300 shadow-2xl">
        <span>{personalInfo.initial}</span>
      </div>

      <div className="text-7xl sm:text-8xl font-bold font-mono tracking-tight text-white tabular-nums">
        <span ref={counterRef}>00</span>
      </div>

      <div className="w-64 h-1 rounded-full bg-white/5 overflow-hidden">
        <div
          ref={lineRef}
          className="h-full w-0 rounded-full bg-gradient-to-r from-zinc-400 via-amber-400 to-white"
        />
      </div>
    </div>
  )
}
