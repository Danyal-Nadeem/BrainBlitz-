
import { useState } from 'react'
import type { Difficulty } from '../../types'

const SUGGESTIONS = [
  'Space & Astronomy',
  'World History',
  'Human Biology',
  'Python Programming',
  'Islamic History',
  'Cricket',
  'Artificial Intelligence',
  'Chemistry',
  'Mathematics',
  'Pop Culture',
  'General Knowledge',
  'Technology',
  'Geography',
  'Urdu Literature',
  'Pakistan History',
]

const QCOUNTS = [5, 8, 10, 15]

interface HomeScreenProps {
  onStart: (topic: string, difficulty: Difficulty, qcount: number) => void
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  const [topic, setTopic] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium')
  const [qcount, setQcount] = useState(10)

  const timeLimits = { easy: 15, medium: 10, hard: 7 }

  const handleStart = () => {
    if (topic.trim()) {
      onStart(topic.trim(), selectedDifficulty, qcount)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-10">

      {/* HERO / LOGO AREA */}
      <div className="flex flex-col items-center text-center mb-10 mt-6 select-none">
        <div
          className="text-[44px] mb-2 filter drop-shadow-[0_0_18px_#f7a038] animate-floatBrain"
          role="img"
          aria-label="lightning"
        >
          ⚡
        </div>
        <h1 className="text-[46px] font-black tracking-[-2px] font-display text-shimmer">
          BrainBlitz
        </h1>
        <p className="text-[#9494b8] text-sm max-w-sm mt-2 font-medium">
          AI-Powered Quiz — Any topic, any time
        </p>
      </div>

      {/* SECTION 1 — TOPIC INPUT */}
      <div className="w-full max-w-[660px] mb-7">
        <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#6b7099] mb-3 text-left">
          1. Enter your topic
        </p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          placeholder="e.g. Space, Cricket, Islamic History, Python..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-[#e8eaf6] placeholder-white/20 focus:outline-none focus:border-[#7c6af7] transition-all font-mono"
        />

        {/* SUGGESTION PILLS */}
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setTopic(s)}
              className={`text-[11px] px-3 py-1.5 rounded-full border transition-all font-mono cursor-pointer ${topic === s
                  ? 'border-[#7c6af7] text-[#7c6af7] bg-[#7c6af7]/10'
                  : 'border-white/10 text-[#6b7099] hover:border-white/20 hover:text-[#9494b8]'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2 — QUESTION COUNT */}
      <div className="w-full max-w-[660px] mb-7">
        <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#6b7099] mb-3 text-left">
          2. Number of questions
        </p>
        <div className="grid grid-cols-4 gap-3">
          {QCOUNTS.map((n) => (
            <button
              key={n}
              onClick={() => setQcount(n)}
              className={`py-3 rounded-2xl border text-xs font-bold transition-all duration-200 font-display cursor-pointer ${qcount === n
                  ? 'border-[#6ee7b7] text-[#6ee7b7] bg-[#6ee7b7]/10'
                  : 'border-white/10 text-[#9494b8] hover:border-white/20 hover:text-[#e8eaf6]'
                }`}
            >
              {n} Qs
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3 — DIFFICULTY */}
      <div className="w-full max-w-[660px] mb-5">
        <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#6b7099] mb-3 text-left">
          3. Difficulty
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
            const isSelected = selectedDifficulty === diff
            let selectedClass = ''
            if (isSelected) {
              if (diff === 'easy') selectedClass = 'glow-green text-[#22d97a]'
              else if (diff === 'medium') selectedClass = 'glow-amber text-[#f7a038]'
              else selectedClass = 'glow-red text-[#f74a4a]'
            } else {
              selectedClass = 'border-white/10 text-[#9494b8] hover:border-white/20 hover:text-[#e8eaf6]'
            }
            return (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`py-3.5 px-4 rounded-2xl border bg-white/[0.01] text-xs font-bold transition-all duration-300 font-display min-h-[48px] cursor-pointer ${selectedClass}`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)} · {timeLimits[diff]}s
              </button>
            )
          })}
        </div>
      </div>

      {/* TIME HINT */}
      <div className="w-full max-w-[660px] text-center mb-6">
        <p className="text-xs text-[#9494b8] font-mono">
          ⏱ Time limit:{' '}
          <span className="text-[#f7a038] font-semibold">{timeLimits[selectedDifficulty]} seconds</span>{' '}
          per question
        </p>
      </div>

      {/* START BUTTON */}
      <div className="w-full max-w-[660px]">
        <button
          disabled={!topic.trim()}
          onClick={handleStart}
          className={`w-full py-[17px] rounded-2xl font-display font-extrabold text-sm tracking-[1.5px] uppercase text-[#080b12] bg-gradient-to-r from-[#7c6af7] to-[#22d97a] transition-all duration-300 ${!topic.trim()
              ? 'opacity-35 cursor-not-allowed'
              : 'hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(124,106,247,0.4)] cursor-pointer'
            }`}
        >
          Start BrainBlitz ⚡
        </button>
      </div>
    </div>
  )
}
