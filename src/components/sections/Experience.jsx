import React, { useRef, useEffect } from 'react'
import { educationData, experienceData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { GraduationCap, CheckCircle2 } from 'lucide-react'

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-fade',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="section-badge mb-6">Education & Experience</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
            My <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Education */}
          <div className="space-y-6">
            <h3 className="exp-fade text-sm font-mono uppercase tracking-widest text-zinc-500">Education</h3>
            {educationData.map((item) => (
              <div key={item.title} className="exp-fade editorial-card rounded-2xl p-7 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-400/10 border border-indigo-400/20 text-indigo-300 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-300">
                    {item.period} · {item.note}
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading mt-1">{item.title}</h4>
                  <p className="text-sm text-zinc-400 mt-1">{item.place}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h3 className="exp-fade text-sm font-mono uppercase tracking-widest text-zinc-500">Experience</h3>
            <div className="exp-fade editorial-card rounded-2xl p-7">
              <h4 className="text-lg font-bold text-white font-heading mb-5">{experienceData.title}</h4>
              <ul className="space-y-4">
                {experienceData.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
