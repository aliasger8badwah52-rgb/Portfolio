import React, { useRef, useEffect } from 'react'
import { aboutData, projectsData, skillsData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'

// Stats are calculated from real data so they never go out of sync
const stats = [
  { number: projectsData.length, label: 'Projects Built' },
  { number: projectsData.filter((p) => p.live).length, label: 'Live Websites' },
  { number: skillsData.categories.reduce((sum, c) => sum + c.skills.length, 0), label: 'Tools & Technologies' }
]

export default function About() {
  const sectionRef = useRef(null)
  const statsContainerRef = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-fade',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
        }
      )

      stats.forEach((stat, index) => {
        const el = counterRefs.current[index]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.number,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: statsContainerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toString()
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Heading */}
          <div className="lg:col-span-5 flex flex-col items-start text-left lg:sticky lg:top-32">
            <div className="about-fade section-badge mb-6">{aboutData.badge}</div>
            <h2 className="about-fade text-4xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
              {aboutData.heading} <span className="text-gradient">{aboutData.headingGradient}</span>
            </h2>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7 space-y-6">
            {aboutData.bioParagraphs.map((para, i) => (
              <p key={i} className="about-fade text-lg text-zinc-400 leading-relaxed">
                {para}
              </p>
            ))}

            <blockquote className="about-fade mt-8 pl-6 border-l-2 border-amber-400 text-lg font-medium text-zinc-200 leading-relaxed">
              {aboutData.goal}
            </blockquote>
          </div>

        </div>

        {/* Stats */}
        <div ref={statsContainerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="about-fade editorial-card rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold font-heading text-white mb-2">
                <span ref={(el) => (counterRefs.current[idx] = el)}>0</span>
              </div>
              <p className="text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
