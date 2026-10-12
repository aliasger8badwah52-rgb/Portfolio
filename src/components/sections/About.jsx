import React, { useRef, useEffect } from 'react'
import { personalInfo, aboutData } from '../../data/portfolioData'
import { gsap, ScrollTrigger } from '../../hooks/useGSAP'
import { Zap, Layers, Sparkles, Code2, ArrowUpRight, Award, Compass, HeartHandshake } from 'lucide-react'

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
      // 1. Image scale-in with clip-path reveal on scroll
      gsap.fromTo(
        imageContainerRef.current,
        {
          clipPath: 'inset(15% 15% 15% 15% round 24px)',
          opacity: 0.2
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo(
        imageRef.current,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // 2. Text Reveal Stagger on scroll
      gsap.fromTo(
        '.about-text-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textContentRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      )

      // 3. Stats Counter Animation on scroll
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
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.highlights-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-cosmic-grid border-t border-white/[0.06]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Animated Gradient Accent */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{aboutData.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Passionate about pixels,{' '}
            <span className="text-gradient-aurora">obsessed with performance.</span>
          </h2>
        </div>

        {/* Main Grid: Portrait and Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">

          {/* Portrait Image with clip-path overflow hidden */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer glowing frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-violet-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

              <div
                ref={imageContainerRef}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 aspect-square shadow-2xl"
              >
                <img
                  ref={imageRef}
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />

                {/* Bottom glass overlay on image */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">{personalInfo.name}</h3>
                    <p className="text-xs font-mono text-cyan-300">{personalInfo.title.split('&')[0]}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Code2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text & Highlights */}
          <div ref={textContentRef} className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
              {aboutData.bioParagraphs.map((para, i) => (
                <p key={i} className="about-text-item text-zinc-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <div className="about-text-item mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="btn-cosmic-glow inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg transition-transform active:scale-95"
              >
                <span>View Portfolio Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-slate-900 border border-white/10 text-zinc-200 hover:border-cyan-400/50 hover:text-white transition-all shadow-md"
              >
                <span>Inspect Technical Stack</span>
              </a>
            </div>
          </div>

        </div>

        {/* Animated Key Stats Counters */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20"
        >
          {aboutData.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="cosmic-card p-6 rounded-2xl relative overflow-hidden group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading mb-2 flex items-baseline">
                <span ref={(el) => (counterRefs.current[idx] = el)}>0</span>
                <span className="text-cyan-400 ml-0.5">{stat.suffix}</span>
              </div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-1">{stat.label}</h4>
              <p className="text-xs text-zinc-400 leading-snug">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Core Personal Highlights Cards */}
        <div className="highlights-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.highlights.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles
            return (
              <div
                key={item.title}
                className="highlight-card cosmic-card p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 font-heading group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>SPECIALIZATION</span>
                  <span className="text-cyan-400">✦</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
