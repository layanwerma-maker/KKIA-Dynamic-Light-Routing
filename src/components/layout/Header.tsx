import { Menu, Radio } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation } from '../../state/SimulationContext'
import LanguageSwitcher from '../common/LanguageSwitcher'

function formatClock(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

export default function Header({ onMenu }: { onMenu: () => void }) {
  const { t } = useLang()
  const { state } = useSimulation()

  return (
    <header className="no-print sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-navy-950/85 px-4 py-3 backdrop-blur">
      <button className="text-slate-400 hover:text-slate-200 lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold uppercase tracking-widest text-teal-400">{t('common.orgEn')}</p>
        <p className="truncate text-sm font-medium text-slate-200">{t('common.projectTag')}</p>
      </div>

      <div className="hidden items-center gap-4 sm:flex">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
          <Radio size={13} className="text-status-normal" />
          <span className="text-slate-400">{t('header.systemStatus')}</span>
          <span className="font-semibold text-status-normal">{t('common.active')}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
          <span className="text-slate-400">{t('header.mode')}</span>
          <span className="font-semibold text-teal-300">{state.mode === 'AUTO' ? t('common.auto') : t('common.manual')}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs tabular-nums">
          <span className="text-slate-400">{t('header.localTime')}</span>
          <span className="font-semibold text-slate-100">{formatClock(state.simClockMinutes)}</span>
        </div>
      </div>

      <LanguageSwitcher />
    </header>
  )
}
