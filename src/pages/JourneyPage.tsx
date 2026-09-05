import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import StatusBadge from '../components/common/StatusBadge'
import type { ZoneId, ZoneState } from '../types'

function Stage({ label, zone }: { label: string; zone?: ZoneState }) {
  return (
    <div className="panel flex min-w-[150px] flex-1 flex-col items-center gap-2 p-4 text-center">
      <p className="text-sm font-semibold text-slate-200">{label}</p>
      {zone ? <StatusBadge level={zone.level} /> : <span className="text-xs text-slate-500">—</span>}
      {zone && <span className="text-xs tabular-nums text-slate-500">{zone.densityPct}%</span>}
    </div>
  )
}

export default function JourneyPage() {
  const { t, dir } = useLang()
  const { state } = useSimulation()
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight

  const departures: Array<{ labelKey: string; zoneId?: ZoneId }> = [
    { labelKey: 'journey.terminalEntrance' },
    { labelKey: 'zones.checkin', zoneId: 'checkin' },
    { labelKey: 'zones.securityQueue', zoneId: 'securityQueue' },
    { labelKey: 'zones.departureHall', zoneId: 'departureHall' },
    { labelKey: 'zones.boardingGates', zoneId: 'boardingGates' },
  ]

  const arrivals: Array<{ labelKey: string; zoneId?: ZoneId }> = [
    { labelKey: 'journey.aircraft' },
    { labelKey: 'zones.arrivalsCorridor', zoneId: 'arrivalsCorridor' },
    { labelKey: 'zones.baggageClaim', zoneId: 'baggageClaim' },
    { labelKey: 'zones.mainExit', zoneId: 'mainExit' },
    { labelKey: 'zones.exteriorReceiving', zoneId: 'exteriorReceiving' },
    { labelKey: 'zones.pickupZone', zoneId: 'pickupZone' },
  ]

  const renderRow = (stages: Array<{ labelKey: string; zoneId?: ZoneId }>) => (
    <div className="flex flex-wrap items-stretch gap-2">
      {stages.map((stage, i) => (
        <div key={stage.labelKey} className="flex flex-1 items-center gap-2">
          <Stage label={t(stage.labelKey)} zone={stage.zoneId ? state.zones[stage.zoneId] : undefined} />
          {i < stages.length - 1 && <Arrow size={18} className="shrink-0 text-slate-600" />}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <SectionHeader title={t('journey.title')} subtitle={t('journey.subtitle')} />

      <div className="mb-6 rounded-xl border border-teal-500/25 bg-teal-500/5 px-4 py-3 text-sm font-medium text-teal-200">
        {t('journey.principle')}
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('journey.departuresTitle')}</h2>
          {renderRow(departures)}
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('journey.arrivalsTitle')}</h2>
          {renderRow(arrivals)}
        </div>
      </div>
    </div>
  )
}
