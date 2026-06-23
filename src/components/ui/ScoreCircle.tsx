import { useEffect, useState } from 'react'

interface ScoreCircleProps {
  score: number
  total: number
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export default function ScoreCircle({ score, total }: ScoreCircleProps) {
  const CIRCUMFERENCE = 408
  const targetOffset = CIRCUMFERENCE * (1 - (total > 0 ? score / total : 0))

  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const duration = 1400

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeOutCubic(progress)

      setAnimatedOffset(CIRCUMFERENCE - (CIRCUMFERENCE - targetOffset) * easeProgress)
      setAnimatedScore(Math.round(score * easeProgress))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    const animFrame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(animFrame)
  }, [score, total, targetOffset])

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        {/* BG ring */}
        <circle
          cx="80"
          cy="80"
          r="65"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="6"
        />
        {/* Score ring */}
        <circle
          cx="80"
          cy="80"
          r="65"
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="408"
          strokeDashoffset={animatedOffset}
          style={{ filter: 'drop-shadow(0 0 10px rgba(110,231,183,0.3))' }}
        />
      </svg>
      {/* Center content (not rotated) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-extrabold text-5xl text-white tracking-tighter tabular-nums">
          {animatedScore}
        </span>
        <span className="font-mono text-white/40 text-xs mt-1">OF {total} CORRECT</span>
      </div>
    </div>
  )
}
