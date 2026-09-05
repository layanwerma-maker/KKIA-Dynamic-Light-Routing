import { motion } from 'framer-motion'
import type { Level, ZoneId } from '../../types'
import { useLang } from '../../i18n/LanguageContext'
import { useSimulation } from '../../state/SimulationContext'

interface Node {
  id: ZoneId
  x: number
  y: number
  labelAbove?: boolean
}

const NODES: Node[] = [
  { id: 'checkin', x: 60, y: 130 },
  { id: 'securityEntrance', x: 210, y: 130 },
  { id: 'securityQueue', x: 360, y: 80 },
  { id: 'securityAlt', x: 360, y: 175 },
  { id: 'departureHall', x: 520, y: 130 },
  { id: 'transferArea', x: 675, y: 130 },
  { id: 'boardingGates', x: 840, y: 130, labelAbove: true },
  { id: 'arrivalsCorridor', x: 60, y: 400 },
  { id: 'baggageClaim', x: 220, y: 400 },
  { id: 'mainExit', x: 380, y: 350 },
  { id: 'altExit', x: 380, y: 450 },
  { id: 'exteriorReceiving', x: 590, y: 400 },
  { id: 'pickupZone', x: 840, y: 400 },
]

const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<ZoneId, Node>

const EDGES: Array<{ from: ZoneId; to: ZoneId; kind: 'primary' | 'alt' }> = [
  { from: 'checkin', to: 'securityEntrance', kind: 'primary' },
  { from: 'securityEntrance', to: 'securityQueue', kind: 'primary' },
  { from: 'securityEntrance', to: 'securityAlt', kind: 'alt' },
  { from: 'securityQueue', to: 'departureHall', kind: 'primary' },
  { from: 'securityAlt', to: 'departureHall', kind: 'alt' },
  { from: 'departureHall', to: 'transferArea', kind: 'primary' },
  { from: 'transferArea', to: 'boardingGates', kind: 'primary' },
  { from: 'arrivalsCorridor', to: 'baggageClaim', kind: 'primary' },
  { from: 'baggageClaim', to: 'mainExit', kind: 'primary' },
  { from: 'baggageClaim', to: 'altExit', kind: 'alt' },
  { from: 'mainExit', to: 'exteriorReceiving', kind: 'primary' },
  { from: 'altExit', to: 'exteriorReceiving', kind: 'alt' },
  { from: 'exteriorReceiving', to: 'pickupZone', kind: 'primary' },
]

const LEVEL_COLOR: Record<Level, string> = {
  NORMAL: '#3ddc84',
  ELEVATED: '#f5b942',
  HIGH: '#f2554b',
}
const GUIDANCE_COLOR = '#37d0ff'

function edgeColor(edge: (typeof EDGES)[number], zones: ReturnType<typeof useSimulation>['state']['zones'], guidanceActive: boolean, guidanceZone: ZoneId | null) {
  const isGuidanceEdge = edge.kind === 'alt' && guidanceActive && (edge.to === guidanceZone || edge.from === guidanceZone)
  if (isGuidanceEdge) return GUIDANCE_COLOR
  if (edge.kind === 'alt') return 'rgba(148,163,184,0.25)'
  const level = zones[edge.to].level
  return LEVEL_COLOR[level]
}

function dotCountForLevel(level: Level) {
  return level === 'HIGH' ? 7 : level === 'ELEVATED' ? 5 : 3
}
function durationForLevel(level: Level) {
  return level === 'HIGH' ? 4.4 : level === 'ELEVATED' ? 3.2 : 2.2
}

export default function AirportMap({ compact = false }: { compact?: boolean }) {
  const { t } = useLang()
  const { state } = useSimulation()
  const { zones, guidanceActive, guidanceZone } = state

  return (
    <div className="panel p-3 sm:p-5">
      <svg viewBox="0 0 940 520" className="h-auto w-full" role="img" aria-label={t('map.title')}>
        <defs>
          <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map((edge, i) => {
          const a = NODE_MAP[edge.from]
          const b = NODE_MAP[edge.to]
          const color = edgeColor(edge, zones, guidanceActive, guidanceZone)
          const isGuidance = color === GUIDANCE_COLOR
          return (
            <g key={i}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={color}
                strokeWidth={isGuidance ? 6 : 4}
                strokeLinecap="round"
                opacity={edge.kind === 'alt' && !isGuidance ? 0.35 : 0.85}
                filter={isGuidance ? 'url(#mapGlow)' : undefined}
              />
              {isGuidance && (
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#eafcff"
                  strokeWidth={2}
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  className="animate-flow"
                />
              )}
            </g>
          )
        })}

        {EDGES.map((edge, i) => {
          const a = NODE_MAP[edge.from]
          const b = NODE_MAP[edge.to]
          const isAltInactive = edge.kind === 'alt' && !(guidanceActive && (edge.to === guidanceZone || edge.from === guidanceZone))
          if (isAltInactive) return null
          const level = zones[edge.to].level
          const count = dotCountForLevel(level)
          const duration = durationForLevel(level)
          return Array.from({ length: count }).map((_, di) => (
            <motion.circle
              key={`${i}-${di}`}
              r={3.4}
              fill={edge.kind === 'alt' ? GUIDANCE_COLOR : '#e7edf5'}
              initial={{ cx: a.x, cy: a.y, opacity: 0 }}
              animate={{ cx: [a.x, b.x], cy: [a.y, b.y], opacity: [0, 1, 1, 0] }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay: (di / count) * duration,
              }}
            />
          ))
        })}

        {NODES.map((node) => {
          const zone = zones[node.id]
          const isGuidanceNode = guidanceActive && guidanceZone === node.id
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isGuidanceNode ? 16 : 13}
                fill="#0a1120"
                stroke={isGuidanceNode ? GUIDANCE_COLOR : LEVEL_COLOR[zone.level]}
                strokeWidth={3}
                filter={isGuidanceNode ? 'url(#mapGlow)' : undefined}
              />
              <circle cx={node.x} cy={node.y} r={4} fill={LEVEL_COLOR[zone.level]} />
              {!compact && (
                <text
                  x={node.x}
                  y={node.labelAbove ? node.y - 26 : node.y + 32}
                  textAnchor="middle"
                  fontSize={11.5}
                  fontWeight={600}
                  fill="#cbd5e1"
                >
                  {t(zone.labelKey)}
                </text>
              )}
              {!compact && (
                <text
                  x={node.x}
                  y={node.labelAbove ? node.y - 12 : node.y + 47}
                  textAnchor="middle"
                  fontSize={11}
                  fill={LEVEL_COLOR[zone.level]}
                >
                  {zone.densityPct}%
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {!compact && (
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">{t('map.legend')}:</span>
          <LegendDot color={LEVEL_COLOR.NORMAL} label={t('common.normal')} />
          <LegendDot color={LEVEL_COLOR.ELEVATED} label={t('common.elevated')} />
          <LegendDot color={LEVEL_COLOR.HIGH} label={t('common.high')} />
          <LegendDot color={GUIDANCE_COLOR} label={t('map.alternativeRoute')} />
        </div>
      )}
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}
