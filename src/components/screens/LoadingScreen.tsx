

import { useState, useEffect } from 'react'

const SUB_TEXTS = [
  'Generating questions...',
  'Mixing answers...',
  'Finalizing quiz...',
];

interface LoadingScreenProps {
  topic: string
}

export default function LoadingScreen({ topic }: LoadingScreenProps) {
  const [subTextIndex, setSubTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSubTextIndex((prev) => (prev + 1) % SUB_TEXTS.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Spinner */}
      <div className="w-14 h-14 rounded-full border-[3px] border-white/5 border-t-[#7c6af7] animate-spin-fast mb-6" />

      {/* Main Text */}
      <h2 className="text-xl sm:text-2xl font-bold font-display text-[#e8eaf6] mb-2 tracking-tight">
        <span className="text-[#7c6af7]">{topic}</span> generating questions...
      </h2>

      {/* Sub Text */}
      <p key={subTextIndex} className="text-sm font-mono text-[#6b7099] animate-popIn">
        {SUB_TEXTS[subTextIndex]}
      </p>
    </div>
  )
}
