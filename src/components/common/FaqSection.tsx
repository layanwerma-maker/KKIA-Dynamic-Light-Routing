import { useMemo, useState, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import Accordion, { type AccordionItem } from './Accordion'

export interface FaqQuestionItem {
  /** Matches the numeric suffix of faq.q<n> / faq.a<n> translation keys, e.g. "q1". */
  id: string
  category: string
  extra?: ReactNode
}

export interface FaqCategoryDef {
  id: string
  labelKey: string
}

export default function FaqSection({ items, categories }: { items: FaqQuestionItem[]; categories: FaqCategoryDef[] }) {
  const { t } = useLang()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false
      if (!q) return true
      const questionText = t(`faq.${item.id}`).toLowerCase()
      const answerText = t(`faq.a${item.id.slice(1)}`).toLowerCase()
      return questionText.includes(q) || answerText.includes(q)
    })
  }, [items, activeCategory, query, t])

  const accordionItems: AccordionItem[] = filtered.map((item) => ({
    id: item.id,
    questionKey: `faq.${item.id}`,
    extra: item.extra,
  }))

  return (
    <div>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="pointer-events-none absolute inset-y-0 start-3 my-auto text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('faq.searchPlaceholder')}
            className="w-full rounded-lg border border-white/15 bg-white/5 py-2 ps-9 pe-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-teal-500/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            activeCategory === null ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'
          }`}
        >
          {t('faq.allCategories')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              activeCategory === cat.id ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {accordionItems.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-6 text-center text-sm text-slate-500">
          {t('faq.noResults')}
        </p>
      ) : (
        <Accordion items={accordionItems} answerKey={(id) => `faq.a${id.slice(1)}`} />
      )}
    </div>
  )
}
