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
  CheckCircle2,
  FlaskConical,
  Gauge,
  HelpCircle,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import BrandMark from '../components/common/BrandMark'
import FlowRow from '../components/common/FlowRow'
import FaqSection, { type FaqCategoryDef, type FaqQuestionItem } from '../components/common/FaqSection'

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

const FAQ_CATEGORIES: FaqCategoryDef[] = [
  { id: 'conceptOps', labelKey: 'faq.catConceptOps' },
  { id: 'hardware', labelKey: 'faq.catHardware' },
  { id: 'light', labelKey: 'faq.catLight' },
  { id: 'audio', labelKey: 'faq.catAudio' },
  { id: 'safety', labelKey: 'faq.catSafety' },
  { id: 'ict', labelKey: 'faq.catIct' },
  { id: 'pilot', labelKey: 'faq.catPilot' },
  { id: 'measurement', labelKey: 'faq.catMeasurement' },
]

const Q3_CHAIN = (
  <div className="mt-3">
    <FlowRow items={['Dashboard', 'Backend/API', 'PLC/Gateway', 'LED Controller', 'LED']} raw />
  </div>
)

function faqItem(id: string, category: string, extra?: FaqQuestionItem['extra']): FaqQuestionItem {
  return { id, category, extra }
}

const FAQ_ITEMS: FaqQuestionItem[] = [
  // Concept & Operations
  faqItem('q1', 'conceptOps'),
  faqItem('q5', 'conceptOps'),
  faqItem('q6', 'conceptOps'),
  faqItem('q12', 'conceptOps'),
  faqItem('q13', 'conceptOps'),
  faqItem('q14', 'conceptOps'),
  faqItem('q15', 'conceptOps'),
  faqItem('q16', 'conceptOps'),
  faqItem('q17', 'conceptOps'),
  faqItem('q18', 'conceptOps'),
  // Hardware & Integration
  faqItem('q2', 'hardware'),
  faqItem('q19', 'hardware'),
  faqItem('q20', 'hardware'),
  faqItem('q21', 'hardware'),
  faqItem('q22', 'hardware'),
  faqItem('q23', 'hardware'),
  faqItem('q24', 'hardware'),
  faqItem('q25', 'hardware'),
  faqItem('q26', 'hardware'),
  // Light Guidance
  faqItem('q4', 'light'),
  faqItem('q27', 'light'),
  faqItem('q28', 'light'),
  faqItem('q29', 'light'),
  faqItem('q30', 'light'),
  faqItem('q31', 'light'),
  faqItem('q32', 'light'),
  // Directional Audio
  faqItem('q33', 'audio'),
  faqItem('q34', 'audio'),
  faqItem('q35', 'audio'),
  faqItem('q36', 'audio'),
  faqItem('q37', 'audio'),
  faqItem('q38', 'audio'),
  faqItem('q39', 'audio'),
  faqItem('q40', 'audio'),
  faqItem('q41', 'audio'),
  faqItem('q42', 'audio'),
  faqItem('q43', 'audio'),
  faqItem('q44', 'audio'),
  faqItem('q45', 'audio'),
  faqItem('q46', 'audio'),
  faqItem('q47', 'audio'),
  // Safety & Security
  faqItem('q7', 'safety'),
  faqItem('q8', 'safety'),
  faqItem('q9', 'safety'),
  faqItem('q48', 'safety'),
  faqItem('q49', 'safety'),
  faqItem('q50', 'safety'),
  faqItem('q51', 'safety'),
  faqItem('q52', 'safety'),
  faqItem('q53', 'safety'),
  faqItem('q54', 'safety'),
  faqItem('q55', 'safety'),
  faqItem('q56', 'safety'),
  faqItem('q57', 'safety'),
  // Technology & ICT
  faqItem('q3', 'ict', Q3_CHAIN),
  faqItem('q58', 'ict'),
  faqItem('q59', 'ict'),
  faqItem('q60', 'ict'),
  faqItem('q61', 'ict'),
  faqItem('q62', 'ict'),
  // Pilot
  faqItem('q10', 'pilot'),
  faqItem('q63', 'pilot'),
  faqItem('q64', 'pilot'),
  faqItem('q65', 'pilot'),
  faqItem('q66', 'pilot'),
  faqItem('q67', 'pilot'),
  faqItem('q68', 'pilot'),
  // Measurement & Expansion
  faqItem('q11', 'measurement'),
  faqItem('q69', 'measurement'),
  faqItem('q70', 'measurement'),
  faqItem('q71', 'measurement'),
  faqItem('q72', 'measurement'),
  faqItem('q73', 'measurement'),
  faqItem('q74', 'measurement'),
  faqItem('q75', 'measurement'),
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
        <FaqSection items={FAQ_ITEMS} categories={FAQ_CATEGORIES} />
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
