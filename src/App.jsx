import React, { useEffect, useRef } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import KineticTicker from './components/KineticTicker'
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
    <div className="relative min-h-screen bg-[#0c0d12] text-zinc-100 selection:bg-amber-400/20 selection:text-amber-100">
      
      {/* Ambient subtle spotlight follower on desktop */}
      <div
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-3xl pointer-events-none -z-0 hidden lg:block"
        style={{ willChange: 'transform' }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <KineticTicker />
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
