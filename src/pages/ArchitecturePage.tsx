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
  RadioTower,
  Network,
  Router,
  PlugZap,
  MonitorCog,
  ClipboardCheck,
  Repeat,
  Info,
  Code2,
  Hand,
  ShieldOff,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import SimBadge from '../components/common/SimBadge'
import FlowRow from '../components/common/FlowRow'
import HardwareCard from '../components/common/HardwareCard'

const HARDWARE_CARDS = [
  {
    icon: RadioTower,
    titleKey: 'techArch.cardATitle',
    doesKey: 'techArch.cardADoes',
    noteKey: 'techArch.cardANote',
    installedKey: 'techArch.cardAInstalled',
    connectsKey: 'techArch.cardAConnects',
  },
  {
    icon: Network,
    titleKey: 'techArch.cardBTitle',
    doesKey: 'techArch.cardBDoes',
    installedKey: 'techArch.cardBInstalled',
    connectsKey: 'techArch.cardBConnects',
  },
  {
    icon: Cpu,
    titleKey: 'techArch.cardCTitle',
    doesKey: 'techArch.cardCDoes',
    installedKey: 'techArch.cardCInstalled',
    connectsKey: 'techArch.cardCConnects',
  },
  {
    icon: Router,
    titleKey: 'techArch.cardDTitle',
    doesKey: 'techArch.cardDDoes',
    noteKey: 'techArch.cardDNote',
    installedKey: 'techArch.cardDInstalled',
    connectsKey: 'techArch.cardDConnects',
  },
  {
    icon: Lightbulb,
    titleKey: 'techArch.cardETitle',
    doesKey: 'techArch.cardEDoes',
    installedKey: 'techArch.cardEInstalled',
    connectsKey: 'techArch.cardEConnects',
  },
  {
    icon: PlugZap,
    titleKey: 'techArch.cardFTitle',
    doesKey: 'techArch.cardFDoes',
    installedKey: 'techArch.cardFInstalled',
    connectsKey: 'techArch.cardFConnects',
  },
  {
    icon: Sparkles,
    titleKey: 'techArch.cardGTitle',
    doesKey: 'techArch.cardGDoes',
    installedKey: 'techArch.cardGInstalled',
    connectsKey: 'techArch.cardGConnects',
  },
  {
    icon: MonitorCog,
    titleKey: 'techArch.cardHTitle',
    doesKey: 'techArch.cardHDoes',
    installedKey: 'techArch.cardHInstalled',
    connectsKey: 'techArch.cardHConnects',
  },
]

const CONNECTION_NODES = [
  { icon: Users, key: 'connectionDiagram.node1' },
  { icon: RadioTower, key: 'connectionDiagram.node2' },
  { icon: Network, key: 'connectionDiagram.node3' },
  { icon: Activity, key: 'connectionDiagram.node4' },
  { icon: Server, key: 'connectionDiagram.node5' },
  { icon: LayoutDashboard, key: 'connectionDiagram.node6' },
  { icon: ClipboardCheck, key: 'connectionDiagram.node7' },
  { icon: Cpu, key: 'connectionDiagram.node8' },
  { icon: Lightbulb, key: 'connectionDiagram.node9' },
  { icon: PlugZap, key: 'connectionDiagram.node10' },
  { icon: Sparkles, key: 'connectionDiagram.node11' },
]

const REAL_CHAIN = [
  'connectionDiagram.realChain1',
  'connectionDiagram.realChain2',
  'connectionDiagram.realChain3',
  'connectionDiagram.realChain4',
  'connectionDiagram.realChain5',
]

const LANES = [
  { titleKey: 'connectionDiagram.laneA', sensor: 'S-01', led: 'LED-A', controller: 'LC-01' },
  { titleKey: 'connectionDiagram.laneB', sensor: 'S-02', led: 'LED-B', controller: 'LC-01' },
  { titleKey: 'connectionDiagram.laneC', sensor: 'S-03', led: 'LED-C', controller: 'LC-02' },
]

const SCENARIO_STEPS = [
  'connectionDiagram.scenario1',
  'connectionDiagram.scenario2',
  'connectionDiagram.scenario3',
  'connectionDiagram.scenario4',
  'connectionDiagram.scenario5',
  'connectionDiagram.scenario6',
  'connectionDiagram.scenario7',
  'connectionDiagram.scenario8',
  'connectionDiagram.scenario9',
  'connectionDiagram.scenario10',
]

const CONTROL_MODES = [
  { icon: Hand, titleKey: 'connectionDiagram.modeManualTitle', bodyKey: 'connectionDiagram.modeManualBody', tone: 'guidance' as const },
  { icon: BrainCircuit, titleKey: 'connectionDiagram.modeAutoTitle', bodyKey: 'connectionDiagram.modeAutoBody', tone: 'normal' as const },
  { icon: ShieldOff, titleKey: 'connectionDiagram.modeEmergencyTitle', bodyKey: 'connectionDiagram.modeEmergencyBody', tone: 'high' as const },
]

