import { MessageCircleQuestion } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import FaqSection, { type FaqCategoryDef, type FaqQuestionItem } from '../components/common/FaqSection'

const CATEGORIES: FaqCategoryDef[] = [
  { id: 'conceptOps', labelKey: 'faqPage.catConceptOps' },
  { id: 'hardware', labelKey: 'faqPage.catHardware' },
  { id: 'safety', labelKey: 'faqPage.catSafety' },
  { id: 'audio', labelKey: 'faqPage.catAudio' },
]

const ITEMS: FaqQuestionItem[] = [
  { id: 'q1', category: 'conceptOps', label: 'A1' },
  { id: 'q2', category: 'conceptOps', label: 'A2' },
  { id: 'q3', category: 'conceptOps', label: 'A3' },
  { id: 'q4', category: 'conceptOps', label: 'A4' },
  { id: 'q5', category: 'conceptOps', label: 'A5' },
  { id: 'q6', category: 'conceptOps', label: 'A6' },
  { id: 'q7', category: 'hardware', label: 'B7' },
  { id: 'q8', category: 'hardware', label: 'B8' },
  { id: 'q9', category: 'hardware', label: 'B9' },
  { id: 'q10', category: 'hardware', label: 'B10' },
  { id: 'q11', category: 'hardware', label: 'B11' },
  { id: 'q12', category: 'hardware', label: 'B12' },
  { id: 'q13', category: 'safety', label: 'C13' },
  { id: 'q14', category: 'safety', label: 'C14' },
  { id: 'q15', category: 'safety', label: 'C15' },
  { id: 'q16', category: 'safety', label: 'C16' },
  { id: 'q17', category: 'safety', label: 'C17' },
  { id: 'q18', category: 'safety', label: 'C18' },
  { id: 'q19', category: 'audio', label: 'D19' },
  { id: 'q20', category: 'audio', label: 'D20' },
  { id: 'q21', category: 'audio', label: 'D21' },
  { id: 'q22', category: 'audio', label: 'D22' },
  { id: 'q23', category: 'audio', label: 'D23' },
  { id: 'q24', category: 'audio', label: 'D24' },
  { id: 'q25', category: 'audio', label: 'D25' },
  { id: 'q26', category: 'audio', label: 'D26' },
]

export default function FaqPage() {
  const { t } = useLang()

  return (
    <div>
      <SectionHeader title={t('faqPage.title')} subtitle={t('faqPage.subtitle')} />

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-teal-500/25 bg-teal-500/5 p-4">
        <MessageCircleQuestion size={20} className="mt-0.5 shrink-0 text-teal-400" />
        <div>
          <p className="mb-1 text-sm font-semibold text-teal-300">{t('faqPage.highlightLabel')}</p>
          <p className="text-sm text-slate-300">{t('faqPage.highlightBody')}</p>
        </div>
      </div>

      <FaqSection items={ITEMS} categories={CATEGORIES} namespace="faqPage" />
    </div>
  )
}
