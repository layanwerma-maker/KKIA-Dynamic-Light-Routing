import { PlayCircle } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'
import CheckpointPanel from '../components/security/CheckpointPanel'
import ScenarioControls from '../components/common/ScenarioControls'
import AirportMap from '../components/map/AirportMap'
import { SECURITY_STEP_COUNT } from '../state/SimulationContext'

export default function SecurityPage() {
  const { t } = useLang()
  const { state, dispatch } = useSimulation()

  const isSecurity = state.scenario === 'SECURITY'
  const step = isSecurity ? state.stepIndex : 0
  const messageKey = step > 0 ? `security.step${step}` : undefined

  return (
    <div>
      <SectionHeader
        title={t('security.title')}
        subtitle={t('security.subtitle')}
        actions={
          <>
            <SimBadge />
            <button className="btn-primary" onClick={() => dispatch({ type: 'START_SECURITY' })}>
              <PlayCircle size={16} /> {t('security.simulateBtn')}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CheckpointPanel
          title={t('security.mainCheckpoint')}
          zone={state.zones.securityQueue}
          lanes={4}
        />
        <CheckpointPanel
          title={t('security.altCheckpoint')}
          zone={state.zones.securityAlt}
          lanes={2}
          highlighted={state.guidanceActive && state.guidanceZone === 'securityAlt'}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            {t('security.cinematicTitle')}
          </h2>
          <AirportMap />
        </div>
        <ScenarioControls
          scenarioKey="SECURITY"
          stepCount={SECURITY_STEP_COUNT}
          onRestart={() => dispatch({ type: 'START_SECURITY' })}
          messageKey={messageKey}
        />
      </div>
    </div>
  )
}
