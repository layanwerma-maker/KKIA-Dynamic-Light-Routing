import { useLang } from '../../i18n/LanguageContext'

export default function SimBadge({ estimate = false, className = '' }: { estimate?: boolean; className?: string }) {
  const { t } = useLang()
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-300 ${className}`}
    >
      {estimate ? t('common.simulationEstimate') : t('common.simulatedData')}
    </span>
  )
}
