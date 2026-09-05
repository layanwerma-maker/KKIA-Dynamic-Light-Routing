import type { Level } from '../../types'
import { useLang } from '../../i18n/LanguageContext'

const CLASS_BY_LEVEL: Record<Level, string> = {
  NORMAL: 'badge-normal',
  ELEVATED: 'badge-elevated',
  HIGH: 'badge-high',
}

const KEY_BY_LEVEL: Record<Level, string> = {
  NORMAL: 'common.normal',
  ELEVATED: 'common.elevated',
  HIGH: 'common.high',
}

export default function StatusBadge({ level, className = '' }: { level: Level; className?: string }) {
  const { t } = useLang()
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${CLASS_BY_LEVEL[level]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(KEY_BY_LEVEL[level])}
    </span>
  )
}
