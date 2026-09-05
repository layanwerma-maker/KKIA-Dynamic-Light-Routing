import { ShieldAlert } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

export default function DisclaimerBar() {
  const { t } = useLang()
  return (
    <div className="no-print border-t border-white/10 bg-navy-900/80 px-4 py-2 text-[11px] leading-snug text-slate-400">
      <div className="flex items-start gap-2 md:items-center">
        <ShieldAlert size={14} className="mt-0.5 shrink-0 text-teal-500 md:mt-0" />
        <p>
          <strong className="font-semibold text-slate-300">{t('disclaimerBar.label')}</strong> {t('disclaimerBar.text')}
        </p>
      </div>
      <p className="mt-1 text-[10px] text-slate-600">{t('credit.footer')}</p>
    </div>
  )
}
