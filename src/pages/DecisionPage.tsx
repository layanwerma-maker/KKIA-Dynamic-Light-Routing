import type { ReactNode } from 'react'
import { CheckCircle2, XCircle, ShieldCheck, UserCog } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import StatusBadge from '../components/common/StatusBadge'
import type { DecisionSnapshot } from '../types'

function InputRow({ label, ok, value }: { label: string; ok?: boolean; value: ReactNode }) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="flex items-center gap-2 font-medium text-slate-200">
        {value}
        {ok !== undefined && (ok ? <CheckCircle2 size={15} className="text-status-normal" /> : <XCircle size={15} className="text-status-high" />)}
      </span>
    </li>
  )
}

function DecisionCard({ title, decision }: { title: string; decision: DecisionSnapshot }) {
  const { t } = useLang()
  const recommend = decision.recommendation === 'RECOMMEND_ALTERNATIVE'

  return (
    <div className="panel p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <ul className="space-y-2">
        <InputRow label={t('decision.density')} value={<StatusBadge level={decision.primaryLevel} />} />
        <InputRow label={t('decision.altAvailable')} ok={decision.alternativeAvailable} value={decision.alternativeAvailable ? t('common.available') : t('common.unavailable')} />
        <InputRow label={t('decision.altCapacity')} ok={decision.alternativeCapacityOk} value={decision.alternativeCapacityOk ? t('common.normal') : t('common.high')} />
        <InputRow label={t('decision.downstreamCapacity')} ok={decision.downstreamCapacityOk} value={decision.downstreamCapacityOk ? t('common.normal') : t('common.high')} />
        <InputRow label={t('decision.exteriorCapacity')} ok={decision.exteriorCapacityOk} value={decision.exteriorCapacityOk ? t('common.normal') : t('common.high')} />
      </ul>

      <div
        className={`mt-4 rounded-lg border px-3 py-3 text-sm font-semibold ${
          recommend ? 'border-status-guidance/40 bg-status-guidance/10 text-status-guidance' : 'border-white/10 bg-white/5 text-slate-300'
        }`}
      >
        {recommend ? (
          <>
            {t('decision.recommendAlt')} · {t('decision.activateGuidance')}
          </>
        ) : (
          <>
            {t('decision.maintainCurrent')}
            {decision.primaryLevel === 'HIGH' && <> · {t('decision.alertOps')}</>}
          </>
        )}
      </div>
    </div>
  )
}

export default function DecisionPage() {
  const { t } = useLang()
  const { state, dispatch, securityDecision, arrivalsDecision } = useSimulation()

  return (
    <div>
      <SectionHeader title={t('decision.title')} subtitle={t('decision.subtitle')} />

      <div className="mb-6 panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <UserCog size={18} className="text-teal-400" />
          {t('decision.humanOversight')}
        </div>
        <div className="inline-flex overflow-hidden rounded-lg border border-white/15 text-xs font-semibold">
          <button
            onClick={() => dispatch({ type: 'SET_MODE', mode: 'AUTO' })}
            className={`px-3 py-1.5 ${state.mode === 'AUTO' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('decision.autoMode')}
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_MODE', mode: 'MANUAL' })}
            className={`px-3 py-1.5 ${state.mode === 'MANUAL' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300'}`}
          >
            {t('decision.manualOverride')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DecisionCard title={t('security.title')} decision={securityDecision} />
        <DecisionCard title={t('arrivals.title')} decision={arrivalsDecision} />
      </div>

      <div className="mt-6 panel flex items-start gap-3 p-4 text-sm text-slate-400">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal-400" />
        <p>
          {t('decision.systemRecommendation')} → {t('decision.operationalApproval')}.{' '}
          {state.mode === 'MANUAL' ? t('decision.manualOverride') : t('decision.autoMode')} {t('common.active').toLowerCase()}.
        </p>
      </div>
    </div>
  )
}
