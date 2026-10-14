import React, { useState, useEffect, useRef } from 'react'
import { personalInfo, navLinks } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { Menu, X } from 'lucide-react'
import MagneticElement from '../MagneticElement'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const mobileMenuRef = useRef(null)
  const menuLinksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      const sections = navLinks.map((link) => link.href.substring(1))
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

  // animate Mobile menu open/close
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(mobileMenuRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' })
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
    const targetElement = document.getElementById(href.replace('#', ''))

    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'py-3.5 bg-[#0c0d12]/85 backdrop-blur-md border-b border-white/[0.06] shadow-md shadow-black/20'
          : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-3 focus:outline-none"
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-lg bg-[#161821] border border-white/10 flex items-center justify-center font-heading font-bold text-sm text-amber-300 group-hover:border-white/25 transition-all">
              <span>{personalInfo.initial}</span>
            </div>
            <span className="text-base font-semibold tracking-tight text-white">{personalInfo.name}</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#13141b]/90 border border-white/[0.08] backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3.5 py-1 text-sm font-medium rounded-full transition-all duration-150 ${isActive
                    ? 'bg-white/[0.09] text-white border border-white/10'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                    }`}
                >
                  {link.name}
                </a>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticElement strength={0.3}>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                id="nav-cta-talk"
                className="btn-editorial-primary inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold"
              >
                Let's Connect
              </a>
            </MagneticElement>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#161821] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-[#0c0d12]/98 backdrop-blur-xl flex flex-col justify-between p-6 pt-28 md:hidden"
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1)
              return (
                <a
                  key={link.name}
                  ref={(el) => (menuLinksRef.current[idx] = el)}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`py-4 px-5 rounded-xl text-lg font-medium transition-colors ${isActive ? 'bg-white/[0.08] text-white border border-white/10' : 'text-zinc-300 hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </a>
              )
            })}
          </nav>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="btn-editorial-primary w-full flex items-center justify-center py-3.5 rounded-full font-semibold text-sm"
          >
            Let's Connect
          </a>
        </div>
      )}
    </>
  )
}
