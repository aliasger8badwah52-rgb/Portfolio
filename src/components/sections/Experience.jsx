import React, { useRef, useEffect } from 'react'
import { experienceData } from '../../data/portfolioData'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { Calendar, Building2, CheckCircle2 } from 'lucide-react'

export default function Experience() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineProgressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline glowing line fills on scroll
      if (lineProgressRef.current && timelineRef.current) {
        gsap.fromTo(
          lineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 0.5
            }
          }
        )
      }

      // Timeline cards entrance
      gsap.utils.toArray('.timeline-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Timeline dots pop in
      gsap.utils.toArray('.timeline-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2.5)',
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
      className="relative py-28 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141b] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-2">
            Work Experience &amp; <span className="text-zinc-400 font-medium">Leadership</span>
          </h2>
          <p className="text-base text-zinc-400">
            A track record of architecting scalable web applications, design systems, and high-velocity engineering teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-4xl">
          
          {/* Subtle base vertical line */}
          <div className="absolute left-3 sm:left-4 top-4 bottom-4 w-px bg-white/10" />

          {/* Animated ScrollTrigger scrubbed vertical line */}
          <div
            ref={lineProgressRef}
            className="absolute left-3 sm:left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400 via-emerald-400 to-indigo-400 origin-top -translate-x-[0.5px]"
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline Items */}
          <div className="space-y-10">
            {experienceData.map((item, idx) => (
              <div
                key={item.role + item.company}
                className="relative pl-10 sm:pl-12"
              >
                {/* Timeline Dot Marker */}
                <div className="timeline-dot absolute left-3 sm:left-4 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#0c0d12] shadow-sm z-10" />

                {/* Timeline Card */}
                <div className="timeline-card editorial-card p-6 rounded-xl hover:translate-y-[-2px] transition-transform">
                  
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white font-heading">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mt-0.5">
                        <span className="font-medium text-zinc-200">{item.company}</span>
                        <span>•</span>
                        <span className="font-mono text-zinc-500 text-xs">{item.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181a24] border border-white/[0.08] text-xs font-mono text-zinc-300">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {item.period}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#181a24] text-[10px] font-mono text-zinc-400 border border-white/5">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2 mb-5">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-[#161822] border border-white/[0.05] text-[11px] font-mono text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
