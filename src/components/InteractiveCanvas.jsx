import React, { useEffect, useRef } from 'react'

export default function InteractiveCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = canvas.parentElement.offsetWidth)
    let height = (canvas.height = canvas.parentElement.offsetHeight)

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const particles = []
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75)
    const maxDistance = 120

    const mouse = {
      x: null,
      y: null,
      radius: 140
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 1.5 + 1,
        radius: Math.random() * 1.5 + 1
      })
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('resize', handleResize)
    canvas.parentElement.addEventListener('mousemove', handleMouseMove)
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Drift
        p.x += p.vx
        p.y += p.vy

        // Wrap around bounds
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Mouse interaction: Gentle spring repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.8
            p.x -= (dx / dist) * force
            p.y -= (dy / dist) * force
          }
        }

        // Draw particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(244, 244, 245, 0.25)'
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(244, 244, 245, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove)
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-0 opacity-80"
      aria-hidden="true"
    />
  )
}
