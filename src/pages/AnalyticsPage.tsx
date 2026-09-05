import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useLang } from '../i18n/LanguageContext'
import { useSimulation } from '../state/SimulationContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'

export default function AnalyticsPage() {
  const { t } = useLang()
  const { state } = useSimulation()

  const routeData = [
    { name: t('analytics.mainRoute'), [t('analytics.before')]: 94, [t('analytics.after')]: 64 },
    { name: t('analytics.altRoute'), [t('analytics.before')]: 6, [t('analytics.after')]: 36 },
  ]

  const metricsData = [
    { name: t('analytics.queueLength'), [t('analytics.before')]: 41, [t('analytics.after')]: 16 },
    { name: t('analytics.density'), [t('analytics.before')]: 91, [t('analytics.after')]: 55 },
    { name: t('analytics.waitTime'), [t('analytics.before')]: 23, [t('analytics.after')]: 8 },
  ]

  return (
    <div>
      <SectionHeader title={t('analytics.title')} subtitle={t('analytics.subtitle')} actions={<SimBadge estimate />} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="panel p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-200">{t('analytics.utilization')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                <Tooltip contentStyle={{ background: '#0d1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Legend />
                <Bar dataKey={t('analytics.before')} fill="#6b7280" radius={[6, 6, 0, 0]} />
                <Bar dataKey={t('analytics.after')} fill="#37d0ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-200">{t('analytics.distribution')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0d1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                <Legend />
                <Bar dataKey={t('analytics.before')} fill="#f2554b" radius={[6, 6, 0, 0]} />
                <Bar dataKey={t('analytics.after')} fill="#3ddc84" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 panel p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('analytics.intervention')} — {t('overview.title')}</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
          <LiveStat label={t('security.mainCheckpoint')} value={`${state.routes.securityMain.utilizationPct}%`} />
          <LiveStat label={t('security.altCheckpoint')} value={`${state.routes.securityAlt.utilizationPct}%`} />
          <LiveStat label={t('zones.mainExit')} value={`${state.routes.arrivalsMain.utilizationPct}%`} />
          <LiveStat label={t('zones.altExit')} value={`${state.routes.arrivalsAlt.utilizationPct}%`} />
        </div>
      </div>
    </div>
  )
}

function LiveStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-semibold tabular-nums text-teal-300">{value}</p>
    </div>
  )
}
