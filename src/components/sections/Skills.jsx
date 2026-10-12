import React, { useState, useRef, useEffect } from 'react'
import { skillsData } from '../../data/portfolioData'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import {
  Code2,
  FileCode,
  Sparkles,
  Palette,
  Globe,
  CheckCircle,
  Server,
  Network,
  Database,
  Cpu,
  Zap,
  GitBranch,
  Boxes,
  Cloud,
  CheckSquare,
  MousePointer,
  Layout,
  Layers,
  Film
} from 'lucide-react'
import { FigmaIcon } from '../SocialIcons'

const iconComponents = {
  Code2,
  FileCode,
  Sparkles,
  Palette,
  Globe,
  CheckCircle,
  Server,
  Network,
  Database,
  Cpu,
  Zap,
  GitBranch,
  Boxes,
  Cloud,
  CheckSquare,
  Figma: FigmaIcon,
  MousePointer,
  Layout,
  Layers,
  Film
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress bars on scroll into view
      gsap.utils.toArray('.skill-progress-bar').forEach((bar) => {
        const targetWidth = bar.getAttribute('data-level') || '85%'
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Stagger cards in
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  // Mouse tilt micro-interaction on card hover
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, {
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power1.out'
    })
  }

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-cosmic-grid border-t border-white/[0.06]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Animated Text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-xs font-mono text-indigo-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{skillsData.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            Curated Stack &amp; <span className="text-gradient-aurora">Technical Mastery</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            {skillsData.subheading}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {skillsData.categories.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeCategory === idx
                  ? 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-slate-900/80 text-zinc-400 hover:text-white border border-white/[0.08] hover:border-cyan-400/30'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Subtext */}
        <div className="text-center mb-10">
          <p className="text-sm font-mono text-cyan-300 max-w-xl mx-auto">
            {skillsData.categories[activeCategory].description}
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.categories[activeCategory].skills.map((skill) => {
            const IconComponent = iconComponents[skill.icon] || Code2
            return (
              <div
                key={skill.name}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="skill-card cosmic-card p-6 rounded-2xl relative overflow-hidden group"
              >
                {/* Header: Icon, Name & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        {skillsData.categories[activeCategory].name}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-cyan-500/20 text-cyan-300 group-hover:border-cyan-400/40 transition-colors">
                    {skill.tag}
                  </span>
                </div>

                {/* Animated Proficiency Bar with Shimmer Wave */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Proficiency</span>
                    <span className="text-cyan-300 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 border border-white/[0.06] overflow-hidden p-0.5">
                    <div
                      className="skill-progress-bar progress-shimmer h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                      data-level={`${skill.level}%`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-6 rounded-2xl cosmic-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
            <p className="text-xs sm:text-sm text-zinc-200 font-medium">
              Always expanding my repertoire with emerging tools, WebGPU, and AI-accelerated workflows.
            </p>
          </div>
          <a
            href="#projects"
            className="text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 underline decoration-cyan-400/40 underline-offset-4 flex-shrink-0"
          >
            See skills in production &rarr;
          </a>
        </div>

      </div>
    </section>
  )
}
