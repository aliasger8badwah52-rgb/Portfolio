import React, { useRef, useEffect } from 'react'
import { projectsData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { ExternalLink, ShoppingBag, Bot, LayoutDashboard, PenTool } from 'lucide-react'

const projectIcons = { ShoppingBag, Bot, LayoutDashboard, PenTool }

export default function Projects() {
  const sectionRef = useRef(null)

  const liveProjects = projectsData.filter((p) => p.live)
  const otherProjects = projectsData.filter((p) => !p.live)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="section-badge mb-6">Selected Work</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
            Projects I've <span className="text-gradient">Worked On</span>
          </h2>
        </div>

        {/* Live websites */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-6">Live Websites</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {liveProjects.map((project) => (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card editorial-card group rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#161821] border-b border-white/[0.06]">
                <img
                  src={project.image}
                  alt={`${project.title} website preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <span className="text-xs font-mono text-amber-300 mb-2">{project.type}</span>
                <h3 className="text-xl font-bold text-white font-heading mb-3">{project.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">{project.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Development projects */}
        <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-6">More Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project) => {
            const IconComponent = projectIcons[project.icon] || LayoutDashboard
            return (
              <div key={project.id} className="project-card editorial-card rounded-2xl p-7 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">{project.title}</h3>
                  <span className="block text-xs font-mono text-zinc-500 mt-1 mb-3">{project.type}</span>
                  <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
