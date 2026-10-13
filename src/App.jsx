import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/sections/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Skills from './components/sections/Skills.jsx'
import Projects from './components/sections/Projects.jsx'
import Experience from './components/sections/Experience.jsx'
import Contact from './components/sections/Contact.jsx'
import Footer from './components/sections/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import { gsap, ScrollTrigger } from './hooks/useGSAP.js'

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0c0d12] text-zinc-100 selection:bg-amber-400/20 selection:text-amber-100">

      {/* Cinematic Opening Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Fluid Interactive Physics Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero preloaderDone={preloaderDone} />
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
