import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { Level, OperatingMode, SimState, ZoneId } from '../types'
import { createInitialExterior, createInitialSensors, createInitialZones, SIM_START_MINUTES } from '../data/initialState'
import { applyArrivalsStep, applySecurityStep, ARRIVALS_STEP_COUNT, SECURITY_STEP_COUNT } from './scenarios'
import { computeDecision } from './decisionEngine'

function createInitialState(): SimState {
  return {
    mode: 'AUTO',
    zones: createInitialZones(),
    sensors: createInitialSensors(),
    exterior: createInitialExterior(),
    routes: {
      securityMain: { active: true, available: true, utilizationPct: 94, capacityStatus: 'NORMAL' },
      securityAlt: { active: false, available: false, utilizationPct: 6, capacityStatus: 'NORMAL' },
      arrivalsMain: { active: true, available: true, utilizationPct: 90, capacityStatus: 'NORMAL' },
      arrivalsAlt: { active: false, available: false, utilizationPct: 10, capacityStatus: 'NORMAL' },
    },
    timeline: [],
    toasts: [],
    scenario: 'IDLE',
    stepIndex: 0,
    simClockMinutes: SIM_START_MINUTES,
    guidanceActive: false,
    guidanceZone: null,
    fullDemo: false,
    running: false,
    arrivalsBranch: 'PENDING',
    history: [],
  }
}

type Action =
  | { type: 'SET_MODE'; mode: OperatingMode }
  | { type: 'SET_ZONE_LEVEL'; zoneId: ZoneId; level: Level }
  | { type: 'MANUAL_ACTIVATE_ALT'; target: 'security' | 'arrivals' }
  | { type: 'MANUAL_RETURN_PRIMARY'; target: 'security' | 'arrivals' }
  | { type: 'START_SECURITY' }
  | { type: 'START_ARRIVALS' }
  | { type: 'TOGGLE_EXTERIOR_CONGESTION' }
  | { type: 'START_FULL_DEMO' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STEP_FORWARD' }
  | { type: 'STEP_BACK' }
  | { type: 'DISMISS_TOAST'; id: string }

function snapshot(state: SimState): SimState['history'][number] {
  const { history: _history, ...rest } = state
  return rest
}

function advanceScenario(state: SimState): SimState {
  if (state.scenario === 'SECURITY') {
    const step = state.stepIndex + 1
    const { state: next } = applySecurityStep(state, step)
    if (step >= SECURITY_STEP_COUNT) {
      if (state.fullDemo) {
        return { ...next, scenario: 'ARRIVALS_PEAK', stepIndex: 0, running: true }
      }
      return { ...next, scenario: 'IDLE', stepIndex: 0, running: false }
    }
    return { ...next, stepIndex: step }
  }

  if (state.scenario === 'ARRIVALS_PEAK') {
    const step = state.stepIndex + 1
    const { state: next } = applyArrivalsStep(state, step)
    if (step >= ARRIVALS_STEP_COUNT) {
      return { ...next, scenario: 'IDLE', stepIndex: 0, running: false, fullDemo: false }
    }
    return { ...next, stepIndex: step }
  }

  return state
}

const LEVEL_DENSITY: Record<Level, { density: number; queue: number; wait: number }> = {
  NORMAL: { density: 42, queue: 8, wait: 4 },
  ELEVATED: { density: 68, queue: 24, wait: 13 },
  HIGH: { density: 90, queue: 40, wait: 22 },
}

function reducer(state: SimState, action: Action): SimState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.mode }

    case 'SET_ZONE_LEVEL': {
      const preset = LEVEL_DENSITY[action.level]
      return {
        ...state,
        zones: {
          ...state.zones,
          [action.zoneId]: {
            ...state.zones[action.zoneId],
            level: action.level,
            densityPct: preset.density,
            queueLength: preset.queue,
            waitTimeMin: preset.wait,
          },
        },
        sensors: state.sensors.map((s) =>
          s.zoneId === action.zoneId ? { ...s, densityPct: preset.density, level: action.level } : s,
        ),
      }
    }

    case 'MANUAL_ACTIVATE_ALT': {
      if (action.target === 'security') {
        return {
          ...state,
          guidanceActive: true,
          guidanceZone: 'securityAlt',
          routes: {
            ...state.routes,
            securityAlt: { ...state.routes.securityAlt, available: true, active: true, utilizationPct: 36 },
            securityMain: { ...state.routes.securityMain, utilizationPct: 64 },
          },
        }
      }
      return {
        ...state,
        guidanceActive: true,
        guidanceZone: 'altExit',
        routes: {
          ...state.routes,
          arrivalsAlt: { ...state.routes.arrivalsAlt, available: true, active: true, utilizationPct: 40 },
          arrivalsMain: { ...state.routes.arrivalsMain, utilizationPct: 60 },
        },
      }
    }

    case 'MANUAL_RETURN_PRIMARY': {
      if (action.target === 'security') {
        return {
          ...state,
          guidanceActive: false,
          guidanceZone: state.guidanceZone === 'securityAlt' ? null : state.guidanceZone,
          routes: {
            ...state.routes,
            securityAlt: { ...state.routes.securityAlt, active: false, utilizationPct: 6 },
            securityMain: { ...state.routes.securityMain, utilizationPct: 94 },
          },
        }
      }
      return {
        ...state,
        guidanceActive: false,
        guidanceZone: state.guidanceZone === 'altExit' ? null : state.guidanceZone,
        routes: {
          ...state.routes,
          arrivalsAlt: { ...state.routes.arrivalsAlt, active: false, utilizationPct: 10 },
          arrivalsMain: { ...state.routes.arrivalsMain, utilizationPct: 90 },
        },
      }
    }

    case 'START_SECURITY':
      return { ...state, scenario: 'SECURITY', stepIndex: 0, running: true, fullDemo: false, history: [] }

    case 'START_ARRIVALS':
      return { ...state, scenario: 'ARRIVALS_PEAK', stepIndex: 0, running: true, fullDemo: false, history: [] }

    case 'START_FULL_DEMO':
      return { ...state, scenario: 'SECURITY', stepIndex: 0, running: true, fullDemo: true, history: [] }

    case 'TOGGLE_EXTERIOR_CONGESTION': {
      const goingHigh = state.exterior.status !== 'HIGH'
      const tone: 'critical' | 'success' = goingHigh ? 'critical' : 'success'
      const nextExterior = goingHigh
        ? {
            peopleOutside: 520,
            pickupCongestionPct: 86,
            receivingDensityPct: 92,
            pedestrianDensityPct: 88,
            availableCapacityPct: 8,
            status: 'HIGH' as Level,
          }
        : createInitialExterior()
      return {
        ...state,
        scenario: 'EXTERIOR_CONGESTION',
        exterior: nextExterior,
        sensors: state.sensors.map((s) =>
          s.zoneId === 'exteriorReceiving' ? { ...s, densityPct: nextExterior.receivingDensityPct, level: nextExterior.status } : s,
        ),
        zones: {
          ...state.zones,
          exteriorReceiving: {
            ...state.zones.exteriorReceiving,
            level: nextExterior.status,
            densityPct: nextExterior.receivingDensityPct,
          },
        },
        timeline: [
          {
            id: `evt-ext-${Date.now()}`,
            time: `${Math.floor((state.simClockMinutes / 60) % 24)
              .toString()
              .padStart(2, '0')}:${(state.simClockMinutes % 60).toString().padStart(2, '0')}`,
            messageKey: goingHigh ? 'toast.exteriorHigh' : 'toast.normalRestored',
            tone,
          },
          ...state.timeline,
        ].slice(0, 40),
        toasts: [
          ...state.toasts,
          {
            id: `toast-ext-${Date.now()}`,
            messageKey: goingHigh ? 'toast.exteriorHigh' : 'toast.normalRestored',
            tone,
          },
        ],
      }
    }

    case 'RESET':
      return createInitialState()

    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }

    case 'TICK': {
      if (!state.running) return state
      if (state.scenario !== 'SECURITY' && state.scenario !== 'ARRIVALS_PEAK') return state
      const history = [...state.history, snapshot(state)].slice(-30)
      return { ...advanceScenario(state), history }
    }

    case 'STEP_FORWARD': {
      if (state.scenario !== 'SECURITY' && state.scenario !== 'ARRIVALS_PEAK') return state
      const history = [...state.history, snapshot(state)].slice(-30)
      return { ...advanceScenario(state), running: false, history }
    }

    case 'STEP_BACK': {
      if (state.history.length === 0) return state
      const prev = state.history[state.history.length - 1]
      return { ...prev, running: false, history: state.history.slice(0, -1) }
    }

    case 'PAUSE':
      return { ...state, running: false }

    case 'RESUME':
      if (state.scenario !== 'SECURITY' && state.scenario !== 'ARRIVALS_PEAK') return state
      return { ...state, running: true }

    default:
      return state
  }
}

