import { PlaneLanding, CloudFog } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'
import ScenarioControls from '../components/common/ScenarioControls'
import AirportMap from '../components/map/AirportMap'
import ExteriorCapacityPanel from '../components/arrivals/ExteriorCapacityPanel'
import ExitSharePanel from '../components/arrivals/ExitSharePanel'
import { ARRIVALS_STEP_COUNT } from '../state/SimulationContext'

function currentMessageKey(step: number, branch: 'PENDING' | 'VERIFIED' | 'SUSPENDED'): string | undefined {
  if (step === 0) return undefined
  if (step <= 5) return `arrivals.step${step}`
  const suffix = branch === 'SUSPENDED' ? 'suspended' : 'verified'
  return `arrivals.step${step}${suffix}`
}

export default function ArrivalsPage() {
  const { t } = useLang()
  const { state, dispatch } = useSimulation()

  const isArrivals = state.scenario === 'ARRIVALS_PEAK'
  const step = isArrivals ? state.stepIndex : 0
  const messageKey = currentMessageKey(step, state.arrivalsBranch)

  return (
    <div>
      <SectionHeader
        title={t('arrivals.title')}
        subtitle={t('arrivals.subtitle')}
        actions={
          <>
            <SimBadge />
            <button className="btn-secondary" onClick={() => dispatch({ type: 'TOGGLE_EXTERIOR_CONGESTION' })}>
              <CloudFog size={16} /> {t('arrivals.simulateExterior')}
            </button>
            <button className="btn-primary" onClick={() => dispatch({ type: 'START_ARRIVALS' })}>
              <PlaneLanding size={16} /> {t('arrivals.simulatePeak')}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AirportMap />
          <ScenarioControls
            scenarioKey="ARRIVALS_PEAK"
            stepCount={ARRIVALS_STEP_COUNT}
            onRestart={() => dispatch({ type: 'START_ARRIVALS' })}
            messageKey={messageKey}
          />
        </div>
        <div className="space-y-6">
          <ExitSharePanel />
          <ExteriorCapacityPanel />
        </div>
      </div>
    </div>
  )
}
