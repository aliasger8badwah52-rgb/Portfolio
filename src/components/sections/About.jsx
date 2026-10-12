import React, { useRef, useEffect } from 'react'
import { personalInfo, aboutData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { Zap, Layers, Sparkles, Code2, ArrowUpRight, Award, Compass, HeartHandshake } from 'lucide-react'
import MagneticElement from '../MagneticElement'

const iconMap = {
  Zap,
  Layers,
  Sparkles,
  Code2,
  Award,
  Compass,
  HeartHandshake
}

export default function About() {
  const sectionRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imageRef = useRef(null)
  const textContentRef = useRef(null)
  const statsContainerRef = useRef(null)
  const counterRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image scale-in reveal on scroll
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0.3, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // 2. Text Reveal Stagger on scroll
      gsap.fromTo(
        '.about-text-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textContentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // 3. Stats Counter Animation on scroll with overshoot
      aboutData.stats.forEach((stat, index) => {
        const el = counterRefs.current[index]
        if (el) {
          const targetValue = stat.number
          const obj = { val: 0 }

          gsap.to(obj, {
            val: targetValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            onUpdate: () => {
              el.innerText = targetValue % 1 !== 0 
                ? obj.val.toFixed(1) 
                : Math.floor(obj.val).toString()
            }
          })
        }
      })

      // 4. Highlights cards stagger
      gsap.fromTo(
        '.highlight-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.highlights-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // 3D Tilt interaction on portrait
  const handlePortraitMouseMove = (e) => {
    const el = imageContainerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      rotateX: -y * 0.04,
      rotateY: x * 0.04,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out'
    })
  }

  const handlePortraitMouseLeave = () => {
    const el = imageContainerRef.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)'
    })
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141b] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
            <span>{aboutData.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight">
            Passionate about details,{' '}
            <span className="text-zinc-400 font-medium">obsessed with performance.</span>
          </h2>
        </div>

        {/* Main Grid: Portrait and Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Portrait Image with 3D Tilt */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div
                ref={imageContainerRef}
                onMouseMove={handlePortraitMouseMove}
                onMouseLeave={handlePortraitMouseLeave}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161821] aspect-[4/5] shadow-xl transition-all cursor-pointer"
              >
                <img
                  ref={imageRef}
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center filter contrast-[1.02]"
                  loading="lazy"
                />

                {/* Bottom clean overlay on image */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/80 to-transparent flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white font-heading">{personalInfo.name}</h3>
                    <p className="text-xs text-zinc-400">{personalInfo.title.split('&')[0]}</p>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#161821] text-zinc-300 border border-white/10">
                    San Francisco / Remote
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text & Highlights */}
          <div ref={textContentRef} className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
              {aboutData.bioParagraphs.map((para, i) => (
                <p key={i} className="about-text-item text-zinc-400 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="about-text-item mt-8 flex flex-wrap gap-3 items-center">
              <MagneticElement strength={0.25}>
                <a
                  href="#projects"
                  className="btn-editorial-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                  <span>View Selected Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticElement>

              <MagneticElement strength={0.25}>
                <a
                  href="#skills"
                  className="btn-editorial-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                >
                  <span>Inspect Technical Stack</span>
                </a>
              </MagneticElement>
            </div>
          </div>

        </div>

        {/* Key Stats Row */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {aboutData.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="editorial-card p-5 rounded-xl hover:translate-y-[-2px] transition-transform"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white font-heading mb-1.5 flex items-baseline">
                <span ref={(el) => (counterRefs.current[idx] = el)}>0</span>
                <span className="text-zinc-400 ml-0.5">{stat.suffix}</span>
              </div>
              <h4 className="text-sm font-medium text-zinc-200 mb-1">{stat.label}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Specialization Pillars */}
        <div className="highlights-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutData.highlights.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles
            return (
              <div
                key={item.title}
                className="highlight-card editorial-card p-5 rounded-xl flex flex-col justify-between hover:translate-y-[-2px] transition-transform"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#1a1c26] border border-white/10 flex items-center justify-center text-zinc-200 mb-4">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5 font-heading">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
                  CORE CAPABILITY
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
