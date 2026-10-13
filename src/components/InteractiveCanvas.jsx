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
    const particleCount = Math.min(Math.floor((width * height) / 12000), 85)
    const maxDistance = 135

    const mouse = {
      x: null,
      y: null,
      radius: 170,
      prevX: null,
      prevY: null,
      speed: 0
    }

    let time = 0

    // Initialize particles with wave frequencies
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseRadius: Math.random() * 1.6 + 0.9,
        radius: Math.random() * 1.6 + 0.9,
        phase: Math.random() * Math.PI * 2,
        frequency: Math.random() * 0.02 + 0.008,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        colorAlpha: Math.random() * 0.35 + 0.2
      })
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const newX = e.clientX - rect.left
      const newY = e.clientY - rect.top

      if (mouse.x !== null && mouse.y !== null) {
        const dx = newX - mouse.x
        const dy = newY - mouse.y
        mouse.speed = Math.min(Math.hypot(dx, dy), 35)
      }

      mouse.x = newX
      mouse.y = newY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
      mouse.speed = 0
    }

    window.addEventListener('resize', handleResize)
    canvas.parentElement.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.015

      // Decay mouse velocity
      mouse.speed *= 0.92

      // Draw subtle mouse aura when present
      if (mouse.x !== null && mouse.y !== null) {
        const mouseGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius
        )
        mouseGradient.addColorStop(0, 'rgba(245, 158, 11, 0.035)')
        mouseGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)')
        mouseGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = mouseGradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Harmonious fluid oscillation
        p.x += p.vx + Math.cos(time + p.phase) * 0.25
        p.y += p.vy + Math.sin(time + p.phase) * 0.25

        // Gentle breathing pulse
        p.radius = p.baseRadius + Math.sin(time * 3 + p.phase) * 0.4

        // Bounds wrapping
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Interactive mouse physics: Vortex & Elastic Repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * (2.2 + mouse.speed * 0.08)
            // Push away
            p.x -= (dx / dist) * force
            p.y -= (dy / dist) * force

            // Slight swirl perpendicular to angle
            const angle = Math.atan2(dy, dx)
            p.x += Math.sin(angle) * (force * 0.3)
            p.y -= Math.cos(angle) * (force * 0.3)
          }
        }

        // Draw particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(p.radius, 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 244, 245, ${p.colorAlpha})`
        ctx.fill()

        // Connect nearby particles with subtle gradient lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.14
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(244, 244, 245, ${alpha})`
            ctx.lineWidth = 0.75
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
