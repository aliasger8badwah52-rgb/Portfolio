import React, { useRef, useEffect, useState } from 'react'
import { personalInfo, heroData, projectsData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { 
  ArrowRight, 
  Download, 
  ArrowUpRight, 
  Sparkles,
  Layers, 
  ChevronDown,
  Activity,
  Cpu,
  Zap
} from 'lucide-react'
import InteractiveCanvas from '../InteractiveCanvas'
import MagneticElement from '../MagneticElement'

export default function Hero() {
  const heroRef = useRef(null)
  const headlineWordsRef = useRef([])
  const subheadlineRef = useRef(null)
  const ctaButtonsRef = useRef(null)
  const showcaseCardRef = useRef(null)
  const cardGlareRef = useRef(null)

  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [fps, setFps] = useState(60)

  const activeProject = projectsData[activeProjectIndex] || projectsData[0]

  // Real-time FPS counter for creative technology authenticity
  useEffect(() => {
    let lastTime = performance.now()
    let frameCount = 0
    let animationId

    const calcFps = (time) => {
      frameCount++
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)))
        frameCount = 0
        lastTime = time
      }
      animationId = requestAnimationFrame(calcFps)
    }

    animationId = requestAnimationFrame(calcFps)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // Cinematic GSAP entrance choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // 1. Availability badge fade in with slight elastic bounce
      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.15 }
      )

      // 2. Cinematic 3D word-by-word reveal for headline
      if (headlineWordsRef.current.length) {
        tl.fromTo(
          headlineWordsRef.current,
          { 
            opacity: 0, 
            y: 50, 
            rotateX: 35, 
            filter: 'blur(8px)' 
          },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            filter: 'blur(0px)', 
            duration: 0.9, 
            stagger: 0.08,
            ease: 'power3.out'
          },
          '-=0.4'
        )
      }

      // 3. Subheadline fade with subtle tracking
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.5'
      )

      // 4. CTA buttons stagger in
      tl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)' },
        '-=0.4'
      )

      // 5. Tech stack pills stagger in
      tl.fromTo(
        '.tech-pill-item',
        { opacity: 0, y: 12, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' },
        '-=0.3'
      )

      // 6. Showcase card slide in with 3D tilt arrival
      tl.fromTo(
        showcaseCardRef.current,
        { opacity: 0, y: 60, rotateY: -8, rotateX: 6, scale: 0.94 },
        { opacity: 1, y: 0, rotateY: 0, rotateX: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
        '-=0.6'
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  // 3D Tilt interaction on Showcase Card
  const handleCardMouseMove = (e) => {
    const card = showcaseCardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -9
    const rotateY = ((x - centerX) / centerX) * 9

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.35,
      ease: 'power2.out'
    })

    if (cardGlareRef.current) {
      gsap.to(cardGlareRef.current, {
        opacity: 0.75,
        x: x - 150,
        y: y - 150,
        duration: 0.15,
        ease: 'none'
      })
    }
  }

  const handleCardMouseLeave = () => {
    const card = showcaseCardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1.1, 0.4)'
    })

    if (cardGlareRef.current) {
      gsap.to(cardGlareRef.current, {
        opacity: 0,
        duration: 0.4
      })
    }
  }

  // Crossfade animation when switching project tabs
  const handleTabSwitch = (idx) => {
    if (idx === activeProjectIndex) return
    const card = showcaseCardRef.current
    if (card) {
      gsap.fromTo(
        card.querySelector('.project-preview-media'),
        { opacity: 0.5, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
      )
    }
    setActiveProjectIndex(idx)
  }

  const headlineWords = [
    "Crafting", "fluid", "web", "interfaces", "with", "engineering", "rigor."
  ]

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden bg-editorial-grid ambient-spotlight"
    >
      {/* Interactive 60fps HTML5 Canvas Particle Constellation */}
      <InteractiveCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Natural Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Availability Pill & Live Motion Engine HUD */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="hero-badge shimmer-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#13141b]/90 border border-white/10 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>{personalInfo.availabilityBadge}</span>
              </div>

              {/* Live Performance HUD */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101117] border border-white/[0.06] text-[11px] font-mono text-zinc-400">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{fps} FPS GSAP Hardware Motion</span>
              </div>
            </div>

            {/* Cinematic Staggered Headline */}
            <h1
              className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 font-heading leading-[1.08] perspective-[800px]"
            >
              {headlineWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden mr-[0.26em] align-top"
                >
                  <span
                    ref={(el) => (headlineWordsRef.current[index] = el)}
                    className={`inline-block ${
                      word === 'engineering' || word === 'rigor.' 
                        ? 'text-zinc-400 font-medium' 
                        : 'text-white'
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              Hi, I'm <span className="text-zinc-200 font-medium">{personalInfo.name}</span>. 
              A Senior Frontend Engineer dedicated to building responsive web applications, design systems, and delightful motion interactions that feel natural and performant.
            </p>

            {/* Magnetic CTA Buttons */}
            <div
              ref={ctaButtonsRef}
              className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto"
            >
              <MagneticElement strength={0.3}>
                <a
                  href={heroData.primaryCta.href}
                  className="hero-cta-btn btn-editorial-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                  id="hero-primary-cta"
                >
                  <span>{heroData.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticElement>

              <MagneticElement strength={0.3}>
                <a
                  href={heroData.secondaryCta.href}
                  className="hero-cta-btn btn-editorial-secondary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium"
                  id="hero-secondary-cta"
                >
                  <span>{heroData.secondaryCta.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </a>
              </MagneticElement>

              <a
                href={personalInfo.resumeUrl}
                className="hero-cta-btn inline-flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume / CV</span>
              </a>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="w-full">
              <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 mb-2.5">
                Core Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {heroData.techPills.map((pill) => (
                  <span
                    key={pill.label}
                    className="tech-pill-item inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#13141b] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:border-white/20 transition-all cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 3D Physics Featured Work Spotlight with Specular Glare */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div
              ref={showcaseCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="editorial-card w-full max-w-md rounded-2xl p-5 shadow-2xl relative overflow-hidden cursor-pointer"
            >
              {/* Dynamic Specular Sheen Layer that tracks mouse */}
              <div
                ref={cardGlareRef}
                className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 bg-gradient-to-tr from-white/10 to-transparent blur-2xl -z-0"
              />

              {/* Card Header & Tabs */}
              <div className="relative z-10 flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 animate-pulse" />
                  <span className="text-xs font-mono text-zinc-300 font-medium">
                    Featured Project Showcase
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1e29] text-zinc-400 border border-white/5">
                  {activeProjectIndex + 1} of {projectsData.length}
                </span>
              </div>

              {/* Project Visual Preview */}
              <div className="project-preview-media relative rounded-xl overflow-hidden aspect-[16/10] bg-[#0c0d12] border border-white/10 mb-4 group z-10">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Metric Overlay Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0c0d12]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-200">
                  {activeProject.metrics}
                </div>

                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#0c0d12]/90 hover:bg-white hover:text-black border border-white/15 text-zinc-200 transition-all"
                  aria-label={`View live ${activeProject.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Project Meta Information */}
              <div className="mb-4 relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-white font-heading">
                    {activeProject.title}
                  </h3>
                  <span className="text-[11px] font-mono text-amber-300/90">
                    Production
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                  {activeProject.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#1c1e29] border border-white/5 text-[11px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Project Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-white/[0.08] relative z-10">
                {projectsData.slice(0, 3).map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleTabSwitch(idx)}
                    className={`text-left p-2 rounded-lg transition-all ${
                      activeProjectIndex === idx
                        ? 'bg-white/10 border border-white/15 text-white'
                        : 'bg-[#101117] border border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-[#161720]'
                    }`}
                  >
                    <p className="text-[10px] font-mono text-zinc-500">0{idx + 1}</p>
                    <p className="text-xs font-medium truncate">{p.title.split(' ')[0]}</p>
                  </button>
                ))}
              </div>

              {/* Impact stats row */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-white/[0.08] relative z-10">
                {heroData.quickStats.map((stat, i) => (
                  <div key={i} className="text-center p-2 rounded-lg bg-[#0f1016] border border-white/[0.04]">
                    <p className="text-sm font-bold text-white font-heading">{stat.value}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{stat.label}</p>
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
            className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors group"
            aria-label="Scroll down to About section"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">
              Scroll down
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
