import React, { useState, useEffect, useRef } from 'react'
import { personalInfo, navLinks } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import MagneticElement from '../MagneticElement'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const menuLinksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      )
      gsap.fromTo(
        menuLinksRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.05 }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0c0d12]/85 backdrop-blur-md border-b border-white/[0.06] shadow-md shadow-black/20'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-3 focus:outline-none"
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-lg bg-[#161821] border border-white/10 flex items-center justify-center font-mono font-medium text-sm text-zinc-100 group-hover:border-white/25 transition-all">
              <span>AR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[11px] font-normal text-zinc-400">
                Frontend Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#13141b]/90 border border-white/[0.08] backdrop-blur-lg shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3.5 py-1 text-xs lg:text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white/[0.09] text-white font-medium border border-white/10 shadow-inner'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </a>
              )
            })}
          </nav>

          {/* Right Action / Status & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Real status pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141b] border border-white/[0.08] text-[11px] font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Available for Work</span>
            </div>

            <MagneticElement strength={0.3}>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                id="nav-cta-talk"
                className="btn-editorial-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticElement>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#161821] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-[#0c0d12]/98 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 md:hidden"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#13141b] border border-white/10 text-xs font-medium text-zinc-300 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400" />
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
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-white/[0.08] text-white border border-white/10'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`} />
                  </a>
                )
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-editorial-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-center text-xs text-zinc-500 font-mono">
              {personalInfo.email}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
