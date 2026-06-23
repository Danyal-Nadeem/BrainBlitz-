interface TimerRingProps {
  timeLeft: number
  progress: number
  duration: number
}

export default function TimerRing({ timeLeft, duration }: TimerRingProps) {
  const ratio = timeLeft / duration
  const isWarning = timeLeft <= 5

  const strokeColor =
    ratio > 0.50 ? '#22d97a' : ratio > 0.25 ? '#f7a038' : '#f74a4a'

  const glowColor =
    ratio > 0.50
      ? 'rgba(34,217,122,0.5)'
      : ratio > 0.25
      ? 'rgba(247,160,56,0.5)'
      : 'rgba(247,74,74,0.5)'

  return (
    <div
      className={`relative w-[72px] h-[72px] mx-auto select-none transition-all duration-300 ${isWarning ? 'animate-timerPulse' : ''}`}
      style={isWarning ? { filter: `drop-shadow(0 0 10px ${glowColor})` } : {}}
    >
      <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle
          cx="44"
          cy="44"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        {/* Arc */}
        <circle
          cx="44"
          cy="44"
          r="38"
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeDasharray="239"
          strokeDashoffset={239 * (1 - ratio)}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease',
            filter: `drop-shadow(0 0 6px ${glowColor})`,
          }}
        />
      </svg>
      {/* Center number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-black text-[26px] tabular-nums leading-none"
          style={{ color: strokeColor, textShadow: `0 0 12px ${glowColor}` }}
        >
          {timeLeft}
        </span>
        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest mt-0.5">
          sec
        </span>
      </div>
    </div>
  )
}
