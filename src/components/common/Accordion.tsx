import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

export interface AccordionItem {
  id: string
  questionKey: string
  /** Short identifier badge shown before the question, e.g. "A1". */
  label?: string
  /** Rendered inside the expanded answer body, after the translated answer text. */
  extra?: ReactNode
}

export default function Accordion({ items, answerKey }: { items: AccordionItem[]; answerKey: (id: string) => string }) {
  const { t } = useLang()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className="bg-white/[0.02]">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start text-sm font-medium text-slate-200 hover:bg-white/5"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-2.5">
                {item.label && (
                  <span className="mt-0.5 shrink-0 rounded-md bg-teal-500/15 px-1.5 py-0.5 font-mono text-[11px] font-bold text-teal-300">
                    {item.label}
                  </span>
                )}
                <span>{t(item.questionKey)}</span>
              </span>
              <ChevronDown size={16} className={`shrink-0 text-teal-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="animate-fadeIn px-4 pb-4 text-sm text-slate-400">
                <p>{t(answerKey(item.id))}</p>
                {item.extra}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
