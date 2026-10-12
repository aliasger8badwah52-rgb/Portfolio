import React, { useState, useRef, useEffect } from 'react'
import { skillsData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
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
  Film,
  CheckCircle2,
  ShieldCheck,
  Gauge
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

// Authentic real-world context for each skill
const skillContextMap = {
  "React 18 / 19": "Concurrent mode, server actions, complex hook architecture",
  "TypeScript / JavaScript": "Strict type systems, generative types, contract validation",
  "GSAP & ScrollTrigger": "60 FPS scroll timelines, FLIP animations, SVG motion",
  "Tailwind CSS & PostCSS": "Design token sync, responsive layout systems, custom utilities",
  "Next.js / SSR / RSC": "App router, streaming architecture, edge functions",
  "HTML5 / Semantic A11y": "WCAG 2.1 AA compliance, screen-reader semantics, ARIA",
  "Node.js & Express": "RESTful endpoints, middleware architecture, microservices",
  "REST & GraphQL APIs": "Query optimization, schema validation, real-time caching",
  "PostgreSQL & Prisma": "Relational schema design, ORM migrations, query indexing",
  "Supabase & Firebase": "Auth pipelines, row-level security, real-time sync",
  "Serverless & Edge Functions": "Low-latency regional workers, serverless endpoints",
  "Vite / Turbopack / Webpack": "Bundle optimization, code-splitting, tree-shaking",
  "Git / GitHub Actions CI/CD": "Automated test pipelines, release branching, preview builds",
  "Docker & Containerization": "Reproducible build environments, local service mocks",
  "Vercel / AWS Amplify": "Zero-downtime deployment, DNS management, edge caching",
  "Vitest & Playwright E2E": "Unit testing, integration suites, cross-browser automation",
  "Figma to Code Precision": "Pixel-accurate handoff, design system token alignment",
  "Micro-interactions & UX": "Haptic feedback cues, responsive transitions, reduced motion",
  "Responsive & Adaptive Layouts": "Fluid clamp typography, container queries, mobile-first",
  "Design Token Architecture": "Unified design tokens across CSS, Tailwind & Figma",
  "Motion Prototyping": "Interactive animation choreography, timeline staging"
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger cards in with subtle scale
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 16, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  // 3D tilt micro-interaction on skill card hover
  const handleCardMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, {
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      transformPerspective: 800,
      duration: 0.25,
      ease: 'power1.out'
    })
  }

  const handleCardMouseLeave = (card) => {
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
      className="relative py-28 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141b] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
            <span>{skillsData.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-3">
            Technical Stack &amp;{' '}
            <span className="text-zinc-400 font-medium">Domain Expertise</span>
          </h2>
          <p className="text-base text-zinc-400">
            {skillsData.subheading}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {skillsData.categories.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeCategory === idx
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'bg-[#13141b] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category Description Banner */}
        <div className="mb-8 p-4 rounded-xl bg-[#13141b]/60 border border-white/[0.06] flex items-center justify-between">
          <p className="text-xs sm:text-sm text-zinc-400">
            {skillsData.categories[activeCategory].description}
          </p>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            {skillsData.categories[activeCategory].skills.length} Core Competencies
          </span>
        </div>

        {/* Skills Matrix Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillsData.categories[activeCategory].skills.map((skill) => {
            const IconComponent = iconComponents[skill.icon] || Code2
            const contextText = skillContextMap[skill.name] || "Production engineering & architectural implementation"

            return (
              <div
                key={skill.name}
                onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                className="skill-card editorial-card p-5 rounded-xl flex flex-col justify-between cursor-default"
              >
                <div>
                  {/* Header: Icon, Name & Tag */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-200">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {skillsData.categories[activeCategory].name}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1e2a] border border-white/10 text-zinc-300">
                      {skill.tag}
                    </span>
                  </div>

                  {/* Real production usage description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    {contextText}
                  </p>
                </div>

                {/* Subtle verified in production badge */}
                <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Production Verified
                  </span>
                  <span>Active</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Engineering Standards Checklist */}
        <div className="mt-12 p-6 rounded-xl editorial-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Gauge className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Sub-second LCP</p>
              <p className="text-[11px] text-zinc-400">Optimized critical rendering path</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">WCAG 2.1 AA A11y</p>
              <p className="text-[11px] text-zinc-400">Accessible keyboard navigation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-zinc-300 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Tokenized Architecture</p>
              <p className="text-[11px] text-zinc-400">Scalable modular design tokens</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-zinc-300 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">60 FPS Motion</p>
              <p className="text-[11px] text-zinc-400">Hardware-accelerated transforms</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
