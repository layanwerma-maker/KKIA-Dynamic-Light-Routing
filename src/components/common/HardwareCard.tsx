import type { LucideIcon } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

export interface HardwareCardData {
  icon: LucideIcon
  titleKey: string
  doesKey: string
  noteKey?: string
  installedKey: string
  connectsKey: string
}

export default function HardwareCard({ card }: { card: HardwareCardData }) {
  const { t } = useLang()
  return (
    <div className="panel flex flex-col gap-2 p-4">
      <card.icon size={20} className="text-teal-400" />
      <h3 className="text-sm font-semibold text-slate-200">{t(card.titleKey)}</h3>
      <p className="text-xs leading-relaxed text-slate-400">{t(card.doesKey)}</p>
      {card.noteKey && (
        <p className="rounded-md border border-teal-500/20 bg-teal-500/5 px-2 py-1 text-[11px] font-medium text-teal-300">
          {t(card.noteKey)}
        </p>
      )}
      <div className="mt-1 space-y-1 border-t border-white/10 pt-2 text-[11px]">
        <p>
          <span className="font-semibold text-slate-500">{t('techArch.fieldInstalled')}: </span>
          <span className="text-slate-400">{t(card.installedKey)}</span>
        </p>
        <p>
          <span className="font-semibold text-slate-500">{t('techArch.fieldConnects')}: </span>
          <span className="text-slate-400">{t(card.connectsKey)}</span>
        </p>
      </div>
    </div>
  )
}
