import { Car, Users, Footprints, Gauge, AlertOctagon } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation } from '../../state/SimulationContext'
import StatusBadge from '../common/StatusBadge'
import SimBadge from '../common/SimBadge'

export default function ExteriorCapacityPanel() {
  const { t } = useLang()
  const { state } = useSimulation()
  const ext = state.exterior

  const rows = [
    { icon: Users, label: t('arrivals.peopleOutside'), value: `${ext.peopleOutside} ${t('common.people')}` },
    { icon: Car, label: t('arrivals.pickupCongestion'), value: `${ext.pickupCongestionPct}%` },
    { icon: Gauge, label: t('arrivals.receivingDensity'), value: `${ext.receivingDensityPct}%` },
    { icon: Footprints, label: t('arrivals.pedestrianDensity'), value: `${ext.pedestrianDensityPct}%` },
  ]

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">{t('arrivals.exteriorPanelTitle')}</h3>
        <SimBadge />
      </div>

      <div className="mb-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
        <span className="text-sm text-slate-300">{t('arrivals.exteriorStatus')}</span>
        <StatusBadge level={ext.status} />
      </div>

      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <row.icon size={14} /> {row.label}
            </span>
            <span className="font-medium tabular-nums text-slate-200">{row.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-white/10 pt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>{t('arrivals.availableCapacity')}</span>
          <span className="tabular-nums text-slate-200">{ext.availableCapacityPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full ${ext.status === 'HIGH' ? 'bg-status-high' : ext.status === 'ELEVATED' ? 'bg-status-elevated' : 'bg-status-normal'}`}
            style={{ width: `${ext.availableCapacityPct}%` }}
          />
        </div>
      </div>

      {ext.status === 'HIGH' && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-status-high/30 bg-status-high/10 px-3 py-2 text-xs text-status-high">
          <AlertOctagon size={14} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{t('arrivals.suspendedTitle')}</p>
            <p className="text-status-high/80">{t('arrivals.suspendedReason')}</p>
          </div>
        </div>
      )}
    </div>
  )
}
