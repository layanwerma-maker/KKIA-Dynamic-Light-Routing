import { useLang } from '../../i18n/LanguageContext'

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg'
  showAirport?: boolean
  className?: string
}

const SIZE_MAP = {
  sm: { logo: 'h-7', title: 'text-xs', sub: 'text-[10px]' },
  md: { logo: 'h-9', title: 'text-sm', sub: 'text-xs' },
  lg: { logo: 'h-14', title: 'text-lg', sub: 'text-sm' },
}

export default function BrandMark({ size = 'md', showAirport = true, className = '' }: BrandMarkProps) {
  const { t, lang } = useLang()
  const s = SIZE_MAP[size]
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/branding/riyadh-airports-logo.svg" alt="Riyadh Airports" className={`${s.logo} w-auto shrink-0`} />
      {showAirport && (
        <div className="min-w-0 border-s border-white/10 ps-3">
          <p className={`${s.title} font-semibold leading-tight text-slate-100`}>
            {lang === 'ar' ? t('common.airportAr') : t('common.airportEn')}
          </p>
          <p className={`${s.sub} leading-tight text-slate-400`}>{t('common.projectName')}</p>
        </div>
      )}
    </div>
  )
}
