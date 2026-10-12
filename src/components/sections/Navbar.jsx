import React, { useState, useEffect, useRef } from 'react'
import { personalInfo, navLinks } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const menuLinksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Check current active section
      const sections = navLinks.map(link => link.href.substring(1))
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate mobile menu open/close
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      )
      gsap.fromTo(
        menuLinksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const navHeight = 80
      const targetPosition = targetElement.offsetTop - navHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'py-3.5 bg-[#07090e]/85 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-cyan-950/20'
            : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Mark */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-2.5 focus:outline-none"
            id="nav-logo"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-zinc-900 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-lg text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300">
              <span className="relative z-10 tracking-tighter">AR</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {personalInfo.preferredName}
                <span className="text-cyan-400">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">
                Frontend Eng.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-zinc-900/60 border border-white/[0.06] backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.25)] -z-10" />
                  )}
                  {link.name}
                </a>
              )
            })}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Availability status badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Open to Projects</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              id="nav-cta-talk"
              className="btn-cosmic-glow relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs lg:text-sm font-semibold text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-[#07090e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 mb-4 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-xs font-mono text-emerald-300 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Available for Hire</span>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1)
                return (
                  <a
                    key={link.name}
                    ref={(el) => (menuLinksRef.current[idx] = el)}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-medium transition-colors ${isActive
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-zinc-600'}`} />
                  </a>
                )
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-cosmic-glow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <span>Let's Talk</span>
              <Sparkles className="w-4 h-4" />
            </a>
            <p className="text-center text-xs font-mono text-zinc-500">
              {personalInfo.email}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
