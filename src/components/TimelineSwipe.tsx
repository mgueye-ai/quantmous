import type { CSSProperties, RefObject } from 'react'
import { useSwipeCarousel } from '../hooks/useSwipeCarousel'
import { timeline } from '../data/timeline'
import { TimelineCard } from './TimelineCard'
import type { EntryState } from './TimelineItem'

function stateFor(index: number, activeIndex: number): EntryState {
  if (index === activeIndex) return 'active'
  if (Math.abs(index - activeIndex) === 1) return 'adjacent'
  return 'far'
}

/**
 * Touch carousel for phones. Desktop keeps the scroll-driven sticky track.
 */
export function TimelineSwipe() {
  const { viewportRef, trackRef, index: activeIndex } = useSwipeCarousel(true)
  const progress = timeline.length > 1 ? activeIndex / (timeline.length - 1) : 0
  const activeEntry = timeline[activeIndex] ?? timeline[0]

  return (
    <div className="tls" style={{ '--tlh-progress': String(progress) } as CSSProperties}>
      <div className="shell tlh__bar">
        <p className="tlh__counter">
          <span className="tlh__counter-now">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span aria-hidden="true">/</span>
          <span>{String(timeline.length).padStart(2, '0')}</span>
        </p>
        <p className="tlh__current">{activeEntry.date}</p>
        <p className="tlh__hint">Swipe</p>
      </div>

      <div className="shell tlh__rail" aria-hidden="true">
        <span className="tlh__rail-line">
          <span className="tlh__rail-fill" />
        </span>
        <span className="tlh__ticks">
          {timeline.map((entry, index) => (
            <span
              key={entry.id}
              className="tlh__tick"
              data-state={stateFor(index, activeIndex)}
              data-passed={index < activeIndex ? 'true' : undefined}
            />
          ))}
        </span>
      </div>

      <div
        className="tls__viewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Journey timeline. Swipe left or right to move between entries."
      >
        <ol className="tls__track" ref={trackRef as RefObject<HTMLOListElement>}>
          {timeline.map((entry, index) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              index={index}
              state={stateFor(index, activeIndex)}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}
