interface QuizHeaderProps {
  category: string | null
  topic: string
  current: number
  total: number
  score: number
  onExit?: () => void
}

export default function QuizHeader({ topic, current, total, score, onExit }: QuizHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-[rgba(8,11,18,0.85)] backdrop-blur-xl border-b border-white/[0.08] px-5 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Left: back button and topic info */}
        <div className="flex items-center gap-2">
          {onExit && (
            <button
              onClick={onExit}
              className="mr-1 text-white/40 hover:text-[#7c6af7] transition-colors p-1 rounded-lg hover:bg-white/[0.05] min-h-[32px] flex items-center justify-center cursor-pointer"
              title="Exit and show results"
              aria-label="Exit quiz"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <span className="text-lg mr-1 select-none" aria-hidden="true">⚡</span>
          <span className="font-semibold text-[#e8eaf6] text-sm tracking-tight">{topic || 'BrainBlitz'}</span>
        </div>

        {/* Center: question counter */}
        <div className="font-display font-bold text-[#e8eaf6] text-sm">
          Q {current + 1} / {total}
        </div>

        {/* Right: score pill */}
        <div className="flex items-center gap-1 bg-[#0e101e]/85 border border-white/[0.08] px-3.5 py-1 rounded-[20px] shadow-sm select-none">
          <span className="text-white text-xs font-bold">⚡ {score}</span>
        </div>
      </div>
    </header>
  )
}

