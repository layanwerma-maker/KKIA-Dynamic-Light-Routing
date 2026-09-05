import type { Level, SimState, ToastItem, ZoneId } from '../types'

let uid = 0
function nextId(prefix: string) {
  uid += 1
  return `${prefix}-${uid}-${Date.now()}`
}

function formatClock(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

function withZone(state: SimState, zoneId: ZoneId, patch: Partial<SimState['zones'][ZoneId]>): SimState {
  return {
    ...state,
    zones: {
      ...state.zones,
      [zoneId]: { ...state.zones[zoneId], ...patch },
    },
  }
}

function withSensorZone(state: SimState, zoneId: ZoneId, densityPct: number, level: Level): SimState {
  return {
    ...state,
    sensors: state.sensors.map((s) => (s.zoneId === zoneId ? { ...s, densityPct, level } : s)),
  }
}

interface StepMeta {
  messageKey: string
  toastKey?: string
  tone: 'info' | 'warning' | 'critical' | 'success'
}

export interface StepOutcome {
  state: SimState
  meta: StepMeta
}

function commit(state: SimState, meta: StepMeta, advanceMinutes = 1): StepOutcome {
  const nextClock = state.simClockMinutes + advanceMinutes
  const withTime: SimState = { ...state, simClockMinutes: nextClock }
  const timelineEntry = {
    id: nextId('evt'),
    time: formatClock(nextClock),
    messageKey: meta.messageKey,
    tone: meta.tone,
  }
  const toasts: ToastItem[] = meta.toastKey
    ? [...state.toasts, { id: nextId('toast'), messageKey: meta.toastKey, tone: meta.tone }]
    : state.toasts
  return {
    state: {
      ...withTime,
      timeline: [timelineEntry, ...withTime.timeline].slice(0, 40),
      toasts,
    },
    meta,
  }
}

/* ---------------------------------------------------------------------- */
/* SECURITY SCREENING SCENARIO — 18 steps (see Section 13 of the brief)    */
/* ---------------------------------------------------------------------- */

export const SECURITY_STEP_COUNT = 18

export function applySecurityStep(state: SimState, step: number): StepOutcome {
  switch (step) {
    case 1:
      return commit(
        withZone({ ...state, guidanceActive: false, guidanceZone: null }, 'securityQueue', {
          level: 'NORMAL',
          densityPct: 44,
          queueLength: 12,
          waitTimeMin: 6,
        }),
        { messageKey: 'security.step1', tone: 'info' },
      )
    case 2:
      return commit(withZone(state, 'securityQueue', { densityPct: 52, queueLength: 16, waitTimeMin: 8 }), {
        messageKey: 'security.step2',
        toastKey: 'toast.densityIncreasing',
        tone: 'info',
      })
    case 3:
      return commit(withZone(state, 'securityQueue', { densityPct: 61, queueLength: 22, waitTimeMin: 11 }), {
        messageKey: 'security.step3',
        tone: 'info',
      })
    case 4: {
      let next = withZone(state, 'securityQueue', { level: 'ELEVATED', densityPct: 68, queueLength: 27, waitTimeMin: 14 })
      next = withSensorZone(next, 'securityEntrance', 58, 'ELEVATED')
      return commit(next, { messageKey: 'security.step4', tone: 'warning' })
    }
    case 5:
      return commit(withZone(state, 'securityQueue', { densityPct: 79, queueLength: 34, waitTimeMin: 18 }), {
        messageKey: 'security.step5',
        tone: 'warning',
      })
    case 6: {
      let next = withZone(state, 'securityQueue', { level: 'HIGH', densityPct: 91, queueLength: 41, waitTimeMin: 23 })
      next = withSensorZone(next, 'securityQueue', 91, 'HIGH')
      return commit(next, { messageKey: 'security.step6', tone: 'critical' })
    }
    case 7:
      return commit(state, { messageKey: 'security.step7', toastKey: 'toast.thresholdReached', tone: 'critical' })
    case 8:
      return commit(withSensorZone(state, 'securityEntrance', 62, 'ELEVATED'), {
        messageKey: 'security.step8',
        tone: 'info',
      })
    case 9:
      return commit(state, { messageKey: 'security.step9', tone: 'info' })
    case 10:
      return commit(withZone(state, 'securityAlt', { densityPct: 18, queueLength: 3 }), {
        messageKey: 'security.step10',
        tone: 'info',
      })
    case 11: {
      const next: SimState = {
        ...withZone(state, 'securityAlt', { level: 'NORMAL' }),
        routes: {
          ...state.routes,
          securityAlt: { ...state.routes.securityAlt, available: true },
        },
      }
      return commit(next, { messageKey: 'security.step11', toastKey: 'toast.altAvailable', tone: 'success' })
    }
    case 12: {
      const next: SimState = { ...state, guidanceActive: true, guidanceZone: 'securityAlt' }
      return commit(next, { messageKey: 'security.step12', toastKey: 'toast.guidanceActivated', tone: 'success' })
    }
    case 13:
      return commit(state, { messageKey: 'security.step13', tone: 'success' })
    case 14: {
      const next: SimState = {
        ...state,
        routes: {
          ...state.routes,
          securityMain: { ...state.routes.securityMain, utilizationPct: 64 },
          securityAlt: { ...state.routes.securityAlt, utilizationPct: 36, active: true },
        },
      }
      return commit(next, { messageKey: 'security.step14', toastKey: 'toast.redistributionProgress', tone: 'info' })
    }
    case 15:
      return commit(withZone(state, 'securityQueue', { densityPct: 74, queueLength: 30, waitTimeMin: 17 }), {
        messageKey: 'security.step15',
        tone: 'info',
      })
    case 16:
      return commit(withZone(state, 'securityQueue', { densityPct: 63, queueLength: 21, waitTimeMin: 12 }), {
        messageKey: 'security.step16',
        tone: 'info',
      })
    case 17: {
      let next = withZone(state, 'securityQueue', { level: 'ELEVATED', densityPct: 55, queueLength: 16, waitTimeMin: 8 })
      next = withSensorZone(next, 'securityQueue', 55, 'ELEVATED')
      next = withSensorZone(next, 'securityEntrance', 46, 'NORMAL')
      return commit(next, { messageKey: 'security.step17', toastKey: 'toast.stabilizing', tone: 'info' })
    }
    case 18:
    default: {
      let next = withZone(state, 'securityQueue', { level: 'NORMAL', densityPct: 44, queueLength: 12, waitTimeMin: 6 })
      next = withSensorZone(next, 'securityQueue', 44, 'NORMAL')
      next = {
        ...next,
        guidanceActive: false,
        guidanceZone: null,
        routes: {
          ...next.routes,
          securityMain: { ...next.routes.securityMain, utilizationPct: 94, active: true },
          securityAlt: { ...next.routes.securityAlt, utilizationPct: 6, active: false, available: false },
        },
      }
      return commit(next, { messageKey: 'security.step18', toastKey: 'toast.normalRestored', tone: 'success' })
    }
  }
}

/* ---------------------------------------------------------------------- */
/* ARRIVALS / EXIT REDISTRIBUTION SCENARIO — 9 steps, branches on exterior  */
/* receiving capacity checked live at step 6 (Sections 15-18 of the brief) */
/* ---------------------------------------------------------------------- */

export const ARRIVALS_STEP_COUNT = 9

export function applyArrivalsStep(state: SimState, step: number): StepOutcome {
  const suspended = state.arrivalsBranch === 'SUSPENDED'

  switch (step) {
    case 1:
      return commit(
        {
          ...withZone({ ...state, guidanceActive: false, guidanceZone: null, arrivalsBranch: 'PENDING' }, 'mainExit', {
            level: 'NORMAL',
            densityPct: 42,
            queueLength: 5,
            waitTimeMin: 3,
          }),
          routes: {
            ...state.routes,
            arrivalsMain: { ...state.routes.arrivalsMain, utilizationPct: 90, active: true },
            arrivalsAlt: { ...state.routes.arrivalsAlt, utilizationPct: 10, active: false, available: false },
          },
        },
        { messageKey: 'arrivals.step1', tone: 'info' },
      )
    case 2:
      return commit(withZone(state, 'mainExit', { level: 'ELEVATED', densityPct: 61, queueLength: 14, waitTimeMin: 7 }), {
        messageKey: 'arrivals.step2',
        toastKey: 'toast.densityIncreasing',
        tone: 'warning',
      })
    case 3:
      return commit(withZone(state, 'mainExit', { level: 'HIGH', densityPct: 88, queueLength: 26, waitTimeMin: 15 }), {
        messageKey: 'arrivals.step3',
        toastKey: 'toast.thresholdReached',
        tone: 'critical',
      })
    case 4:
      return commit(withZone(state, 'altExit', { densityPct: 14, queueLength: 1 }), {
        messageKey: 'arrivals.step4',
        tone: 'info',
      })
    case 5: {
      const exteriorHigh = state.exterior.status === 'HIGH'
      const branch: SimState['arrivalsBranch'] = exteriorHigh ? 'SUSPENDED' : 'VERIFIED'
      return commit(
        { ...state, arrivalsBranch: branch },
        { messageKey: 'arrivals.step5', tone: 'info' },
      )
    }
    case 6: {
      if (suspended) {
        return commit(
          {
            ...state,
            routes: { ...state.routes, arrivalsAlt: { ...state.routes.arrivalsAlt, available: false } },
          },
          { messageKey: 'arrivals.step6suspended', toastKey: 'toast.suspended', tone: 'critical' },
        )
      }
      return commit(
        { ...state, routes: { ...state.routes, arrivalsAlt: { ...state.routes.arrivalsAlt, available: true } } },
        { messageKey: 'arrivals.step6verified', toastKey: 'toast.exteriorVerified', tone: 'success' },
      )
    }
    case 7: {
      if (suspended) {
        return commit(withZone(state, 'mainExit', { level: 'ELEVATED', densityPct: 70, queueLength: 20, waitTimeMin: 12 }), {
          messageKey: 'arrivals.step7suspended',
          tone: 'warning',
        })
      }
      const next: SimState = {
        ...state,
        guidanceActive: true,
        guidanceZone: 'altExit',
        routes: {
          ...state.routes,
          arrivalsMain: { ...state.routes.arrivalsMain, utilizationPct: 60 },
          arrivalsAlt: { ...state.routes.arrivalsAlt, utilizationPct: 40, active: true },
        },
      }
      return commit(next, { messageKey: 'arrivals.step7verified', toastKey: 'toast.guidanceActivated', tone: 'success' })
    }
    case 8: {
      if (suspended) {
        return commit(withZone(state, 'mainExit', { level: 'NORMAL', densityPct: 48, queueLength: 8, waitTimeMin: 5 }), {
          messageKey: 'arrivals.step8suspended',
          toastKey: 'toast.normalRestored',
          tone: 'success',
        })
      }
      return commit(withZone(state, 'mainExit', { level: 'ELEVATED', densityPct: 58, queueLength: 12, waitTimeMin: 6 }), {
        messageKey: 'arrivals.step8verified',
        toastKey: 'toast.redistributionProgress',
        tone: 'info',
      })
    }
    case 9:
    default: {
      if (suspended) {
        return commit(state, { messageKey: 'arrivals.step9suspended', tone: 'info' })
      }
      const next = withZone(
        { ...state, guidanceActive: false, guidanceZone: null },
        'mainExit',
        { level: 'NORMAL', densityPct: 44, queueLength: 6, waitTimeMin: 3 },
      )
      return commit(next, { messageKey: 'arrivals.step9verified', toastKey: 'toast.normalRestored', tone: 'success' })
    }
  }
}
