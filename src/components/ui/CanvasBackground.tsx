import { useEffect, useRef } from 'react'

interface Orb {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  r: number;
  color: string;
  speed: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alphaPhase: number;
  alphaSpeed: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Create 5 orbs
    const orbs: Orb[] = [
      { baseX: 0, baseY: 0, x: 0, y: 0, r: 230, color: 'rgb(34,217,122)', speed: 0.006, phase: Math.random() * 100 },
      { baseX: width, baseY: 0, x: width, y: 0, r: 260, color: 'rgb(124,106,247)', speed: 0.004, phase: Math.random() * 100 },
      { baseX: width / 2, baseY: height, x: width / 2, y: height, r: 180, color: 'rgb(247,160,56)', speed: 0.007, phase: Math.random() * 100 },
      { baseX: 0, baseY: height, x: 0, y: height, r: 150, color: 'rgb(124,106,247)', speed: 0.005, phase: Math.random() * 100 },
      { baseX: width, baseY: height, x: width, y: height, r: 170, color: 'rgb(34,217,122)', speed: 0.008, phase: Math.random() * 100 },
    ]

    // Create 65-70 floating particles
    const particleCount = 68
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.3 + Math.random() * 1.4, // r=0.3 to 1.7px
        vx: -0.3 + Math.random() * 0.6, // vx/vy +/-0.3
        vy: -0.3 + Math.random() * 0.6,
        alphaPhase: Math.random() * Math.PI * 2,
        alphaSpeed: 0.005 + Math.random() * 0.015,
      })
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      // Update orb bases
      orbs[0].baseX = 0
      orbs[0].baseY = 0
      
      orbs[1].baseX = width
      orbs[1].baseY = 0
      
      orbs[2].baseX = width / 2
      orbs[2].baseY = height
      
      orbs[3].baseX = 0
      orbs[3].baseY = height
      
      orbs[4].baseX = width
      orbs[4].baseY = height
    }

    window.addEventListener('resize', handleResize)

    const draw = () => {
      // Base fill: #080b12 on every frame
      ctx.fillStyle = '#080b12'
      ctx.fillRect(0, 0, width, height)

      // Draw orbs
      orbs.forEach((orb) => {
        orb.phase += orb.speed
        
        // Pulse via Math.sin(phase) * 0.12 + 0.12 opacity
        const opacity = Math.sin(orb.phase) * 0.12 + 0.12
        
        // Let the positions float around their base position slightly
        const driftX = Math.sin(orb.phase * 0.4) * 80
        const driftY = Math.cos(orb.phase * 0.4) * 80
        orb.x = orb.baseX + driftX
        orb.y = orb.baseY + driftY

        // Draw radial gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        
        // Convert rgb to rgba for transparent edges
        const rgbMatch = orb.color.match(/\d+,\s*\d+,\s*\d+/)
        if (rgbMatch) {
          const rgb = rgbMatch[0]
          gradient.addColorStop(0, `rgba(${rgb}, ${opacity})`)
          gradient.addColorStop(0.5, `rgba(${rgb}, ${opacity * 0.4})`)
          gradient.addColorStop(1, `rgba(${rgb}, 0)`)
        } else {
          gradient.addColorStop(0, orb.color)
          gradient.addColorStop(1, 'rgba(0,0,0,0)')
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        p.alphaPhase += p.alphaSpeed
        // alpha fades in/out continuously
        const alpha = (Math.sin(p.alphaPhase) + 1) / 2 // 0 to 1

        ctx.fillStyle = `rgba(232, 234, 246, ${alpha * 0.4})` // --text color with faded alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  )
}
