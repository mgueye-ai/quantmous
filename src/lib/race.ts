/**
 * Pace and speed maths for the Ironman goal splits.
 *
 * Everything shown on the page is derived from two inputs per leg — the
 * official IRONMAN distance and Moustapha's goal time — so the numbers stay
 * consistent if a goal time is ever edited.
 */

export const METERS_PER_MILE = 1609.344
export const YARDS_PER_METER = 1.0936133

/** `H:MM:SS`, or `M:SS` when under an hour. */
export function formatDuration(seconds: number): string {
  const total = Math.round(seconds)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const secs = total % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(secs).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`
}

/** `M:SS` pace, always zero-padded on seconds. */
export function formatPace(secondsPerUnit: number): string {
  const total = Math.round(secondsPerUnit)
  const minutes = Math.floor(total / 60)
  const secs = total % 60
  return `${minutes}:${String(secs).padStart(2, '0')}`
}

export function round(value: number, places = 1): string {
  return value.toFixed(places)
}

export interface LegPace {
  /** `Goal pace` for swim and run, `Goal speed` for the bike. */
  primaryLabel: string
  /** Headline figure, e.g. `1:18 / 100 m`. */
  primary: string
  /** The same effort expressed in the other common unit. */
  secondary: string
}

/** Swim paces are quoted per 100 m and per 100 yd, like every pool clock. */
export function swimPace(distanceKm: number, goalSeconds: number): LegPace {
  const meters = distanceKm * 1000
  const per100m = goalSeconds / (meters / 100)
  const per100yd = goalSeconds / ((meters * YARDS_PER_METER) / 100)
  return {
    primaryLabel: 'Goal pace',
    primary: `${formatPace(per100m)} / 100 m`,
    secondary: `${formatPace(per100yd)} / 100 yd`,
  }
}

/** Cycling is quoted as speed first — that is how a bike computer reads. */
export function bikePace(distanceKm: number, distanceMi: number, goalSeconds: number): LegPace {
  const hours = goalSeconds / 3600
  return {
    primaryLabel: 'Goal speed',
    primary: `${round(distanceMi / hours)} mph`,
    secondary: `${round(distanceKm / hours)} km/h · ${formatPace(goalSeconds / distanceMi)} / mi`,
  }
}

/** Running is quoted per mile first, then per kilometre. */
export function runPace(distanceKm: number, distanceMi: number, goalSeconds: number): LegPace {
  return {
    primaryLabel: 'Goal pace',
    primary: `${formatPace(goalSeconds / distanceMi)} / mi`,
    secondary: `${formatPace(goalSeconds / distanceKm)} / km · ${round(
      distanceKm / (goalSeconds / 3600),
    )} km/h`,
  }
}
