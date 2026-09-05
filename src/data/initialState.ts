import type { ExteriorState, SensorReading, ZoneId, ZoneState } from '../types'

export const ZONE_ORDER: ZoneId[] = [
  'checkin',
  'securityEntrance',
  'securityQueue',
  'securityAlt',
  'departureHall',
  'boardingGates',
  'transferArea',
  'arrivalsCorridor',
  'baggageClaim',
  'mainExit',
  'altExit',
  'exteriorReceiving',
  'pickupZone',
]

export function createInitialZones(): Record<ZoneId, ZoneState> {
  const base: Record<ZoneId, Omit<ZoneState, 'id' | 'labelKey'>> = {
    checkin: { level: 'NORMAL', densityPct: 38, queueLength: 6, waitTimeMin: 4 },
    securityEntrance: { level: 'NORMAL', densityPct: 41, queueLength: 8, waitTimeMin: 3 },
    securityQueue: { level: 'NORMAL', densityPct: 44, queueLength: 12, waitTimeMin: 6 },
    securityAlt: { level: 'NORMAL', densityPct: 12, queueLength: 2, waitTimeMin: 2 },
    departureHall: { level: 'NORMAL', densityPct: 35, queueLength: 0, waitTimeMin: 0 },
    boardingGates: { level: 'NORMAL', densityPct: 40, queueLength: 4, waitTimeMin: 5 },
    transferArea: { level: 'NORMAL', densityPct: 30, queueLength: 3, waitTimeMin: 4 },
    arrivalsCorridor: { level: 'NORMAL', densityPct: 33, queueLength: 0, waitTimeMin: 0 },
    baggageClaim: { level: 'NORMAL', densityPct: 46, queueLength: 0, waitTimeMin: 8 },
    mainExit: { level: 'NORMAL', densityPct: 42, queueLength: 5, waitTimeMin: 3 },
    altExit: { level: 'NORMAL', densityPct: 10, queueLength: 0, waitTimeMin: 1 },
    exteriorReceiving: { level: 'NORMAL', densityPct: 61, queueLength: 0, waitTimeMin: 0 },
    pickupZone: { level: 'NORMAL', densityPct: 44, queueLength: 0, waitTimeMin: 0 },
  }
  const zones = {} as Record<ZoneId, ZoneState>
  for (const id of ZONE_ORDER) {
    zones[id] = { id, labelKey: `zones.${id}`, ...base[id] }
  }
  return zones
}

export function createInitialSensors(): SensorReading[] {
  return [
    { id: 'SEC-01', labelKey: 'sensors.sec01', zoneId: 'securityEntrance', densityPct: 41, level: 'NORMAL' },
    { id: 'SEC-02', labelKey: 'sensors.sec02', zoneId: 'securityQueue', densityPct: 44, level: 'NORMAL' },
    { id: 'CHK-01', labelKey: 'sensors.chk01', zoneId: 'checkin', densityPct: 38, level: 'NORMAL' },
    { id: 'TRF-01', labelKey: 'sensors.trf01', zoneId: 'transferArea', densityPct: 30, level: 'NORMAL' },
    { id: 'ARR-01', labelKey: 'sensors.arr01', zoneId: 'baggageClaim', densityPct: 46, level: 'NORMAL' },
    { id: 'EXT-01', labelKey: 'sensors.ext01', zoneId: 'exteriorReceiving', densityPct: 61, level: 'NORMAL' },
  ]
}

export function createInitialExterior(): ExteriorState {
  return {
    peopleOutside: 240,
    pickupCongestionPct: 38,
    receivingDensityPct: 61,
    pedestrianDensityPct: 45,
    availableCapacityPct: 68,
    status: 'NORMAL',
  }
}

export const SIM_START_MINUTES = 14 * 60 + 2 // 14:02
