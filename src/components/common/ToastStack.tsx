import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation } from '../../state/SimulationContext'
import type { ToastItem } from '../../types'

const ICON: Record<ToastItem['tone'], typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  critical: ShieldAlert,
  success: CheckCircle2,
}

const COLOR: Record<ToastItem['tone'], string> = {
  info: 'border-status-guidance/40 text-status-guidance',
  warning: 'border-status-elevated/40 text-status-elevated',
  critical: 'border-status-high/40 text-status-high',
  success: 'border-status-normal/40 text-status-normal',
}

export default function ToastStack() {
  const { state, dispatch } = useSimulation()
  const { t } = useLang()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:start-auto sm:end-4 sm:items-end">
      <AnimatePresence initial={false}>
        {state.toasts.slice(-4).map((toast) => {
          const Icon = ICON[toast.tone]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className={`pointer-events-auto flex w-full max-w-sm items-center gap-2 rounded-xl border bg-navy-900/95 px-4 py-3 shadow-lg backdrop-blur ${COLOR[toast.tone]}`}
            >
              <Icon size={18} className="shrink-0" />
              <p className="text-sm font-medium text-slate-100">{t(toast.messageKey)}</p>
              <button
                onClick={() => dispatch({ type: 'DISMISS_TOAST', id: toast.id })}
                className="ms-auto text-slate-500 hover:text-slate-300"
                aria-label={t('common.close')}
              >
                ×
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
