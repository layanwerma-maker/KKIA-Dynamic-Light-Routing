import { motion } from 'framer-motion'
import { Radio } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'
import StatusBadge from '../components/common/StatusBadge'

const LEVEL_BAR: Record<string, string> = {
  NORMAL: 'bg-status-normal',
  ELEVATED: 'bg-status-elevated',
  HIGH: 'bg-status-high',
}

export default function SensorsPage() {
  const { t } = useLang()
  const { state } = useSimulation()

  return (
    <div>
      <SectionHeader title={t('sensors.title')} subtitle={t('sensors.subtitle')} actions={<SimBadge />} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.sensors.map((sensor) => (
          <div key={sensor.id} className="panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio size={15} className="text-teal-400" />
                <span className="font-mono text-sm font-semibold text-slate-100">{sensor.id}</span>
              </div>
              <StatusBadge level={sensor.level} />
            </div>
            <p className="mb-3 text-xs text-slate-400">{t(sensor.labelKey)}</p>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
              <span>{t('sensors.density')}</span>
              <span className="tabular-nums text-slate-200">{sensor.densityPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className={`h-full rounded-full ${LEVEL_BAR[sensor.level]}`}
                animate={{ width: `${sensor.densityPct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="mt-3 text-[11px] text-slate-500">{t(`zones.${sensor.zoneId}`)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
