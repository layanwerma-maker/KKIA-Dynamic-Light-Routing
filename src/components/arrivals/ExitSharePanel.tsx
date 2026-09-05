import { motion } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation } from '../../state/SimulationContext'
import SimBadge from '../common/SimBadge'
import { ShieldCheck } from 'lucide-react'

export default function ExitSharePanel() {
  const { t } = useLang()
  const { state } = useSimulation()
  const main = state.routes.arrivalsMain.utilizationPct
  const alt = state.routes.arrivalsAlt.utilizationPct

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">{t('journey.arrivalsTitle')}</h3>
        <SimBadge estimate />
      </div>

      <div className="space-y-3">
        <ShareBar label={t('zones.mainExit')} pct={main} color="bg-teal-500" />
        <ShareBar label={t('zones.altExit')} pct={alt} color="bg-status-guidance" active={state.routes.arrivalsAlt.active} />
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-teal-400" />
        <div>
          <p className="font-medium text-slate-300">{t('arrivals.altExitLabel')}</p>
          <p>{t('arrivals.altExitApproval')}</p>
        </div>
      </div>
    </div>
  )
}

function ShareBar({ label, pct, color, active }: { label: string; pct: number; color: string; active?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className={`font-semibold tabular-nums ${active ? 'text-status-guidance' : 'text-slate-300'}`}>{pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={`h-full rounded-full ${color}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </div>
  )
}
