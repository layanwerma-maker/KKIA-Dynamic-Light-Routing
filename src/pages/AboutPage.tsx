import { ArrowRight, BookOpen, ShieldQuestion } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import SectionHeader from '../components/common/SectionHeader'
import BrandMark from '../components/common/BrandMark'

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

      <div className="panel p-4">
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

      <div className="mt-6 panel p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <BookOpen size={16} className="text-teal-400" /> {t('about.researchTitle')}
        </h3>
        <p className="text-sm text-slate-400">{t('about.researchBody')}</p>
      </div>

      <div className="mt-6 space-y-2 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-500">
        <p>{t('disclaimerFull.operational')}</p>
        <p>{t('disclaimerFull.simulation')}</p>
      </div>
    </div>
  )
}
