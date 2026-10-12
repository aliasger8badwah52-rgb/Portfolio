import React, { useRef, useEffect, useState } from 'react'
import { personalInfo, heroData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import {
  ArrowRight,
  Terminal,
  Sparkles,
  Download,
  Code,
  Zap,
  Layers,
  ChevronDown,
  Activity,
  Code2
} from 'lucide-react'

const rotatingWords = [
  "EXPERIENCES",
  "INTERFACES",
  "APPLICATIONS",
  "ARCHITECTURES"
]

export default function Hero() {
  const heroRef = useRef(null)
  const rotatingWordRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)

  const headlinePrefixRef = useRef(null)
  const headlineSuffixRef = useRef(null)
  const subheadlineRef = useRef(null)
  const ctaButtonsRef = useRef(null)
  const techPillsRef = useRef(null)
  const terminalCardRef = useRef(null)

  // Rotating headline word animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (rotatingWordRef.current) {
        gsap.to(rotatingWordRef.current, {
          y: -25,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            setWordIndex((prev) => (prev + 1) % rotatingWords.length)
            gsap.fromTo(
              rotatingWordRef.current,
              { y: 25, opacity: 0, filter: 'blur(6px)' },
              { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.8)' }
            )
          }
        })
      }
    }, 3200)

    return () => clearInterval(interval)
  }, [])

  // Page load GSAP entrance choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // 1. Availability badge fade & slide down
      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.15 }
      )

      // 2. Headline words kinetic 3D entrance
      tl.fromTo(
        [headlinePrefixRef.current, rotatingWordRef.current, headlineSuffixRef.current],
        { opacity: 0, y: 50, rotateX: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 1, stagger: 0.14 },
        '-=0.4'
      )

      // 3. Subheadline fade
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.6'
      )

      // 4. CTA buttons bounce in
      tl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.6)' },
        '-=0.5'
      )

      // 5. Tech stack pills stagger in
      tl.fromTo(
        '.tech-pill-item',
        { opacity: 0, y: 15, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
        '-=0.4'
      )

      // 6. Terminal showcase card slide in
      tl.fromTo(
        terminalCardRef.current,
        { opacity: 0, y: 60, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )

      // Ambient continuous floating animations
      gsap.to('.ambient-float-slow', {
        y: -14,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.ambient-float-fast', {
        y: -9,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-cosmic-grid"
    >
      {/* Dynamic Aurora Ambient Lighting */}
      <div className="aurora-orb-1 absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/20 to-violet-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="aurora-orb-2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/15 via-fuchsia-600/10 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Kinetic Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">

            {/* Availability Pill with Pulsing Aurora Glow */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-cyan-950/60 border border-cyan-400/30 text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.2)] mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
              <span>{personalInfo.availabilityBadge}</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 ml-1" />
            </div>

            {/* Kinetic Typography Headline with Rotating Word */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 font-heading">
              <span
                ref={headlinePrefixRef}
                className="block text-white"
              >
                CRAFTING DIGITAL
              </span>

              {/* Rotating Shimmering Word */}
              <span className="block h-[1.18em] overflow-visible my-1">
                <span
                  ref={rotatingWordRef}
                  className="inline-block text-gradient-aurora drop-shadow-[0_0_35px_rgba(99,102,241,0.35)]"
                >
                  {rotatingWords[wordIndex]}
                </span>
              </span>

              <span
                ref={headlineSuffixRef}
                className="block text-zinc-300 text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight"
              >
                WITH CODE &amp; MOTION
              </span>
            </h1>

            {/* Subheadline with enhanced contrast */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              {heroData.subheadline}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaButtonsRef}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <a
                href={heroData.primaryCta.href}
                className="hero-cta-btn btn-cosmic-glow group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300"
                id="hero-primary-cta"
              >
                <span>{heroData.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href={heroData.secondaryCta.href}
                className="hero-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm text-zinc-200 bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-800/90 hover:text-white transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-black/40"
                id="hero-secondary-cta"
              >
                <span>{heroData.secondaryCta.label}</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                className="hero-cta-btn inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume / CV</span>
              </a>
            </div>

            {/* Tech Stack Badges with Glowing Dot Matrix */}
            <div ref={techPillsRef} className="w-full">
              <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 mb-3 flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Core Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {heroData.techPills.map((pill) => (
                  <span
                    key={pill.label}
                    className="tech-pill-item inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900/70 border border-white/[0.08] text-xs font-medium text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Cosmic Terminal & Floating Micro-Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">

            {/* Floating Metric Badge (Top Right) */}
            <div className="ambient-float-slow absolute -top-6 -right-2 sm:-right-6 z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-950/40">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">Performance</p>
                <p className="text-sm font-bold text-white">60 FPS Hardware GSAP</p>
              </div>
            </div>

            {/* Floating Metric Badge (Bottom Left) */}
            <div className="ambient-float-fast absolute -bottom-6 -left-2 sm:-left-6 z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-violet-500/40 backdrop-blur-xl shadow-2xl shadow-violet-950/40">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 border border-violet-400/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">Lighthouse</p>
                <p className="text-sm font-bold text-emerald-400">99 / 100 Perf Standard</p>
              </div>
            </div>

            {/* Central Terminal / IDE Card */}
            <div
              ref={terminalCardRef}
              className="cosmic-card w-full max-w-md rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-500"
            >
              {/* Subtle glowing corner */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-[0_0_6px_#f43f5e]" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-[0_0_6px_#f59e0b]" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-[0_0_6px_#10b981]" />
                  <span className="ml-2 text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    developer.config.ts
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/20">
                  TypeScript
                </span>
              </div>

              {/* Code Snippet with Syntax Highlighting */}
              <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 space-y-1.5 overflow-x-auto py-1">
                <div className="text-zinc-500">// Modern UI Architecture</div>
                <div>
                  <span className="text-violet-400 font-semibold">const</span>{' '}
                  <span className="text-cyan-300 font-semibold">ali</span>:{' '}
                  <span className="text-emerald-400">SeniorEngineer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">name:</span>{' '}
                  <span className="text-amber-300">"{personalInfo.name}"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">focus:</span>{' '}
                  <span className="text-cyan-300">"React 19 &amp; Kinetic Motion"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">performance:</span>{' '}
                  <span className="text-emerald-400">"Hardware Accelerated"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">mission:</span>{' '}
                  <span className="text-violet-300">() =&gt;</span> &#123;
                </div>
                <div className="pl-8 text-cyan-200">
                  return <span className="text-amber-300">"Build products that convert &amp; inspire."</span>;
                </div>
                <div className="pl-4">&#125;,</div>
                <div className="pl-4">
                  <span className="text-zinc-400">status:</span>{' '}
                  <span className="text-emerald-400 font-semibold">"Ready for impact"</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/10">
                {heroData.quickStats.map((stat, i) => (
                  <div key={i} className="text-center p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <p className="text-base font-bold text-white font-heading">{stat.value}</p>
                    <p className="text-[10px] text-zinc-400 font-mono">{stat.label}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors group"
            aria-label="Scroll down to About section"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 group-hover:text-cyan-300">
              Explore Portfolio
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  )
}
