import React, { useEffect, useRef } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import { gsap } from './hooks/useGSAP'

export default function App() {
  const cursorFollowerRef = useRef(null)

  useEffect(() => {
    // Subtle ambient cursor glow follower on desktop
    const handleMouseMove = (e) => {
      if (cursorFollowerRef.current && window.innerWidth > 1024) {
        gsap.to(cursorFollowerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power2.out'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#07090e] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Ambient cursor follower glow */}
      <div
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-3xl pointer-events-none -z-0 hidden lg:block"
        style={{ willChange: 'transform' }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
