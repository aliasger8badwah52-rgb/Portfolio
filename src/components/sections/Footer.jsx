import React from 'react'
import { personalInfo, navLinks, footerData } from '../../data/portfolioData'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../SocialIcons'

export default function Footer() {
  const scrollToSection = (e, href) => {
    e.preventDefault()
    const targetElement = document.getElementById(href.replace('#', ''))
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' })
    }
  }

  // Only show social links that have been filled in
  const socials = [
    { label: 'GitHub', href: personalInfo.socialLinks.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: personalInfo.socialLinks.linkedin, Icon: LinkedinIcon },
    { label: 'Twitter', href: personalInfo.socialLinks.twitter, Icon: TwitterIcon }
  ].filter((s) => s.href)

  return (
    <footer className="relative bg-[#08090d] border-t border-white/[0.08] py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col items-center gap-8 text-center">
        <p className="text-2xl font-bold font-heading text-white">{personalInfo.name}</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-zinc-400 hover:text-amber-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        )}

        <p className="text-xs font-mono text-zinc-500">{footerData.copyright}</p>
      </div>
    </footer>
  )
}
