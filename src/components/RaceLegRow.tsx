import type { RaceLeg } from '../data/focus'
import { bikePace, formatDuration, round, runPace, swimPace, type LegPace } from '../lib/race'
import { BikeIcon, RunIcon, SwimIcon } from './Icons'

const legIcons = {
  swim: SwimIcon,
  bike: BikeIcon,
  run: RunIcon,
} as const

function paceFor(leg: RaceLeg): LegPace {
  switch (leg.id) {
    case 'swim':
      return swimPace(leg.distanceKm, leg.goalSeconds)
    case 'bike':
      return bikePace(leg.distanceKm, leg.distanceMi, leg.goalSeconds)
    case 'run':
      return runPace(leg.distanceKm, leg.distanceMi, leg.goalSeconds)
  }
}

interface RaceLegRowProps {
  leg: RaceLeg
}

export function RaceLegRow({ leg }: RaceLegRowProps) {
  const Icon = legIcons[leg.id]
  const pace = paceFor(leg)

  return (
    <li className="leg">
      <div className="leg__head">
        <span className="leg__icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        <h5 className="leg__name">{leg.name}</h5>
      </div>
      <p className="leg__distance">
        {leg.distanceMi} mi · {round(leg.distanceKm, 2)} km
      </p>
      <dl className="leg__stats">
        <div>
          <dt>Goal time</dt>
          <dd className="leg__stat--strong">{formatDuration(leg.goalSeconds)}</dd>
        </div>
        <div>
          <dt>{pace.primaryLabel}</dt>
          <dd>{pace.primary}</dd>
        </div>
        <div>
          <dt>Equivalent</dt>
          <dd>{pace.secondary}</dd>
        </div>
      </dl>
    </li>
  )
}
