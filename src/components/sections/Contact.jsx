import React, { useState, useRef, useEffect } from 'react'
import { personalInfo, contactData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { Mail, MapPin, Send, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../SocialIcons'
import WordFlip from '../WordFlip'

const allSocials = [
  { label: 'GitHub', href: personalInfo.socialLinks.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: personalInfo.socialLinks.linkedin, Icon: LinkedinIcon },
  { label: 'Twitter', href: personalInfo.socialLinks.twitter, Icon: TwitterIcon }
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Only show contact details that have actually been filled in
  const socials = allSocials.filter((s) => s.href)
  const hasInfo = Boolean(personalInfo.email || personalInfo.location || socials.length)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade-item',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // No backend yet: open the visitor's email app with the message pre-filled
  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`)
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="section-badge mb-6">{contactData.badge}</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-5">
            {contactData.heading}{' '}
            <WordFlip
              words={['Connect.', 'Talk Code.', 'Build Big.', 'Team Up.']}
              className="text-gradient font-bold"
            />
          </h2>
          <p className="text-lg text-zinc-400">{contactData.subheading}</p>
        </div>

        <div className={hasInfo ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start' : 'max-w-2xl mx-auto'}>

          {/* Contact details (only when provided) */}
          {hasInfo && (
            <div className="lg:col-span-5 space-y-5">
              {personalInfo.email && (
                <div className="contact-fade-item editorial-card p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase text-zinc-500">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-base font-semibold text-white hover:text-amber-300 transition-colors break-words inline-flex items-center gap-1"
                    >
                      {personalInfo.email}
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>
                </div>
              )}

              {personalInfo.location && (
                <div className="contact-fade-item editorial-card p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-zinc-500">Location</p>
                    <p className="text-base font-semibold text-white">{personalInfo.location}</p>
                  </div>
                </div>
              )}

              {socials.length > 0 && (
                <div className="contact-fade-item flex items-center gap-3 pt-2">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-12 h-12 rounded-xl bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <div className={hasInfo ? 'lg:col-span-7' : ''}>
            <form onSubmit={handleSubmit} className="contact-fade-item editorial-card rounded-2xl p-8 sm:p-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="field"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className="field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="field resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="btn-editorial-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
