import { PlayCircle, PlaneLanding, CloudFog, RotateCcw, Zap, Undo2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import StatusBadge from '../components/common/StatusBadge'
import { ZONE_ORDER } from '../data/initialState'
import type { Level } from '../types'

const LEVELS: Level[] = ['NORMAL', 'ELEVATED', 'HIGH']

export default function RouteControlPage() {
  const { t } = useLang()
  const { state, dispatch } = useSimulation()

  return (
    <div>
      <SectionHeader title={t('routeControl.title')} subtitle={t('routeControl.subtitle')} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="panel p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('decision.humanOversight')}</h3>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex overflow-hidden rounded-lg border border-white/15 text-xs font-semibold">
                <button
                  onClick={() => dispatch({ type: 'SET_MODE', mode: 'AUTO' })}
                  className={`px-3 py-2 ${state.mode === 'AUTO' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
                >
                  {t('routeControl.autoMode')}
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_MODE', mode: 'MANUAL' })}
                  className={`px-3 py-2 ${state.mode === 'MANUAL' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
                >
                  {t('routeControl.manualOverride')}
                </button>
              </div>
            </div>
          </div>

          <div className="panel p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('routeControl.title')}</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button className="btn-secondary justify-start" onClick={() => dispatch({ type: 'START_SECURITY' })}>
                <PlayCircle size={16} /> {t('routeControl.simulateSecurity')}
              </button>
              <button className="btn-secondary justify-start" onClick={() => dispatch({ type: 'START_ARRIVALS' })}>
                <PlaneLanding size={16} /> {t('routeControl.simulateArrival')}
              </button>
              <button className="btn-secondary justify-start" onClick={() => dispatch({ type: 'TOGGLE_EXTERIOR_CONGESTION' })}>
                <CloudFog size={16} /> {t('routeControl.simulateExterior')}
              </button>
              <button className="btn-secondary justify-start" onClick={() => dispatch({ type: 'RESET' })}>
                <RotateCcw size={16} /> {t('routeControl.resetSimulation')}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2" hidden={state.mode !== 'MANUAL'}>
              <button className="btn-primary justify-start" onClick={() => dispatch({ type: 'MANUAL_ACTIVATE_ALT', target: 'security' })}>
                <Zap size={16} /> {t('routeControl.activateAlt')} — {t('security.title')}
              </button>
              <button className="btn-secondary justify-start" onClick={() => dispatch({ type: 'MANUAL_RETURN_PRIMARY', target: 'security' })}>
                <Undo2 size={16} /> {t('routeControl.returnPrimary')} — {t('security.title')}
              </button>
              <button className="btn-primary justify-start" onClick={() => dispatch({ type: 'MANUAL_ACTIVATE_ALT', target: 'arrivals' })}>
                <Zap size={16} /> {t('routeControl.activateAlt')} — {t('arrivals.title')}
              </button>
              <button className="btn-secondary justify-start" onClick={() => dispatch({ type: 'MANUAL_RETURN_PRIMARY', target: 'arrivals' })}>
                <Undo2 size={16} /> {t('routeControl.returnPrimary')} — {t('arrivals.title')}
              </button>
            </div>
          </div>

          <div className="panel p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('routeControl.zoneControls')}</h3>
            <ul className="space-y-2">
              {ZONE_ORDER.map((zoneId) => {
                const zone = state.zones[zoneId]
                return (
                  <li key={zoneId} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                    <span className="text-sm text-slate-300">{t(zone.labelKey)}</span>
                    <div className="flex items-center gap-2">
                      <StatusBadge level={zone.level} />
                      <div className="inline-flex overflow-hidden rounded-lg border border-white/10 text-[11px] font-semibold">
                        {LEVELS.map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => dispatch({ type: 'SET_ZONE_LEVEL', zoneId, level: lvl })}
                            className={`px-2 py-1 ${zone.level === lvl ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                          >
                            {t(`common.${lvl.toLowerCase()}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div>
          <div className="panel max-h-[720px] overflow-y-auto p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('routeControl.timeline')}</h3>
            {state.timeline.length === 0 ? (
              <p className="text-sm text-slate-500">{t('timeline.empty')}</p>
            ) : (
              <ul className="space-y-3">
                {state.timeline.map((evt) => (
                  <li key={evt.id} className="border-s-2 border-teal-500/40 ps-3 text-sm">
                    <p className="tabular-nums text-xs text-slate-500">{evt.time}</p>
                    <p className="text-slate-300">{t(evt.messageKey)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
