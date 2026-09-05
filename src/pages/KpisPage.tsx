import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'

const KPI_VALUES: Array<{ key: string; value: number; unit: string }> = [
  { key: 'kpis.flowEfficiency', value: 82, unit: '%' },
  { key: 'kpis.queueReduction', value: 41, unit: '%' },
  { key: 'kpis.distribution', value: 36, unit: '%' },
  { key: 'kpis.routeCompliance', value: 74, unit: '%' },
  { key: 'kpis.interventionReduction', value: 28, unit: '%' },
  { key: 'kpis.avgWait', value: 8, unit: 'min' },
  { key: 'kpis.altUtilization', value: 36, unit: '%' },
  { key: 'kpis.directionAccuracy', value: 91, unit: '%' },
  { key: 'kpis.recoveryTime', value: 6, unit: 'min' },
  { key: 'kpis.downstreamProtection', value: 96, unit: '%' },
]

export default function KpisPage() {
  const { t } = useLang()

  const radarData = KPI_VALUES.filter((k) => k.unit === '%').map((k) => ({ metric: t(k.key), value: k.value }))

  return (
    <div>
      <SectionHeader title={t('kpis.title')} subtitle={t('kpis.subtitle')} actions={<SimBadge estimate />} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-6">
        {KPI_VALUES.map((kpi) => (
          <div key={kpi.key} className="panel p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">{t(kpi.key)}</p>
            <p className="text-2xl font-bold tabular-nums text-teal-300">
              {kpi.value}
              <span className="ms-1 text-sm text-slate-500">{kpi.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="panel p-4">
        <h3 className="mb-4 text-sm font-semibold text-slate-200">{t('kpis.title')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
              <PolarRadiusAxis stroke="rgba(255,255,255,0.15)" fontSize={10} />
              <Radar dataKey="value" stroke="#37d0ff" fill="#37d0ff" fillOpacity={0.35} />
              <Tooltip contentStyle={{ background: '#0d1626', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