interface SimulationContextValue {
  state: SimState
  dispatch: React.Dispatch<Action>
  securityDecision: ReturnType<typeof computeDecision>
  arrivalsDecision: ReturnType<typeof computeDecision>
}

const SimulationContext = createContext<SimulationContextValue | undefined>(undefined)

const TICK_MS = 1700

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  useEffect(() => {
    if (!state.running) return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), TICK_MS)
    return () => window.clearInterval(id)
  }, [state.running, state.scenario])

  useEffect(() => {
    if (state.toasts.length === 0) return
    const latest = state.toasts[state.toasts.length - 1]
    const id = window.setTimeout(() => dispatch({ type: 'DISMISS_TOAST', id: latest.id }), 4200)
    return () => window.clearTimeout(id)
  }, [state.toasts])

  const securityDecision = useMemo(
    () => computeDecision(state.zones, state.exterior, 'securityQueue', 'securityAlt', 'departureHall', state.routes.securityAlt.available),
    [state.zones, state.exterior, state.routes.securityAlt.available],
  )

  const arrivalsDecision = useMemo(
    () =>
      computeDecision(state.zones, state.exterior, 'mainExit', 'altExit', 'pickupZone', state.routes.arrivalsAlt.available),
    [state.zones, state.exterior, state.routes.arrivalsAlt.available],
  )

  const value: SimulationContextValue = { state, dispatch, securityDecision, arrivalsDecision }

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
}

export function useSimulation() {
  const ctx = useContext(SimulationContext)
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider')
  return ctx
}

export { SECURITY_STEP_COUNT, ARRIVALS_STEP_COUNT }
