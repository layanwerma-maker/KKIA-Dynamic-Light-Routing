import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import AirportMap from '../components/map/AirportMap'
import StatusBadge from '../components/common/StatusBadge'
import SimBadge from '../components/common/SimBadge'
import { ZONE_ORDER } from '../data/initialState'

export default function MapPage() {
  const { t } = useLang()
  const { state } = useSimulation()

  return (
    <div>
      <SectionHeader title={t('map.title')} subtitle={t('map.subtitle')} actions={<SimBadge />} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AirportMap />
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${state.guidanceActive ? 'bg-status-guidance animate-pulseGlow' : 'bg-slate-600'}`} />
            <span className="text-slate-300">{state.guidanceActive ? t('map.guidanceActive') : t('map.guidanceInactive')}</span>
          </div>
        </div>
        <div className="panel p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('sensors.title')}</h2>
          <ul className="space-y-2">
            {ZONE_ORDER.map((id) => {
              const zone = state.zones[id]
              return (
                <li key={id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
                  <span className="text-slate-300">{t(zone.labelKey)}</span>
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums text-slate-500">{zone.densityPct}%</span>
                    <StatusBadge level={zone.level} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
