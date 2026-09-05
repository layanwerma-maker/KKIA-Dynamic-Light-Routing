import { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation, SECURITY_STEP_COUNT, ARRIVALS_STEP_COUNT } from '../../state/SimulationContext'
import ScenarioControls from '../common/ScenarioControls'
import AirportMap from '../map/AirportMap'
import BrandMark from '../common/BrandMark'

type Scenario = 'security' | 'arrivals'

function currentArrivalsKey(step: number, branch: 'PENDING' | 'VERIFIED' | 'SUSPENDED'): string | undefined {
  if (step === 0) return undefined
  if (step <= 5) return `arrivals.step${step}`
  return `arrivals.step${step}${branch === 'SUSPENDED' ? 'suspended' : 'verified'}`
}

export default function VideoDemoPanel() {
  const { t } = useLang()
  const { state, dispatch } = useSimulation()
  const [tab, setTab] = useState<Scenario>('security')

  const isSecurity = state.scenario === 'SECURITY'
  const isArrivals = state.scenario === 'ARRIVALS_PEAK'
  const securityStep = isSecurity ? state.stepIndex : 0
  const arrivalsStep = isArrivals ? state.stepIndex : 0

  const messageKey =
    tab === 'security' ? (securityStep > 0 ? `security.step${securityStep}` : undefined) : currentArrivalsKey(arrivalsStep, state.arrivalsBranch)

  return (
    <div className="panel p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-200">{t('video.title')}</h3>
        <div className="inline-flex overflow-hidden rounded-lg border border-white/15 text-xs font-semibold">
          <button
            onClick={() => setTab('security')}
            className={`px-3 py-1.5 ${tab === 'security' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('video.scenarioSecurity')}
          </button>
          <button
            onClick={() => setTab('arrivals')}
            className={`px-3 py-1.5 ${tab === 'arrivals' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('video.scenarioArrivals')}
          </button>
        </div>
      </div>

      <p className="mb-4 text-xs text-slate-500">{t('video.subtitle')}</p>

      <div className="mb-4 flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-navy-900/70 p-3">
        <div className="w-full">
          {(securityStep === 0 && tab === 'security') || (arrivalsStep === 0 && tab === 'arrivals') ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <BrandMark size="lg" />
              <p className="text-sm text-slate-400">{t('video.openingTitle3')}</p>
            </div>
          ) : (
            <AirportMap compact />
          )}
        </div>
      </div>

      <ScenarioControls
        scenarioKey={tab === 'security' ? 'SECURITY' : 'ARRIVALS_PEAK'}
        stepCount={tab === 'security' ? SECURITY_STEP_COUNT : ARRIVALS_STEP_COUNT}
        onRestart={() => dispatch({ type: tab === 'security' ? 'START_SECURITY' : 'START_ARRIVALS' })}
        messageKey={messageKey}
      />
    </div>
  )
}
