import type { DecisionSnapshot, ExteriorState, Level, ZoneId, ZoneState } from '../types'

function levelOk(level: Level): boolean {
  return level !== 'HIGH'
}

/**
 * Simplified illustrative decision logic (CONCEPTUAL — not a real control-system
 * specification). Mirrors the plain-language rule from the brief:
 *   IF primary = HIGH AND alt available AND alt capacity OK AND downstream OK
 *   THEN recommend alternative + activate guidance ELSE maintain + alert ops.
 */
export function computeDecision(
  zones: Record<ZoneId, ZoneState>,
  exterior: ExteriorState,
  primaryZoneId: ZoneId,
  altZoneId: ZoneId,
  downstreamZoneId: ZoneId,
  altAvailable: boolean,
): DecisionSnapshot {
  const primary = zones[primaryZoneId]
  const alt = zones[altZoneId]
  const downstream = zones[downstreamZoneId]

  const primaryLevel = primary.level
  const alternativeCapacityOk = levelOk(alt.level)
  const downstreamCapacityOk = levelOk(downstream.level)
  const exteriorCapacityOk = exterior.status !== 'HIGH'

  const canRecommend =
    primaryLevel === 'HIGH' &&
    altAvailable &&
    alternativeCapacityOk &&
    downstreamCapacityOk &&
    exteriorCapacityOk

  return {
    primaryLevel,
    alternativeAvailable: altAvailable,
    alternativeCapacityOk,
    downstreamCapacityOk,
    exteriorCapacityOk,
    recommendation: canRecommend ? 'RECOMMEND_ALTERNATIVE' : 'MAINTAIN_CURRENT',
    reasonKey: canRecommend
      ? 'decision.recommendAlt'
      : !exteriorCapacityOk
        ? 'arrivals.suspendedReason'
        : 'decision.maintainCurrent',
  }
}
