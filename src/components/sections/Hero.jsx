import React, { useRef, useEffect } from 'react'
import { personalInfo, heroData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { ArrowRight } from 'lucide-react'
import MagneticElement from '../MagneticElement'

const chipPositions = ['top-4 -left-4', 'top-1/2 -right-6', 'bottom-6 -left-2']

export default function Hero({ preloaderDone }) {
  const heroRef = useRef(null)
  const visualRef = useRef(null)

  // Gentle entrance choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: preloaderDone ? 0.05 : 0.4,
        defaults: { ease: 'power3.out' }
      })

      tl.fromTo('.hero-fade', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
      tl.fromTo(
        visualRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        '-=0.7'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [preloaderDone])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-40 pb-28 flex items-center overflow-hidden bg-editorial-grid ambient-spotlight"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: greeting, headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="hero-fade section-badge mb-8">{personalInfo.badge}</div>

            <h1 className="hero-fade text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 font-heading leading-[1.08]">
              Hi, I'm <span className="text-gradient">Aliasgar.</span>
            </h1>

            <p className="hero-fade text-2xl sm:text-3xl font-semibold text-zinc-200 font-heading leading-snug mb-6 max-w-2xl">
              {heroData.headline}
            </p>

            <p className="hero-fade text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
              {heroData.subheadline}
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-4">
              <MagneticElement strength={0.3}>
                <a
                  href={heroData.primaryCta.href}
                  id="hero-primary-cta"
                  className="btn-editorial-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                >
                  <span>{heroData.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticElement>

              <MagneticElement strength={0.3}>
                <a
                  href={heroData.secondaryCta.href}
                  id="hero-secondary-cta"
                  className="btn-editorial-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium"
                >
                  <span>{heroData.secondaryCta.label}</span>
                </a>
              </MagneticElement>
            </div>
          </div>

          {/* Right: monogram (or photo) with three floating chips */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={visualRef} className="relative w-full max-w-sm aspect-square">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-amber-400/25 via-transparent to-indigo-500/20 blur-2xl" />
              <div className="editorial-card relative w-full h-full rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                {personalInfo.avatar ? (
                  <img src={personalInfo.avatar} alt={personalInfo.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-heading font-bold text-[9rem] leading-none select-none text-gradient">
                    {personalInfo.initial}
                  </span>
                )}
              </div>

              {heroData.chips.map((chip, i) => (
                <span
                  key={chip}
                  className={`absolute px-4 py-2 rounded-full bg-[#161821] border border-white/15 text-sm font-medium text-zinc-100 shadow-xl ${chipPositions[i % 3]}`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
