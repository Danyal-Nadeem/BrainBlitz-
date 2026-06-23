import type { CSSProperties } from 'react'
import type { OptionState } from '../../types'

interface AnswerOptionProps {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
  state: OptionState
  disabled: boolean
  onClick: () => void
}

const LABEL_GRADIENTS: Record<string, string> = {
  A: 'from-[#7c6af7] to-[#a78bfa]',
  B: 'from-[#06b6d4] to-[#22d9c8]',
  C: 'from-[#f7a038] to-[#fbbf24]',
  D: 'from-[#f74a4a] to-[#fb7185]',
}

export default function AnswerOption({ label, text, state, disabled, onClick }: AnswerOptionProps) {
  let containerClass = ''
  let badgeClass = ''
  let badgeStyle: CSSProperties = {}

  switch (state) {
    case 'idle':
      containerClass =
        'bg-white/[0.025] border-white/[0.08] hover:translate-x-1 hover:scale-[1.02] hover:border-[#7c6af7]/60 hover:bg-[#7c6af7]/10 hover:shadow-[0_0_20px_rgba(124,106,247,0.15)] active:scale-[0.99] cursor-pointer'
      badgeStyle = {}
      badgeClass = `bg-gradient-to-br ${LABEL_GRADIENTS[label]} opacity-80`
      break
    case 'correct':
      containerClass =
        'border-[#22d97a] bg-gradient-to-r from-[#22d97a]/20 to-[#22d97a]/5 shadow-[0_0_24px_rgba(34,217,122,0.25)]'
      badgeClass = 'bg-[#22d97a]'
      break
    case 'wrong':
      containerClass =
        'border-[#f74a4a] bg-gradient-to-r from-[#f74a4a]/20 to-[#f74a4a]/5 shadow-[0_0_24px_rgba(247,74,74,0.2)] animate-shake'
      badgeClass = 'bg-[#f74a4a]'
      break
    case 'highlight':
      containerClass =
        'border-[#22d97a] bg-gradient-to-r from-[#22d97a]/12 to-[#22d97a]/3 shadow-[0_0_18px_rgba(34,217,122,0.18)]'
      badgeClass = 'bg-[#22d97a]/70'
      break
    case 'disabled':
      containerClass = 'opacity-25 border-white/[0.04] cursor-not-allowed'
      badgeClass = `bg-gradient-to-br ${LABEL_GRADIENTS[label]} opacity-30`
      break
  }

  const labelColorText =
    state === 'idle' || state === 'disabled' ? 'text-white' : 'text-white'

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group flex items-center gap-3 w-full px-3.5 py-2 rounded-xl border transition-all duration-200 text-left min-h-[40px] ${containerClass}`}
    >
      {/* Gradient circle badge */}
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center font-display text-[10px] font-black flex-shrink-0 transition-all duration-200 select-none ${badgeClass} ${labelColorText}`}
        style={badgeStyle}
      >
        {label}
      </span>
      <span className="font-body text-[#e8eaf6]/90 text-[13px] flex-1 leading-snug">
        {text}
      </span>
      {/* Hover arrow indicator */}
      {state === 'idle' && (
        <span className="text-[#7c6af7]/0 group-hover:text-[#7c6af7]/60 transition-all duration-200 text-xs flex-shrink-0 translate-x-0 group-hover:translate-x-1 select-none">
          →
        </span>
      )}
      {state === 'correct' && (
        <span className="text-[#22d97a] text-base flex-shrink-0 select-none">✓</span>
      )}
      {state === 'wrong' && (
        <span className="text-[#f74a4a] text-base flex-shrink-0 select-none">✗</span>
      )}
    </button>
  )
}
