interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full h-[4px] bg-white/[0.05] overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#7c6af7] via-[#06b6d4] to-[#22d97a] transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
