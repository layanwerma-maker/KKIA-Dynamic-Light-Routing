export type Level = 'NORMAL' | 'ELEVATED' | 'HIGH'

export type Lang = 'en' | 'ar'

export type OperatingMode = 'AUTO' | 'MANUAL'

export type ZoneId =
  | 'checkin'
  | 'securityEntrance'
  | 'securityQueue'
  | 'securityAlt'
  | 'departureHall'
  | 'boardingGates'
  | 'transferArea'
  | 'arrivalsCorridor'
  | 'baggageClaim'
  | 'mainExit'
  | 'altExit'
  | 'exteriorReceiving'
  | 'pickupZone'

export interface ZoneState {
  id: ZoneId
  labelKey: string
  level: Level
  densityPct: number
  queueLength: number
  waitTimeMin: number
}

export interface SensorReading {
  id: string
  labelKey: string
  zoneId: ZoneId
  densityPct: number
  level: Level
}

export interface RouteState {
  active: boolean
  available: boolean
  utilizationPct: number
  capacityStatus: Level
}

export interface ExteriorState {
  peopleOutside: number
  pickupCongestionPct: number
  receivingDensityPct: number
  pedestrianDensityPct: number
  availableCapacityPct: number
  status: Level
}

export interface DecisionSnapshot {
  primaryLevel: Level
  alternativeAvailable: boolean
  alternativeCapacityOk: boolean
  downstreamCapacityOk: boolean
  exteriorCapacityOk: boolean
  recommendation: 'RECOMMEND_ALTERNATIVE' | 'MAINTAIN_CURRENT'
  reasonKey: string
}

export interface TimelineEvent {
  id: string
  time: string
  messageKey: string
  tone: 'info' | 'warning' | 'critical' | 'success'
}

export type ScenarioKey =
  | 'IDLE'
  | 'SECURITY'
  | 'ARRIVALS_PEAK'
  | 'ARRIVALS_PEAK_SUSPENDED'
  | 'EXTERIOR_CONGESTION'
  | 'FULL_DEMO'

export interface ToastItem {
  id: string
  messageKey: string
  tone: 'info' | 'warning' | 'critical' | 'success'
}

export interface KpiBeforeAfter {
  labelKey: string
  before: number
  after: number
  unit: '%' | 'min'
}

export interface RoutesState {
  securityMain: RouteState
  securityAlt: RouteState
  arrivalsMain: RouteState
  arrivalsAlt: RouteState
}

export interface SimState {
  mode: OperatingMode
  zones: Record<ZoneId, ZoneState>
  sensors: SensorReading[]
  exterior: ExteriorState
  routes: RoutesState
  timeline: TimelineEvent[]
  toasts: ToastItem[]
  scenario: ScenarioKey
  stepIndex: number
  simClockMinutes: number
  guidanceActive: boolean
  guidanceZone: ZoneId | null
  fullDemo: boolean
  running: boolean
  arrivalsBranch: 'PENDING' | 'VERIFIED' | 'SUSPENDED'
  history: SimSnapshot[]
}

export type SimSnapshot = Omit<SimState, 'history'>
