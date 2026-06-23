import { useEffect, useRef } from 'react'
import type { QuizState, OptionState } from '../../types'
import { useTimer } from '../../hooks/useTimer'
import QuizHeader from '../layout/QuizHeader'
import TimerRing from '../ui/TimerRing'
import AnswerOption from '../ui/AnswerOption'
import ProgressBar from '../ui/ProgressBar'

interface QuizScreenProps {
  state: QuizState
  timerDuration: number
  onAnswer: (index: number | null, timeLeft: number) => void
  onExit: () => void
}

export default function QuizScreen({ state, timerDuration, onAnswer, onExit }: QuizScreenProps) {
  const currentQuestion = state.questions[state.current]

  const { timeLeft, progress, reset, stop } = useTimer(timerDuration, () => {
    onAnswer(null, 0)
  })

  // Reset timer on new question
  useEffect(() => {
    reset(timerDuration)
  }, [state.current, reset, timerDuration])

  // Stop timer when answered
  useEffect(() => {
    if (state.answered) {
      stop()
    }
  }, [state.answered, stop])

  // Store timeLeft in ref to avoid stale closures in keyboard listener
  const timeLeftRef = useRef(timeLeft)
  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.answered) {
        const curTime = timeLeftRef.current
        if (e.key === '1') onAnswer(0, curTime)
        if (e.key === '2') onAnswer(1, curTime)
        if (e.key === '3') onAnswer(2, curTime)
        if (e.key === '4') onAnswer(3, curTime)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.answered, onAnswer])

  // ── Error state ──────────────────────────────────────────
  if (state.category === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="font-display font-black text-xl text-[#e8eaf6] mb-2">Generation Failed</h2>
          <p className="text-[#9494b8] text-sm mb-6">
            Failed to generate quiz questions. Please check your API key and try again.
          </p>
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7c6af7] to-[#22d97a] text-[#080b12] font-bold text-sm cursor-pointer hover:-translate-y-0.5 transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) return null

  // ── Option state logic ───────────────────────────────────
  function getOptionState(i: number): OptionState {
    if (!state.answered) return 'idle'
    if (state.selectedIndex === null) {
      return i === currentQuestion.answer ? 'highlight' : 'disabled'
    }
    if (state.selectedIndex === currentQuestion.answer) {
      return i === currentQuestion.answer ? 'correct' : 'disabled'
    } else {
      if (i === currentQuestion.answer) return 'highlight'
      if (i === state.selectedIndex) return 'wrong'
      return 'disabled'
    }
  }

  const optionLabels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']

  const getDifficultyBadge = () => {
    const map = {
      easy:   { color: '#22d97a', label: 'Easy' },
      medium: { color: '#f7a038', label: 'Medium' },
      hard:   { color: '#f74a4a', label: 'Hard' },
    }
    const { color, label } = map[state.difficulty]
    return (
      <span
        className="text-[10px] font-mono px-3 py-1 rounded-full uppercase font-black select-none tracking-widest"
        style={{
          color,
          background: `${color}18`,
          border: `1px solid ${color}40`,
        }}
      >
        {label}
      </span>
    )
  }

  const lastAnswer = state.answers[state.answers.length - 1]

  return (
    <div className="min-h-screen flex flex-col relative">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes feedbackSlide {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes timerPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .animate-slideUpFade  { animation: slideUpFade  0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-feedbackSlide{ animation: feedbackSlide 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-timerPulse   { animation: timerPulse   0.9s ease-in-out infinite; }
        .animate-shake        { animation: shake        0.4s ease; }
      `}</style>

      {/* HEADER */}
      <QuizHeader
        category={state.category}
        topic={state.topic}
        current={state.current}
        total={state.questions.length}
        score={state.score}
        onExit={onExit}
      />

      {/* PROGRESS BAR */}
      <ProgressBar current={state.current + 1} total={state.questions.length} />

      {/* BODY */}
      <main className="flex-grow max-w-[660px] mx-auto w-full px-5 pb-6 pt-2 flex flex-col justify-center gap-3">

        {/* TIMER */}
        <div className="flex justify-center">
          <TimerRing timeLeft={timeLeft} progress={progress} duration={timerDuration} />
        </div>

        {/* QUESTION CARD — gradient border wrapper */}
        <div
          key={state.current}
          className="animate-slideUpFade relative rounded-[28px] p-[2px]"
          style={{ background: 'linear-gradient(135deg, #7c6af7 0%, #06b6d4 50%, #22d97a 100%)' }}
        >
          <div
            className="rounded-[24px] px-5 py-3 w-full"
            style={{ background: 'rgba(8, 11, 18, 0.96)', backdropFilter: 'blur(20px)' }}
          >
            {/* Top row: question counter + difficulty */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono font-bold tracking-[2.5px] uppercase text-[#6b7099] select-none">
                Q {state.current + 1} / {state.questions.length}
              </span>
              {getDifficultyBadge()}
            </div>

            {/* Watermark number */}
            <div className="relative mb-3">
              <span
                className="absolute -top-3 -right-2 font-display font-black text-[80px] leading-none select-none pointer-events-none"
                style={{ color: 'rgba(124,106,247,0.06)' }}
              >
                {state.current + 1}
              </span>
              <p className="font-display font-bold text-[#e8eaf6] text-[17px] leading-[1.45] relative z-10">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-1.5">
              {optionLabels.map((label, i) => (
                <AnswerOption
                  key={i}
                  label={label}
                  text={currentQuestion.options[i]}
                  state={getOptionState(i)}
                  disabled={state.answered}
                  onClick={() => onAnswer(i, timeLeft)}
                />
              ))}
            </div>

            {/* FEEDBACK BANNER */}
            {state.answered && (
              <div className="mt-5 animate-feedbackSlide">
                {state.selectedIndex === null ? (
                  // Timeout
                  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(247,160,56,0.25), rgba(247,160,56,0.08))', border: '1px solid rgba(247,160,56,0.35)' }}
                  >
                    <span className="text-xl select-none">⏱</span>
                    <div>
                      <p className="text-[#f7a038] font-black text-xs font-mono tracking-wider uppercase">Time's Up!</p>
                      <p className="text-[#e8eaf6]/70 text-xs mt-0.5">
                        Correct: <span className="text-[#22d97a] font-semibold">{currentQuestion.options[currentQuestion.answer]}</span>
                      </p>
                    </div>
                  </div>
                ) : state.selectedIndex === currentQuestion.answer ? (
                  // Correct
                  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(34,217,122,0.25), rgba(34,217,122,0.08))', border: '1px solid rgba(34,217,122,0.35)' }}
                  >
                    <span className="text-xl select-none">✨</span>
                    <div>
                      <p className="text-[#22d97a] font-black text-xs font-mono tracking-wider uppercase">Correct!</p>
                      <p className="text-[#e8eaf6]/70 text-xs mt-0.5">
                        +<span className="text-[#22d97a] font-semibold">{lastAnswer?.points || 0}</span> points earned
                      </p>
                    </div>
                  </div>
                ) : (
                  // Wrong
                  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(247,74,74,0.25), rgba(247,74,74,0.08))', border: '1px solid rgba(247,74,74,0.35)' }}
                  >
                    <span className="text-xl select-none">✗</span>
                    <div>
                      <p className="text-[#f74a4a] font-black text-xs font-mono tracking-wider uppercase">Incorrect</p>
                      <p className="text-[#e8eaf6]/70 text-xs mt-0.5">
                        Correct: <span className="text-[#22d97a] font-semibold">{currentQuestion.options[currentQuestion.answer]}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Keyboard hint */}
            <p className="text-[#6b7099]/30 text-[10px] font-mono text-center mt-4 hidden sm:block select-none tracking-wider">
              Press  1 · 2 · 3 · 4  to select
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
