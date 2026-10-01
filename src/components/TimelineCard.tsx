import type { TimelineEntry } from '../data/timeline'
import { ExternalLink } from './ExternalLink'
import { MediaFrame } from './MediaFrame'
import type { EntryState } from './TimelineItem'

interface TimelineCardProps {
  entry: TimelineEntry
  index: number
  state: EntryState
}

/** One stop on the horizontal timeline. */
export function TimelineCard({ entry, index, state }: TimelineCardProps) {
  const summary = [entry.role ?? entry.achievement, entry.location].filter(Boolean).join(' · ')

  return (
    <li className="tlh-card" data-index={index} data-state={state}>
      <div className="tlh-card__inner">
        <p className="tlh-card__date">{entry.date}</p>

        <ul className="tlh-card__cats">
          {entry.categories.map((category) => (
            <li key={category} className="tlh-card__cat">
              {category}
            </li>
          ))}
        </ul>

        <h3 className="tlh-card__title">{entry.title}</h3>
        {summary ? <p className="tlh-card__summary">{summary}</p> : null}

        {entry.media ? (
          <MediaFrame
            kind={entry.media.kind}
            filename={entry.media.filename}
            alt={entry.media.alt}
            caption={entry.media.caption}
            src={entry.media.src}
            focalPoint={entry.media.focalPoint}
            fit={entry.media.fit}
            tone={entry.media.tone}
            ratio={entry.media.ratio ?? '16 / 9'}
            className="tlh-card__media"
          />
        ) : null}

        <p className="tlh-card__description">{entry.description}</p>

        {entry.meta && entry.meta.length > 0 ? (
          <dl className="tlh-card__facts">
            {entry.meta.map((meta) => (
              <div key={meta.label}>
                <dt>{meta.label}</dt>
                <dd>{meta.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {entry.details && entry.details.length > 0 ? (
          <ul className="tlh-card__details">
            {entry.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        ) : null}

        {entry.links && entry.links.length > 0 ? (
          <div className="btn-row">
            {entry.links.map((link) => (
              <ExternalLink
                key={link.href}
                href={link.href}
                className="btn btn--primary btn--sm"
                label={`${link.label} — ${entry.title}`}
              >
                {link.label}
              </ExternalLink>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  )
}
