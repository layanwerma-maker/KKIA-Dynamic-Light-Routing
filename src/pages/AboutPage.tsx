import {
  ArrowRight,
  BookOpen,
  ShieldQuestion,
  Radio,
  Activity,
  BrainCircuit,
  Sparkles,
  MonitorPlay,
  LayoutDashboard,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  FlaskConical,
  Gauge,
  HelpCircle,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import BrandMark from '../components/common/BrandMark'
import FlowRow from '../components/common/FlowRow'
import Accordion, { type AccordionItem } from '../components/common/Accordion'

const COMPONENT_CARDS = [
  { icon: Radio, titleKey: 'components.cardATitle', bodyKey: 'components.cardABody' },
  { icon: Activity, titleKey: 'components.cardBTitle', bodyKey: 'components.cardBBody' },
  { icon: BrainCircuit, titleKey: 'components.cardCTitle', bodyKey: 'components.cardCBody' },
  { icon: Sparkles, titleKey: 'components.cardDTitle', bodyKey: 'components.cardDBody' },
  { icon: MonitorPlay, titleKey: 'components.cardETitle', bodyKey: 'components.cardEBody' },
  { icon: LayoutDashboard, titleKey: 'components.cardFTitle', bodyKey: 'components.cardFBody' },
]

const HOW_WORKS_STEPS = ['howWorks.step1', 'howWorks.step2', 'howWorks.step3', 'howWorks.step4', 'howWorks.step5', 'howWorks.step6', 'howWorks.step7']

const SECURITY_SCENARIO_STEPS = [
  'scenarios.securityStep1',
  'scenarios.securityStep2',
  'scenarios.securityStep3',
  'scenarios.securityStep4',
  'scenarios.securityStep5',
  'scenarios.securityStep6',
]

const SAFETY_CONTROLS = [
  'safetyControls.item1',
  'safetyControls.item2',
  'safetyControls.item3',
  'safetyControls.item4',
  'safetyControls.item5',
  'safetyControls.item6',
  'safetyControls.item7',
]

const PILOT_STEPS = ['pilotTrial.step1', 'pilotTrial.step2', 'pilotTrial.step3', 'pilotTrial.step4', 'pilotTrial.step5', 'pilotTrial.step6', 'pilotTrial.step7']

const PILOT_KPIS = ['pilotTrial.kpi1', 'pilotTrial.kpi2', 'pilotTrial.kpi3', 'pilotTrial.kpi4', 'pilotTrial.kpi5', 'pilotTrial.kpi6']

const FAQ_ITEMS: AccordionItem[] = [
  { id: 'q1', questionKey: 'faq.q1' },
  { id: 'q2', questionKey: 'faq.q2' },
  {
    id: 'q3',
    questionKey: 'faq.q3',
    extra: (
      <div className="mt-3">
        <FlowRow items={['Dashboard', 'Backend/API', 'PLC/Gateway', 'LED Controller', 'LED']} raw />
      </div>
    ),
  },
  { id: 'q4', questionKey: 'faq.q4' },
  { id: 'q5', questionKey: 'faq.q5' },
  { id: 'q6', questionKey: 'faq.q6' },
  { id: 'q7', questionKey: 'faq.q7' },
  { id: 'q8', questionKey: 'faq.q8' },
  { id: 'q9', questionKey: 'faq.q9' },
  { id: 'q10', questionKey: 'faq.q10' },
  { id: 'q11', questionKey: 'faq.q11' },
  { id: 'q12', questionKey: 'faq.q12' },
]

export default function AboutPage() {
  const { t } = useLang()

  const benefits = [
    'about.benefit1',
    'about.benefit2',
    'about.benefit3',
    'about.benefit4',
    'about.benefit5',
    'about.benefit6',
    'about.benefit7',
    'about.benefit8',
  ]

  return (
    <div>
      <SectionHeader title={t('about.title')} subtitle={t('about.subtitle')} />

      <div className="mb-6 panel flex items-center gap-3 p-4">
        <BrandMark size="md" />
      </div>

      <div className="mb-6 rounded-xl border border-teal-500/30 bg-teal-500/5 p-4">
        <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-teal-300">
          <ShieldQuestion size={16} /> {t('about.conceptRuleTitle')}
        </h3>
        <p className="text-sm text-teal-100/90">{t('about.conceptRuleBody')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="panel p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200">{t('about.problemTitle')}</h3>
          <p className="text-sm text-slate-400">{t('about.problemBody')}</p>
        </div>
        <div className="panel p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200">{t('about.solutionTitle')}</h3>
          <p className="text-sm text-slate-400">{t('about.solutionBody')}</p>
        </div>
      </div>

      <div className="my-6 panel flex flex-col items-center gap-2 p-5 text-center">
        <h3 className="text-sm font-semibold text-slate-200">{t('about.howTitle')}</h3>
        <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-teal-300">
          {t('about.howSteps')}
        </p>
      </div>

      <div className="mb-6 panel p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">{t('about.benefitTitle')}</h3>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {benefits.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-slate-400">
              <ArrowRight size={14} className="mt-0.5 shrink-0 text-teal-500 rtl:rotate-180" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      {/* System Components & Technologies */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{t('components.title')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_CARDS.map((card) => (
            <div key={card.titleKey} className="panel flex flex-col gap-2 p-4">
              <card.icon size={20} className="text-teal-400" />
              <h3 className="text-sm font-semibold text-slate-200">{t(card.titleKey)}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{t(card.bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How the System Works */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">{t('howWorks.title')}</h2>
        <FlowRow items={HOW_WORKS_STEPS} />
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-status-elevated/30 bg-status-elevated/10 px-3 py-2 text-xs text-status-elevated">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <p>{t('howWorks.safetyNote')}</p>
        </div>
      </div>

      {/* Operational Scenarios */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="panel p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">{t('scenarios.securityTitle')}</h2>
          <ol className="space-y-2">
            {SECURITY_SCENARIO_STEPS.map((key, i) => (
              <li key={key} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-[11px] font-semibold text-teal-300">
                  {i + 1}
                </span>
                {t(key)}
              </li>
            ))}
          </ol>
        </div>

        <div className="panel p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">{t('scenarios.arrivalsTitle')}</h2>
          <p className="mb-3 text-sm text-slate-400">{t('scenarios.arrivalsBody')}</p>
          <div className="flex items-start gap-2 rounded-lg border border-status-high/30 bg-status-high/10 px-3 py-2 text-xs text-status-high">
            <ShieldAlert size={14} className="mt-0.5 shrink-0" />
            <p>{t('scenarios.arrivalsSafetyNote')}</p>
          </div>
        </div>
      </div>

      {/* Operational & Safety Controls */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">{t('safetyControls.title')}</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SAFETY_CONTROLS.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-slate-400">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-status-normal" />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      {/* Pilot Trial */}
      <div className="mb-6 panel p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <FlaskConical size={16} className="text-teal-400" /> {t('pilotTrial.title')}
        </h2>
        <FlowRow items={PILOT_STEPS} />
        <h3 className="mb-2 mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <Gauge size={14} /> {t('pilotTrial.kpisTitle')}
        </h3>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PILOT_KPIS.map((key) => (
            <li
              key={key}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-300"
            >
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      {/* Expected Questions / FAQ */}
      <div className="mb-6">
        <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <HelpCircle size={16} className="text-teal-400" /> {t('faq.title')}
        </h2>
        <p className="mb-3 text-xs text-slate-500">{t('faq.subtitle')}</p>
        <Accordion
          items={FAQ_ITEMS}
          answerKey={(id) => `faq.a${id.replace('q', '')}`}
        />
      </div>

      <div className="panel p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <BookOpen size={16} className="text-teal-400" /> {t('about.researchTitle')}
        </h3>
        <p className="text-sm text-slate-400">{t('about.researchBody')}</p>
      </div>
    </div>
  )
}
