import { useCallback, useEffect, useRef, useState } from 'react'
import { timeline } from '../data/timeline'
import { TimelineCard } from './TimelineCard'
import type { EntryState } from './TimelineItem'

function stateFor(index: number, activeIndex: number): EntryState {
  if (index === activeIndex) return 'active'
  if (Math.abs(index - activeIndex) === 1) return 'adjacent'
  return 'far'
}

/**
 * Native sideways scroller for narrow screens. Desktop keeps the
 * scroll-driven sticky track; phones just swipe the posts.
 */
export function TimelineSwipe() {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActive = useCallback(() => {
    const viewport = viewportRef.current
    const root = rootRef.current
    if (!viewport) return

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('.tlh-card'))
    if (cards.length === 0) return

    const anchor = viewport.scrollLeft + viewport.clientWidth * 0.35
    let nearest = 0
    let shortest = Infinity

    for (let i = 0; i < cards.length; i += 1) {
      const center = cards[i].offsetLeft + cards[i].offsetWidth / 2
      const gap = Math.abs(center - anchor)
      if (gap < shortest) {
        shortest = gap
        nearest = i
      }
    }

    const max = Math.max(1, viewport.scrollWidth - viewport.clientWidth)
    root?.style.setProperty('--tlh-progress', String(viewport.scrollLeft / max))
    setActiveIndex((current) => (current === nearest ? current : nearest))
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const onScroll = () => syncActive()
    syncActive()
    viewport.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      viewport.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [syncActive])

  const activeEntry = timeline[activeIndex] ?? timeline[0]

  return (
    <div className="tls" ref={rootRef}>
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
        aria-label="Journey timeline. Swipe left or right to move between entries."
      >
        <ol className="tls__track">
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
