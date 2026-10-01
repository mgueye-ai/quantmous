import type { TimelineEntry } from '../data/timeline'
import { ExternalLink } from './ExternalLink'
import { MediaFrame } from './MediaFrame'

interface TimelineDetailProps {
  entry: TimelineEntry
  /** `sticky` is the desktop side panel, `inline` sits under the marker on small screens. */
  variant: 'sticky' | 'inline'
}

/** Description, media and supporting content for one timeline entry. */
export function TimelineDetail({ entry, variant }: TimelineDetailProps) {
  const facts: { label: string; value: string }[] = [
    ...(entry.role ? [{ label: 'Role', value: entry.role }] : []),
    ...(entry.achievement ? [{ label: 'Achievement', value: entry.achievement }] : []),
    ...(entry.meta ?? []).filter((meta) => meta.value !== entry.achievement),
    ...(entry.location ? [{ label: 'Location', value: entry.location }] : []),
  ]

  return (
    <div className={`tl-detail tl-detail--${variant}`}>
      {variant === 'sticky' ? (
        <header className="tl-detail__head">
          <p className="tl-detail__date">{entry.date}</p>
          <h3 className="tl-detail__title">{entry.title}</h3>
        </header>
      ) : null}

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
          ratio={entry.media.ratio}
          className="tl-detail__media"
        />
      ) : null}

      <p className="tl-detail__description prose">{entry.description}</p>

      {facts.length > 0 ? (
        <dl className="tl-detail__facts">
          {facts.map((fact) => (
            <div key={`${fact.label}-${fact.value}`}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {entry.details && entry.details.length > 0 ? (
        <ul className="tl-detail__details">
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
  )
}
