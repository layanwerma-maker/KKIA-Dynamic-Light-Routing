import { Users, LayoutGrid, AlertTriangle, Zap, Gauge, Shuffle, Clock, Building2, PlayCircle, StopCircle } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import { computeOverviewKpis } from '../state/selectors'
import SectionHeader from '../components/common/SectionHeader'
import KpiCard from '../components/common/KpiCard'
import SimBadge from '../components/common/SimBadge'
import AirportMap from '../components/map/AirportMap'
import { Link } from 'react-router-dom'

export default function OverviewPage() {
  const { t } = useLang()
  const { state, dispatch } = useSimulation()
  const kpis = computeOverviewKpis(state)
  const demoRunning = state.running && (state.scenario === 'SECURITY' || state.scenario === 'ARRIVALS_PEAK')

  return (
    <div>
      <SectionHeader
        title={t('overview.title')}
        subtitle={t('overview.subtitle')}
        actions={
          <button
            className="btn-primary"
            onClick={() => dispatch({ type: demoRunning ? 'RESET' : 'START_FULL_DEMO' })}
          >
            {demoRunning ? <StopCircle size={16} /> : <PlayCircle size={16} />}
            {demoRunning ? t('overview.stopDemo') : t('overview.startDemo')}
          </button>
        }
      />

      <p className="-mt-4 mb-6 text-xs text-slate-500">
        <span className="font-medium text-slate-400">{t('credit.heroLabel')}</span>
        <span className="mx-1.5 text-slate-600">·</span>
        {t('credit.heroRole')}
      </p>

      <div className="mb-2 flex justify-end">
        <SimBadge />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <KpiCard icon={Users} label={t('kpi.passengerFlow')} value={kpis.passengerFlow.toLocaleString()} unit={t('kpi.passengersPerHour')} accent="neutral" />
        <KpiCard icon={LayoutGrid} label={t('kpi.activeZones')} value={kpis.activeZones} accent="neutral" />
        <KpiCard
          icon={AlertTriangle}
          label={t('kpi.congestedZones')}
          value={kpis.congestedZones}
          accent={kpis.congestedZones > 2 ? 'HIGH' : kpis.congestedZones > 0 ? 'ELEVATED' : 'NORMAL'}
        />
        <KpiCard icon={Zap} label={t('kpi.activeRoutes')} value={kpis.activeRoutes} accent="guidance" />
        <KpiCard icon={Gauge} label={t('kpi.estDensity')} value={`${kpis.avgDensity}%`} accent={kpis.avgDensity > 70 ? 'HIGH' : kpis.avgDensity > 50 ? 'ELEVATED' : 'NORMAL'} />
        <KpiCard icon={Shuffle} label={t('kpi.redistribution')} value={`${kpis.redistributionPct}%`} accent="guidance" />
        <KpiCard icon={Clock} label={t('kpi.avgQueueTime')} value={kpis.avgWait} unit={t('common.minutes')} accent="neutral" />
        <KpiCard icon={Building2} label={t('kpi.exteriorCapacity')} value={`${kpis.exteriorCapacity}%`} accent={state.exterior.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('overview.quickMap')}</h2>
          <AirportMap />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('overview.recentEvents')}</h2>
          <div className="panel max-h-[420px] overflow-y-auto p-4">
            {state.timeline.length === 0 ? (
              <p className="text-sm text-slate-500">{t('timeline.empty')}</p>
            ) : (
              <ul className="space-y-3">
                {state.timeline.slice(0, 8).map((evt) => (
                  <li key={evt.id} className="flex gap-3 text-sm">
                    <span className="tabular-nums text-slate-500">{evt.time}</span>
                    <span className="text-slate-300">{t(evt.messageKey)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/route-control" className="mt-2 inline-block text-xs text-teal-400 hover:underline">
            {t('overview.viewTimeline')}
          </Link>
        </div>
      </div>
    </div>
  )
}
