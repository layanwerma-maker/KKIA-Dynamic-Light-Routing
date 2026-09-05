import { ArrowDown } from 'lucide-react'
import {
  Radio,
  Camera,
  Server,
  BrainCircuit,
  Lightbulb,
  Sparkles,
  Users,
  Building2,
  PlaneTakeoff,
  Activity,
  LayoutDashboard,
  Cpu,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'

export default function ArchitecturePage() {
  const { t } = useLang()

  const pipeline = [
    { icon: Radio, key: 'architecture.sensors' },
    { icon: Camera, key: 'architecture.analytics' },
    { icon: Server, key: 'architecture.platform' },
    { icon: BrainCircuit, key: 'architecture.engine' },
    { icon: Lightbulb, key: 'architecture.controller' },
    { icon: Sparkles, key: 'architecture.guidance' },
    { icon: Users, key: 'architecture.passengers' },
  ]

  const integrations = [
    { icon: Building2, key: 'architecture.ops' },
    { icon: PlaneTakeoff, key: 'architecture.fids' },
    { icon: Activity, key: 'architecture.monitoring' },
    { icon: LayoutDashboard, key: 'architecture.dashboards' },
    { icon: Cpu, key: 'architecture.smart' },
  ]

  return (
    <div>
      <SectionHeader title={t('architecture.title')} subtitle={t('architecture.subtitle')} />

      <div className="panel flex flex-col items-center gap-1 p-6">
        {pipeline.map((node, i) => (
          <div key={node.key} className="flex flex-col items-center">
            <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-teal-500/25 bg-teal-500/5 px-4 py-3">
              <node.icon size={20} className="shrink-0 text-teal-400" />
              <span className="text-sm font-medium text-slate-200">{t(node.key)}</span>
            </div>
            {i < pipeline.length - 1 && <ArrowDown size={18} className="my-1 text-slate-600" />}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('architecture.integrations')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {integrations.map((item) => (
            <div key={item.key} className="panel flex flex-col items-center gap-2 p-4 text-center">
              <item.icon size={20} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-300">{t(item.key)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">{t('architecture.disclaimer')}</p>
      </div>
    </div>
  )
}
