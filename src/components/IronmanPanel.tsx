import { ironmanFocus, race, raceLegs } from '../data/focus'
import { IronmanRace } from './IronmanRace'
import { RaceLegRow } from './RaceLegRow'
import { Reveal } from './Reveal'

export function IronmanPanel() {
  return (
    <Reveal as="article" className="panel panel--ironman">
      <div className="panel__intro">
        <p className="eyebrow">{ironmanFocus.eyebrow}</p>

        <img src={race.logoSrc} alt={race.logoAlt} className="ironman__logo" />
        <p className="ironman__meta">
          {race.location} · {race.window}
        </p>

        <p className="prose panel__text">{ironmanFocus.description}</p>

        <IronmanRace />
      </div>

      <div className="panel__content">
        <div className="panel__block">
          <h4 className="panel__label">Goal splits</h4>
          <ul className="legs">
            {raceLegs.map((leg) => (
              <RaceLegRow key={leg.id} leg={leg} />
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}
