import React, { useRef, useEffect } from 'react'
import { experienceData } from '../../data/portfolioData'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { Calendar, Building2, CheckCircle2, Sparkles } from 'lucide-react'

export default function Experience() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineProgressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Glowing timeline line follows user scroll
      if (lineProgressRef.current && timelineRef.current) {
        gsap.fromTo(
          lineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.5
            }
          }
        )
      }

      // 2. Timeline cards slide and fade into view
      gsap.utils.toArray('.timeline-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -40 : 40,
            y: 20
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // 3. Timeline node dots pulse on scroll
      gsap.utils.toArray('.timeline-node-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-cosmic-grid border-t border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Animated Text */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-xs font-mono text-indigo-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-4">
            Experience &amp; <span className="text-gradient-aurora">Proven Track Record</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            A chronological timeline of building scalable digital products and driving engineering excellence.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">

          {/* Base Background Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-slate-800 -translate-x-1/2" />

          {/* Animated Glowing Foreground Progress Line */}
          <div
            ref={lineProgressRef}
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500 -translate-x-1/2 origin-top shadow-[0_0_15px_#22d3ee]"
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {experienceData.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={item.role + item.company}
                  className="relative flex flex-col sm:flex-row items-start"
                >
                  {/* Glowing Node Marker */}
                  <div className="timeline-node-dot absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#22d3ee]">
                      <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping-slow" />
                    </div>
                  </div>

                  {/* Left / Right Card Layout */}
                  <div
                    className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12 sm:text-left'
                      }`}
                  >
                    <div className="timeline-card cosmic-card p-6 sm:p-7 rounded-2xl group">

                      {/* Period Badge & Job Type */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {item.period}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-white/10 text-[10px] font-mono text-zinc-400">
                          {item.type}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading mb-1">
                        {item.role}
                      </h3>
                      <div
                        className={`flex items-center gap-2 text-sm text-zinc-400 mb-4 ${isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                      >
                        <Building2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                        <span className="font-semibold text-zinc-200">{item.company}</span>
                        <span>•</span>
                        <span className="text-xs font-mono text-zinc-500">{item.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-zinc-300 leading-relaxed mb-5 text-left">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-2 mb-5 text-left">
                        {item.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills Pills */}
                      <div
                        className={`flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.08] ${isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                      >
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-white/[0.06] text-[11px] font-mono text-zinc-400 group-hover:border-cyan-500/20 group-hover:text-zinc-300 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
