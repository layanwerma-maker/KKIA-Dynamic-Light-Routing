import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  PlaneLanding,
  Route as RouteIcon,
  BarChart3,
  BrainCircuit,
  Radio,
  Settings2,
  Network,
  Volume2,
  FlaskConical,
  Gauge,
  Presentation,
  Info,
  X,
} from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import BrandMark from '../common/BrandMark'

const ITEMS = [
  { to: '/', icon: LayoutDashboard, key: 'nav.overview' },
  { to: '/map', icon: MapPin, key: 'nav.map' },
  { to: '/security', icon: ShieldCheck, key: 'nav.security' },
  { to: '/arrivals', icon: PlaneLanding, key: 'nav.arrivals' },
  { to: '/journey', icon: RouteIcon, key: 'nav.journey' },
  { to: '/analytics', icon: BarChart3, key: 'nav.analytics' },
  { to: '/decision', icon: BrainCircuit, key: 'nav.decision' },
  { to: '/sensors', icon: Radio, key: 'nav.sensors' },
  { to: '/route-control', icon: Settings2, key: 'nav.routeControl' },
  { to: '/architecture', icon: Network, key: 'nav.architecture' },
  { to: '/acoustic-guidance', icon: Volume2, key: 'nav.acoustic' },
  { to: '/pilot', icon: FlaskConical, key: 'nav.pilot' },
  { to: '/kpis', icon: Gauge, key: 'nav.kpis' },
  { to: '/presentation', icon: Presentation, key: 'nav.presentation' },
  { to: '/about', icon: Info, key: 'nav.about' },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-72 flex-col border-e border-white/10 bg-navy-900 transition-transform lg:static lg:translate-x-0 ${
          open ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full max-lg:rtl:translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-4">
          <BrandMark size="sm" />
          <button className="text-slate-400 hover:text-slate-200 lg:hidden" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {ITEMS.map(({ to, icon: Icon, key }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-teal-500/15 text-teal-300 shadow-glow'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                    }`
                  }
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{t(key)}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/10 px-4 py-3 text-[11px] text-slate-500">
          {t('common.orgEn')} · {t('common.orgAr')}
        </div>
      </aside>
    </>
  )
}
