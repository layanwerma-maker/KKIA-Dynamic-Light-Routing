import type { SimState } from '../types'
import { ZONE_ORDER } from '../data/initialState'

export function computeOverviewKpis(state: SimState) {
  const zoneList = ZONE_ORDER.map((id) => state.zones[id])
  const congestedZones = zoneList.filter((z) => z.level !== 'NORMAL').length
  const avgDensity = Math.round(zoneList.reduce((sum, z) => sum + z.densityPct, 0) / zoneList.length)
  const queuedZones = zoneList.filter((z) => z.queueLength > 0)
  const avgWait = queuedZones.length
    ? Math.round(queuedZones.reduce((sum, z) => sum + z.waitTimeMin, 0) / queuedZones.length)
    : 0
  const activeRoutes = [state.routes.securityAlt, state.routes.arrivalsAlt].filter((r) => r.active).length
  const activeAltUtilization = state.routes.securityAlt.active
    ? state.routes.securityAlt.utilizationPct
    : state.routes.arrivalsAlt.active
      ? state.routes.arrivalsAlt.utilizationPct
      : 0
  const redistributionPct = state.guidanceActive ? activeAltUtilization : 0
  const passengerFlow = Math.round(3200 + avgDensity * 14)

  return {
    passengerFlow,
    activeZones: zoneList.length,
    congestedZones,
    activeRoutes,
    avgDensity,
    redistributionPct,
    avgWait,
    exteriorCapacity: state.exterior.availableCapacityPct,
  }
}
