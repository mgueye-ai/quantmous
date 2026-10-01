import { race } from '../data/focus'
import { links } from '../data/site'
import { useCountdown } from '../hooks/useCountdown'
import { ExternalLink } from './ExternalLink'
import { StravaIcon } from './Icons'

export function IronmanRace() {
  const countdown = useCountdown(race.targetDate)

  const units = [
    { id: 'days', label: 'Days', value: countdown.days },
    { id: 'hours', label: 'Hrs', value: countdown.hours },
    { id: 'minutes', label: 'Min', value: countdown.minutes },
    { id: 'seconds', label: 'Sec', value: countdown.seconds },
  ]

  return (
    <div className="race">
      <div className="race__countdown">
        <p className="race__countdown-label">Countdown to race day</p>
        <ol className="race__units" aria-hidden="true">
          {units.map((unit) => (
            <li key={unit.id} className="race__unit">
              <span className="race__unit-value">
                {unit.id === 'days' ? unit.value : String(unit.value).padStart(2, '0')}
              </span>
              <span className="race__unit-label">{unit.label}</span>
            </li>
          ))}
        </ol>
        <p className="visually-hidden">
          {countdown.done
            ? `${race.series} ${race.event} race day has arrived.`
            : `${countdown.days} days until ${race.series} ${race.event}.`}
        </p>
      </div>

      <ExternalLink
        href={links.strava}
        className="btn btn--primary race__cta"
        label="Follow Moustapha Gueye's Ironman training on Strava"
      >
        <StravaIcon size={16} />
        Follow My Training on Strava
      </ExternalLink>
    </div>
  )
}
