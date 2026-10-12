import React, { useState, useRef, useEffect } from 'react'
import { personalInfo, contactData } from '../../data/portfolioData'
import { gsap } from '../../hooks/useGSAP'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowUpRight,
  Loader2
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from '../SocialIcons'

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock
}

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'New Project Opportunity',
    budget: '$5k - $15k',
    message: ''
  })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade-item',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 1000)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'New Project Opportunity',
      budget: '$5k - $15k',
      message: ''
    })
    setStatus('idle')
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-[#0c0d12] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13141b] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
            <span>{contactData.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-heading leading-tight mb-2">
            Let's build something <span className="text-zinc-400 font-medium">remarkable.</span>
          </h2>
          <p className="text-base text-zinc-400">
            {contactData.subheading}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Social Connections */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="space-y-3">
              {contactData.infoItems.map((item) => {
                const IconComponent = iconMap[item.icon] || Mail
                return (
                  <div
                    key={item.title}
                    className="contact-fade-item editorial-card p-4 rounded-xl flex items-start gap-3.5 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-300 flex-shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-mono text-zinc-500 uppercase">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-sm font-semibold text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-1 mt-0.5"
                        >
                          <span>{item.value}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                      )}
                      {item.subvalue && (
                        <p className="text-xs text-zinc-500 mt-0.5">{item.subvalue}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Connect Card */}
            <div className="contact-fade-item editorial-card p-5 rounded-xl">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                Professional Networks
              </h4>
              <div className="flex items-center gap-2.5">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#202230] transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#202230] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#202230] transition-all"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socialLinks.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#181a24] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#202230] transition-all"
                  aria-label="Dribbble Profile"
                >
                  <DribbbleIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Editorial Contact Form */}
          <div className="lg:col-span-7">
            <div className="contact-fade-item editorial-card p-6 sm:p-8 rounded-2xl">
              
              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Message Received
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                    Thank you, <span className="text-zinc-200 font-medium">{formData.name}</span>. I have received your note and will get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-[#1a1c27] border border-white/10 text-zinc-200 hover:text-white transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-mono text-zinc-400">
                        Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0f14] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-mono text-zinc-400">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0f14] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Subject / Project Category */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="block text-xs font-mono text-zinc-400">
                        Engagement Type
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0f14] border border-white/10 text-zinc-200 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                      >
                        <option value="New Web Application">New Web Application</option>
                        <option value="Frontend Architecture">Frontend Architecture</option>
                        <option value="GSAP / Motion Design">Motion / GSAP Redesign</option>
                        <option value="Design System Consulting">Design System Consulting</option>
                        <option value="Full-Time Opportunity">Full-Time Opportunity</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="block text-xs font-mono text-zinc-400">
                        Scope / Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0f14] border border-white/10 text-zinc-200 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                      >
                        <option value="< $5k">&lt; $5,000</option>
                        <option value="$5k - $15k">$5,000 - $15,000</option>
                        <option value="$15k - $30k">$15,000 - $30,000</option>
                        <option value="$30k+">$30,000+</option>
                        <option value="Full-Time Employment">Full-Time Role</option>
                      </select>
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-mono text-zinc-400">
                      Project Details <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline your timeline, goals, and core deliverables..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0f14] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    id="contact-submit-btn"
                    className="btn-editorial-primary w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] font-mono text-zinc-500">
                    Direct reply guaranteed within 24 hours.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
