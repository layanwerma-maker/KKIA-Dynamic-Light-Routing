import type { LucideIcon } from 'lucide-react'
import type { Level } from '../../types'

const ACCENT: Record<Level | 'guidance' | 'neutral', string> = {
  NORMAL: 'text-status-normal',
  ELEVATED: 'text-status-elevated',
  HIGH: 'text-status-high',
  guidance: 'text-status-guidance',
  neutral: 'text-teal-400',
}

export default function KpiCard({
  icon: Icon,
  label,
  value,
  unit,
  accent = 'neutral',
  footnote,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  accent?: Level | 'guidance' | 'neutral'
  footnote?: string
}) {
  return (
    <div className="panel flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
        <Icon size={18} className={ACCENT[accent]} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold tabular-nums ${ACCENT[accent]}`}>{value}</span>
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
      {footnote && <p className="text-[11px] text-slate-500">{footnote}</p>}
    </div>
  )
}
