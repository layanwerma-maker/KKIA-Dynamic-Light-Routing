import { ShieldAlert } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

export default function DisclaimerBar() {
  const { t } = useLang()
  return (
    <div className="no-print flex items-start gap-2 border-t border-white/10 bg-navy-900/80 px-4 py-2 text-[11px] leading-snug text-slate-400 md:items-center">
      <ShieldAlert size={14} className="mt-0.5 shrink-0 text-teal-500 md:mt-0" />
      <p>{t('disclaimerBar.text')}</p>
    </div>
  )
}
