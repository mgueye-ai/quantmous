import type { TimelineEntry } from '../data/timeline'
import { TimelineDetail } from './TimelineDetail'

export type EntryState = 'active' | 'adjacent' | 'far'

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
  state: EntryState
  /** True once the active marker has moved past this entry. */
  passed: boolean
  /** Desktop renders a compact rail entry; smaller screens stack details inline. */
  compact: boolean
  onActivate: (index: number) => void
  registerRef: (node: HTMLLIElement | null, index: number) => void
}

function summaryOf(entry: TimelineEntry): string {
  return [entry.role ?? entry.achievement, entry.location].filter(Boolean).join(' · ')
}

export function TimelineItem({
  entry,
  index,
  state,
  passed,
  compact,
  onActivate,
  registerRef,
}: TimelineItemProps) {
  const summary = summaryOf(entry)

  const header = (
    <>
      <h3 className="tl__title">{entry.title}</h3>
      {summary ? <p className="tl__summary">{summary}</p> : null}
    </>
  )

  return (
    <li
      ref={(node) => registerRef(node, index)}
      data-index={index}
      data-state={state}
      data-passed={passed ? 'true' : undefined}
      className="tl__item"
    >
      <span className="tl__rail" aria-hidden="true">
        <span className="tl__marker" />
      </span>

      <div className="tl__aside">
        <p className="tl__date">{entry.date}</p>
        <ul className="tl__cats">
          {entry.categories.map((category) => (
            <li key={category} className="tl__cat">
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="tl__main">
        {compact ? (
          <button
            type="button"
            className="tl__entry"
            aria-controls="timeline-detail"
            aria-current={state === 'active' ? 'true' : undefined}
            onClick={() => onActivate(index)}
            onFocus={() => onActivate(index)}
          >
            {header}
            <span className="visually-hidden">Show details</span>
          </button>
        ) : (
          <>
            {header}
            <TimelineDetail entry={entry} variant="inline" />
          </>
        )}
      </div>
    </li>
  )
}
