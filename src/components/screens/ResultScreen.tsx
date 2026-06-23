

import { useState } from 'react'
import type { QuizState } from '../../types'
import ConfettiBlast from '../ui/ConfettiBlast'

interface ResultScreenProps {
  state: QuizState
  onRetry: () => void
  onHome: () => void
}

export default function ResultScreen({ state, onHome }: ResultScreenProps) {
  const [openRows, setOpenRows] = useState<Set<number>>(new Set())
  const [showBreakdown, setShowBreakdown] = useState(false)

  const totalQuestions = state.questions.length
  const correctAnswersCount = state.answers.filter((a) => a.isCorrect).length
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0

  const toggleRow = (i: number) => {
    setOpenRows((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const getHeaderInfo = () => {
    if (accuracy >= 80) return { icon: '🏆', title: 'Excellent!' }
    if (accuracy >= 60) return { icon: '⭐', title: 'Great!' }
    if (accuracy >= 40) return { icon: '💪', title: 'Alright' }
    return { icon: '🎯', title: 'Try Again' }
  }

  const { icon, title } = getHeaderInfo()

  return (
    <div className="min-h-screen relative flex flex-col justify-center px-6 py-12">
      <style>{`
        @keyframes iconBounce {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-iconBounce {
          animation: iconBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease forwards;
        }
        @keyframes expandSection {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 2000px; }
        }
        .animate-expandSection {
          animation: expandSection 0.3s ease forwards;
          overflow: hidden;
        }
      `}</style>

      {accuracy >= 70 && <ConfettiBlast />}

      <div className="relative z-10 max-w-[460px] mx-auto w-full flex flex-col justify-center text-center">

        {/* ICON & TITLE */}
        <div className="mb-3">
          <div
            className="text-[64px] mb-3 select-none inline-block animate-iconBounce"
            role="img"
            aria-label={title}
          >
            {icon}
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#e8eaf6] tracking-tight">
            {title}
          </h2>
          {state.topic && (
            <p className="text-xs text-[#6b7099] font-mono mt-1">
              Topic: <span className="text-[#7c6af7]">{state.topic}</span>
            </p>
          )}
        </div>

        {/* 3-STAT GRID */}
        <div className="grid grid-cols-3 gap-3.5 mb-8 mt-5">
          <div className="glass-surface p-4 rounded-2xl text-center border border-white/[0.08] shadow-sm">
            <span className="text-[#7c6af7] font-display font-extrabold text-2xl sm:text-3xl block leading-none select-none">
              {state.score}
            </span>
            <span className="block text-[#6b7099] text-[10px] uppercase font-bold tracking-[2px] mt-2 select-none">
              Score
            </span>
          </div>
          <div className="glass-surface p-4 rounded-2xl text-center border border-white/[0.08] shadow-sm">
            <span className="text-[#22d97a] font-display font-extrabold text-2xl sm:text-3xl block leading-none select-none">
              {correctAnswersCount}/{totalQuestions}
            </span>
            <span className="block text-[#6b7099] text-[10px] uppercase font-bold tracking-[2px] mt-2 select-none">
                Correct Answers
            </span>
          </div>
          <div className="glass-surface p-4 rounded-2xl text-center border border-white/[0.08] shadow-sm">
            <span className="text-[#f7a038] font-display font-extrabold text-2xl sm:text-3xl block leading-none select-none">
              {accuracy}%
            </span>
            <span className="block text-[#6b7099] text-[10px] uppercase font-bold tracking-[2px] mt-2 select-none">
              Accuracy
            </span>
          </div>
        </div>

        {/* BREAKDOWN LIST */}
        <div className="glass-surface rounded-2xl overflow-hidden flex flex-col border border-white/[0.08] shadow-xl">

          {/* Clickable Header — toggles entire breakdown */}
          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer select-none"
          >
            <span className="font-display font-bold text-xs uppercase tracking-wider text-[#6b7099]">
              Detailed Breakdown
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[#e8eaf6] bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.05]">
                {correctAnswersCount} / {totalQuestions} Correct
              </span>
              <span className={`text-[#6b7099] text-sm transition-transform duration-300 ${showBreakdown ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </div>
          </button>

          {/* Collapsible rows */}
          {showBreakdown && (
            <div className="animate-expandSection divide-y divide-white/[0.05]">
              {state.answers.map((ans, i) => {
                const isOpen = openRows.has(i)
                const correctAnswerText = ans.options[ans.correct] || ''
                const chosenAnswerText = ans.selected !== null ? ans.options[ans.selected] || '' : ''

                return (
                  <div key={i}>
                    {/* Clickable question row */}
                    <button
                      onClick={() => toggleRow(i)}
                      className="w-full flex items-start gap-2 py-3 px-4 text-left hover:bg-white/[0.03] transition-all cursor-pointer"
                    >
                      <span className="text-sm leading-none mt-0.5 select-none flex-shrink-0">
                        {ans.isCorrect ? '✅' : '❌'}
                      </span>
                      <span className="font-body text-[#e8eaf6] text-xs font-semibold flex-1 leading-snug">
                        {ans.question}
                      </span>
                      <span
                        className={`text-[#6b7099] text-xs transition-transform duration-200 select-none flex-shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        ▾
                      </span>
                    </button>

                    {/* Collapsible answer detail */}
                    {isOpen && (
                      <div className="animate-slideDown pl-9 pr-4 pb-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-[#9494b8]/70">
                        <span>
                          Correct:
                          <span className="text-[#22d97a] font-semibold">{correctAnswerText}</span>
                        </span>
                        {!ans.isCorrect && (
                          ans.selected === null ? (
                            <span className="text-[#f7a038] font-bold">Time out</span>
                          ) : (
                            <span>
                               Your:
                              <span className="text-[#f74a4a] font-semibold">{chosenAnswerText}</span>
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

              {state.answers.length === 0 && (
                <div className="px-5 py-8 text-center text-[#6b7099] text-xs font-mono select-none">
                  No question history found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* REPLAY BUTTON */}
        <button
          onClick={onHome}
          className="w-full py-4 rounded-2xl text-xs font-display font-extrabold tracking-[2px] uppercase text-[#080b12] bg-gradient-to-r from-[#7c6af7] to-[#22d97a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(124,106,247,0.4)] cursor-pointer mt-8 flex items-center justify-center gap-2"
        >
           ↩ Play Again
        </button>
      </div>
    </div>
  )
}