const MODE_TONE_CLASSES: Record<'guidance' | 'normal' | 'high', string> = {
  guidance: 'border-status-guidance/30 bg-status-guidance/5 text-status-guidance',
  normal: 'border-status-normal/30 bg-status-normal/5 text-status-normal',
  high: 'border-status-high/30 bg-status-high/5 text-status-high',
}

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

      {/* ===================== System Technical Architecture ===================== */}
      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-100">{t('techArch.title')}</h2>
            <p className="mt-1 text-sm text-slate-400">{t('techArch.subtitle')}</p>
          </div>
          <SimBadge />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HARDWARE_CARDS.map((card) => (
            <HardwareCard key={card.titleKey} card={card} />
          ))}
        </div>
      </div>

      {/* ===================== Real System Connection Diagram ===================== */}
      <div className="mt-10 border-t border-white/10 pt-8">
        <h2 className="mb-4 text-lg font-bold text-slate-100">{t('connectionDiagram.title')}</h2>

        <div className="panel flex flex-col items-center gap-1 p-6">
          {CONNECTION_NODES.map((node, i) => (
            <div key={node.key} className="flex flex-col items-center">
              <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-teal-500/25 bg-teal-500/5 px-4 py-3">
                <node.icon size={20} className="shrink-0 text-teal-400" />
                <span className="text-sm font-medium text-slate-200">{t(node.key)}</span>
              </div>
              {i < CONNECTION_NODES.length - 1 && <ArrowDown size={18} className="my-1 text-slate-600" />}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-status-guidance/30 bg-status-guidance/5 px-3 py-2 text-xs text-status-guidance">
          <Repeat size={14} className="mt-0.5 shrink-0" />
          <p>
            <span className="font-semibold">{t('connectionDiagram.feedbackLabel')}: </span>
            {t('connectionDiagram.feedbackBody')}
          </p>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
          <Info size={14} className="mt-0.5 shrink-0 text-teal-400" />
          <p>{t('connectionDiagram.frontendNote')}</p>
        </div>

        <div className="mt-6 panel p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('connectionDiagram.realChainTitle')}</h3>
          <FlowRow items={REAL_CHAIN} />
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('connectionDiagram.mappingTitle')}</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {LANES.map((lane) => (
              <div key={lane.titleKey} className="panel p-4">
                <p className="mb-2 text-sm font-semibold text-teal-300">{t(lane.titleKey)}</p>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li>
                    <span className="text-slate-500">{t('connectionDiagram.laneSensor')}: </span>
                    <span className="font-mono text-slate-300">{lane.sensor}</span>
                  </li>
                  <li>
                    <span className="text-slate-500">{t('connectionDiagram.laneRoute')}: </span>
                    <span className="font-mono text-slate-300">{lane.led}</span>
                  </li>
                  <li>
                    <span className="text-slate-500">{t('connectionDiagram.laneController')}: </span>
                    <span className="font-mono text-slate-300">{lane.controller}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 panel p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('connectionDiagram.scenarioTitle')}</h3>
          <ol className="space-y-2">
            {SCENARIO_STEPS.map((key, i) => (
              <li key={key} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-[11px] font-semibold text-teal-300">
                  {i + 1}
                </span>
                {t(key)}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 panel p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Code2 size={16} className="text-teal-400" /> {t('connectionDiagram.commandTitle')}
          </h3>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-navy-950 px-4 py-3 font-mono text-xs text-teal-300">
{`activate_route: B
mode: directional_arrow
status: active`}
          </pre>
          <p className="mt-2 text-[11px] text-slate-500">{t('connectionDiagram.commandNote')}</p>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('connectionDiagram.modesTitle')}</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CONTROL_MODES.map((mode) => (
              <div key={mode.titleKey} className={`rounded-xl border p-4 ${MODE_TONE_CLASSES[mode.tone]}`}>
                <mode.icon size={20} className="mb-2" />
                <p className="mb-1 text-sm font-semibold">{t(mode.titleKey)}</p>
                <p className="text-xs opacity-90">{t(mode.bodyKey)}</p>
              </div>
            ))}
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <Info size={13} className="mt-0.5 shrink-0 text-teal-400" /> {t('connectionDiagram.modesNote1')}
            </li>
            <li className="flex items-start gap-2">
              <Info size={13} className="mt-0.5 shrink-0 text-teal-400" /> {t('connectionDiagram.modesNote2')}
            </li>
            <li className="flex items-start gap-2">
              <Info size={13} className="mt-0.5 shrink-0 text-teal-400" /> {t('connectionDiagram.modesNote3')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
