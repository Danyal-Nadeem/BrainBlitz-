import { useMemo } from 'react'

const COLORS = ['#6EE7B7', '#3B82F6', '#F59E0B', '#EC4899', '#10B981', '#A78BFA']

interface Particle {
  id: number
  left: number
  width: number
  height: number
  color: string
  borderRadius: string
  delay: number
  duration: number
}

export default function ConfettiBlast() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: 6 + Math.random() * 6,
      height: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      delay: Math.random() * 1.2,
      duration: 1.5 + Math.random() * 1.5,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none animate-confetti"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
            animationDelay: `${p.delay}s`,
            ['--duration' as any]: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
