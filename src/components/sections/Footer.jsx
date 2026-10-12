import React from 'react'
import { personalInfo, navLinks, footerData } from '../../data/portfolioData'
import { ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from '../SocialIcons'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="relative bg-[#05070a] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">

      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">

          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-zinc-900 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-lg text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <span>AR</span>
            </div>
            <div>
              <p className="text-base font-bold text-white font-heading">
                {personalInfo.name}
              </p>
              <p className="text-xs font-mono text-zinc-400">
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Social Icons & Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-cyan-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 pl-0 sm:pl-4 sm:border-l sm:border-white/10">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
            id="back-to-top-btn"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
          </button>

        </div>

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>All systems nominal • 60 FPS motion</span>
          </div>

          {/* Copyright notice */}
          <p className="text-center sm:text-right">
            {footerData.copyright}
          </p>

        </div>

      </div>
    </footer>
  )
}
