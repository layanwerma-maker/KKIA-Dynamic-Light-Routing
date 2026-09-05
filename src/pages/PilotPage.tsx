import { CheckCircle2, ShieldCheck, Luggage, Waypoints, DoorOpen, MapPinned, ClipboardList } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'

const PHASES = ['phase1', 'phase2', 'phase3', 'phase4', 'phase5', 'phase6', 'phase7']

const AREAS = [
  { icon: ShieldCheck, key: 'pilot.areaSecurity' },
  { icon: Luggage, key: 'pilot.areaBaggage' },
  { icon: Waypoints, key: 'pilot.areaTransfer' },
  { icon: DoorOpen, key: 'pilot.areaBoarding' },
  { icon: MapPinned, key: 'pilot.areaIntersections' },
]

const REQUIREMENT_ITEMS = Array.from({ length: 12 }, (_, i) => `pilotRequirements.item${i + 1}`)

export default function PilotPage() {
  const { t } = useLang()

  return (
    <div>
      <SectionHeader title={t('pilot.title')} subtitle={t('pilot.subtitle')} />

      <ol className="relative space-y-4 border-s-2 border-teal-500/30 ps-6">
        {PHASES.map((phaseKey, i) => (
          <li key={phaseKey} className="relative">
            <span className="absolute -start-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-navy-950">
              {i + 1}
            </span>
            <div className="panel flex items-center gap-2 p-3">
              <CheckCircle2 size={16} className="shrink-0 text-teal-400" />
              <p className="text-sm text-slate-200">{t(`pilot.${phaseKey}`)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('pilot.candidateAreas')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {AREAS.map((area) => (
            <div key={area.key} className="panel flex flex-col items-center gap-2 p-4 text-center">
              <area.icon size={20} className="text-teal-400" />
              <span className="text-xs font-medium text-slate-300">{t(area.key)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 panel p-4">
        <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <ClipboardList size={16} className="text-teal-400" /> {t('pilotRequirements.title')}
        </h2>
        <p className="mb-3 text-xs text-slate-500">{t('pilotRequirements.subtitle')}</p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {REQUIREMENT_ITEMS.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-slate-400">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-status-normal" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
