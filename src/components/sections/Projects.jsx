import React, { useRef, useEffect, useState } from 'react'
import { projectsData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../SocialIcons'
import MagneticElement from '../MagneticElement'

export default function Projects() {
  const sectionRef = useRef(null)
  const projectsGridRef = useRef(null)
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'featured'
    ? projectsData.filter(p => p.featured)
    : projectsData

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger project cards entrance
      gsap.fromTo(
        '.project-card',
        { 
          opacity: 0, 
          y: 40,
          scale: 0.97
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Parallax image shift on scroll
      gsap.utils.toArray('.project-parallax-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [filter])

  // Card 3D tilt on hover
  const handleCardMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(card, {
      rotateX: -y * 0.035,
      rotateY: x * 0.035,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power1.out'
    })
  }

  const handleCardMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)'
    })
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141b] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-2">
              Featured Projects &amp; <span className="text-zinc-400 font-medium">Case Studies</span>
            </h2>
            <p className="text-base text-zinc-400 max-w-2xl">
              Production web applications engineered for speed, clean typography, and intuitive motion.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#13141b] border border-white/[0.08] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Builds ({projectsData.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('featured')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === 'featured'
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Featured Only
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
              className="project-card editorial-card group rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Top Image Preview Container with Parallax Effect */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#161821] border-b border-white/[0.06]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-parallax-img w-full h-[110%] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Metric Badge */}
                <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 rounded-md bg-[#0c0d12]/90 border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{project.metrics}</span>
                </div>

                {/* Quick Action Overlay Buttons */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="p-2 rounded-lg bg-[#0c0d12]/80 hover:bg-white hover:text-black border border-white/10 text-zinc-300 transition-all backdrop-blur-md"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo for ${project.title}`}
                    className="p-2 rounded-lg bg-[#0c0d12]/80 hover:bg-white hover:text-black border border-white/10 text-zinc-300 transition-all backdrop-blur-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase">
                      0{idx + 1} / Project
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {project.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors font-heading mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                {/* Tags and CTA Links */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#181a24] border border-white/[0.06] text-[11px] font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-zinc-300 transition-colors group/link"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Invite Banner */}
        <div className="mt-14 p-6 rounded-xl editorial-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-0.5">Need a bespoke frontend solution?</h4>
            <p className="text-xs text-zinc-400">Available for select consulting contracts and senior engineering engagements.</p>
          </div>
          <MagneticElement strength={0.3}>
            <a
              href="#contact"
              className="btn-editorial-primary px-4 py-2 rounded-lg text-xs font-semibold flex-shrink-0 inline-flex items-center gap-1"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </MagneticElement>
        </div>

      </div>
    </section>
  )
}
