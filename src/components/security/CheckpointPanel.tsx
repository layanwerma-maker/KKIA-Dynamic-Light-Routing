import { motion } from 'framer-motion'
import { ScanLine, Users } from 'lucide-react'
import type { ZoneState } from '../../types'
import { useLang } from '../../i18n/LanguageContext'
import StatusBadge from '../common/StatusBadge'

const LEVEL_BAR: Record<ZoneState['level'], string> = {
  NORMAL: 'bg-status-normal',
  ELEVATED: 'bg-status-elevated',
  HIGH: 'bg-status-high',
}

export default function CheckpointPanel({
  title,
  zone,
  lanes,
  highlighted,
}: {
  title: string
  zone: ZoneState
  lanes: number
  highlighted?: boolean
}) {
  const { t } = useLang()
  const queueDots = Math.min(zone.queueLength, 24)

  return (
    <div
      className={`panel flex flex-col gap-3 p-4 transition ${
        highlighted ? 'border-status-guidance/60 shadow-glow-blue' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        <StatusBadge level={zone.level} />
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: lanes }).map((_, i) => (
          <div key={i} className="flex h-9 flex-1 items-center justify-center rounded-md border border-white/10 bg-white/5">
            <ScanLine size={16} className="text-teal-400" />
          </div>
        ))}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Users size={12} /> {t('security.queueLength')}
          </span>
          <span className="tabular-nums text-slate-300">{zone.queueLength}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className={`h-full rounded-full ${LEVEL_BAR[zone.level]}`}
            animate={{ width: `${Math.min(100, (zone.queueLength / 45) * 100)}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {Array.from({ length: queueDots }).map((_, i) => (
          <motion.span
            key={i}
            className={`h-2 w-2 rounded-full ${LEVEL_BAR[zone.level]}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{t('security.waitTime')}</span>
        <span className="font-semibold text-slate-200 tabular-nums">
          {zone.waitTimeMin} {t('common.minutes')}
        </span>
      </div>
    </div>
  )
}
