import { useLang } from '../../i18n/LanguageContext'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`inline-flex overflow-hidden rounded-lg border border-white/15 text-xs font-semibold ${className}`}>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 transition ${lang === 'en' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`px-3 py-1.5 transition ${lang === 'ar' ? 'bg-teal-500 text-navy-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
      >
        AR
      </button>
    </div>
  )
}
