import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation } from '../../state/SimulationContext'
import type { ScenarioKey } from '../../types'

export default function ScenarioControls({
  scenarioKey,
  stepCount,
  onRestart,
  messageKey,
}: {
  scenarioKey: ScenarioKey
  stepCount: number
  onRestart: () => void
  messageKey?: string
}) {
  const { t } = useLang()
  const { state, dispatch } = useSimulation()

  const isThisScenario = state.scenario === scenarioKey
  const step = isThisScenario ? state.stepIndex : 0
  const playing = isThisScenario && state.running

  return (
    <div className="panel flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-secondary" onClick={onRestart} aria-label={t('common.restart')}>
          <RotateCcw size={15} /> {t('common.restart')}
        </button>
        <button
          className="btn-secondary"
          disabled={!isThisScenario || step === 0}
          onClick={() => dispatch({ type: 'STEP_BACK' })}
          aria-label={t('common.previous')}
        >
          <SkipBack size={15} /> {t('common.previous')}
        </button>
        {playing ? (
          <button className="btn-primary" onClick={() => dispatch({ type: 'PAUSE' })}>
            <Pause size={15} /> {t('common.pause')}
          </button>
        ) : (
          <button
            className="btn-primary"
            disabled={!isThisScenario}
            onClick={() => dispatch({ type: 'RESUME' })}
          >
            <Play size={15} /> {t('common.play')}
          </button>
        )}
        <button
          className="btn-secondary"
          disabled={!isThisScenario || step >= stepCount}
          onClick={() => dispatch({ type: 'STEP_FORWARD' })}
          aria-label={t('common.next')}
        >
          {t('common.next')} <SkipForward size={15} />
        </button>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>
            {t('common.step')} {isThisScenario ? step : 0} {t('common.of')} {stepCount}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-500"
            style={{ width: `${isThisScenario ? (step / stepCount) * 100 : 0}%` }}
          />
        </div>
      </div>

      {messageKey && (
        <p className="rounded-lg border border-teal-500/20 bg-teal-500/5 px-3 py-2 text-sm text-teal-200">
          {t(messageKey)}
        </p>
      )}
    </div>
  )
}
