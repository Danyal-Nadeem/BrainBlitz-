
import type { Category } from '../../types'

interface CategoryCardProps {
  category: Category
  selected: boolean
  onSelect: () => void
}

export default function CategoryCard({ category, selected, onSelect }: CategoryCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative p-[18px] rounded-2xl flex flex-col items-center justify-between gap-3.5 w-full transition-all duration-300 cursor-pointer min-h-[140px] border glass-surface ${
        selected
          ? 'border-[#7c6af7] bg-[#7c6af7]/[0.14] scale-[1.02] shadow-[0_0_16px_rgba(124,106,247,0.25)]'
          : 'hover:-translate-y-[3px] hover:border-[#7c6af7] hover:bg-white/[0.03] border-white/10'
      }`}
    >
      <span className="text-4xl transition-transform duration-300 hover:scale-110 select-none" role="img" aria-label={category.name}>
        {category.emoji}
      </span>
      
      <div className="flex flex-col items-center gap-1.5 w-full">
        <span
          className={`font-display font-bold text-xs text-center leading-tight tracking-wide transition-colors duration-300 ${
            selected ? 'text-white' : 'text-[#e8eaf6]/65'
          }`}
        >
          {category.name}
        </span>
        <span
          className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border transition-all duration-300 ${
            selected 
              ? 'bg-[#22d97a]/15 text-[#22d97a] border-[#22d97a]/30' 
              : 'bg-white/[0.03] text-[#e8eaf6]/30 border-transparent'
          }`}
        >
          {category.count} Qs
        </span>
      </div>
      
      {/* Top right checkmark badge when selected */}
      {selected && (
        <span className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#22d97a] text-[#080b12] text-[10px] font-extrabold shadow-sm animate-popIn">
          ✓
        </span>
      )}
    </button>
  )
}

