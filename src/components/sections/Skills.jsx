import React, { useState, useRef, useEffect } from 'react'
import { skillsData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import {
  Code2,
  FileCode,
  Palette,
  Globe,
  Server,
  Network,
  Database,
  GitBranch,
  Layout,
  Layers,
  Sparkles,
  FileSpreadsheet,
  FileText
} from 'lucide-react'

const iconComponents = {
  Code2,
  FileCode,
  Palette,
  Globe,
  Server,
  Network,
  Database,
  GitBranch,
  Layout,
  Layers,
  Sparkles,
  FileSpreadsheet,
  FileText
}

// Rotating soft accent colors for icon tiles
const iconTints = [
  'text-amber-300 bg-amber-400/10 border-amber-400/20',
  'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  'text-indigo-300 bg-indigo-400/10 border-indigo-400/20',
  'text-rose-300 bg-rose-400/10 border-rose-400/20'
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 18, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="section-badge mb-6">{skillsData.badge}</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {skillsData.categories.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === idx
                  ? 'bg-white text-zinc-950 font-semibold'
                  : 'bg-[#13141b] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.categories[activeCategory].skills.map((skill, i) => {
            const IconComponent = iconComponents[skill.icon] || Code2
            return (
              <div key={skill.name} className="skill-card editorial-card p-6 rounded-2xl flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${iconTints[i % iconTints.length]}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-white leading-snug">{skill.name}</h4>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
