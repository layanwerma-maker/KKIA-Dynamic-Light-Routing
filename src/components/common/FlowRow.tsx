import { ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

interface FlowRowProps {
  /** Either translation keys (default) or literal display strings (raw). */
  items: string[]
  /** When true, items are rendered as-is instead of passed through t(). */
  raw?: boolean
}

export default function FlowRow({ items, raw = false }: FlowRowProps) {
  const { t, dir } = useLang()
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <div key={`${item}-${i}`} className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/5 px-3 py-1.5 text-xs font-semibold text-teal-200 sm:text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-[10px] text-teal-300">
              {i + 1}
            </span>
            {raw ? item : t(item)}
          </div>
          {i < items.length - 1 && (
            <ArrowRight size={14} className={`shrink-0 text-slate-600 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}
