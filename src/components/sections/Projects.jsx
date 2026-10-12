import React, { useRef, useEffect, useState } from 'react'
import { projectsData } from '../../data/portfolioData'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { ExternalLink, Sparkles, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react'
import { GithubIcon } from '../SocialIcons'

export default function Projects() {
  const sectionRef = useRef(null)
  const projectsGridRef = useRef(null)
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'featured'
    ? projectsData.filter(p => p.featured)
    : projectsData

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Card lift and stagger on scroll trigger
      gsap.fromTo(
        '.project-card',
        {
          opacity: 0,
          y: 60,
          rotateX: 12,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [filter])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-cosmic-grid border-t border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Animated Gradient Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Featured Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
              Selected Projects &amp; <span className="text-gradient-aurora">Case Studies</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 mt-2 max-w-2xl">
              High-impact digital platforms engineered for velocity, flawless typography, and intuitive motion.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] backdrop-blur-md self-start md:self-auto shadow-md">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === 'all'
                  ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.4)]'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              All Builds ({projectsData.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('featured')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === 'featured'
                  ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.4)]'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              Featured Highlights
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="project-card cosmic-card group rounded-3xl overflow-hidden flex flex-col justify-between"
              style={{
                perspective: '1000px'
              }}
            >
              {/* Top Image Preview Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                {/* Metric Badge with Cyan Glow */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-slate-950/85 border border-white/10 backdrop-blur-md text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  <span>{project.metrics}</span>
                </div>

                {/* Quick Action Overlay Buttons */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="p-2 rounded-full bg-slate-900/80 border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-400 hover:scale-110 transition-all backdrop-blur-md"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo for ${project.title}`}
                    className="p-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-white hover:scale-110 shadow-[0_0_18px_rgba(6,182,212,0.5)] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      0{idx + 1} // Project
                    </span>
                    <span className="text-xs font-mono text-cyan-300">
                      {project.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags and CTA Links */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/[0.08] text-[11px] font-mono text-zinc-300 group-hover:border-cyan-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors group/link"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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

        {/* Bottom CTA Card */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-300 mb-4">
            Looking for something specific or customized architecture?
          </p>
          <a
            href="#contact"
            className="btn-cosmic-glow inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-mono text-white font-semibold transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <span>Discuss your custom requirements &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  )
}
