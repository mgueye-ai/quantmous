import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { timeline } from '../data/timeline'
import { TimelineCard } from './TimelineCard'
import type { EntryState } from './TimelineItem'

function stateFor(index: number, activeIndex: number): EntryState {
  if (index === activeIndex) return 'active'
  if (Math.abs(index - activeIndex) === 1) return 'adjacent'
  return 'far'
}

/**
 * Phone-only journey carousel: the list itself is a native finger-scroll
 * row. Desktop still uses TimelineHorizontal.
 */
export function TimelineSwipe() {
  const railRef = useRef<HTMLOListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const sync = () => {
      const cards = Array.from(rail.children) as HTMLElement[]
      if (cards.length === 0) return
      const mid = rail.scrollLeft + rail.clientWidth / 2
      let nearest = 0
      let shortest = Infinity
      for (let i = 0; i < cards.length; i += 1) {
        const center = cards[i].offsetLeft + cards[i].offsetWidth / 2
        const gap = Math.abs(center - mid)
        if (gap < shortest) {
          shortest = gap
          nearest = i
        }
      }
      setActiveIndex((current) => (current === nearest ? current : nearest))
    }

    sync()
    rail.addEventListener('scroll', sync, { passive: true })
    return () => rail.removeEventListener('scroll', sync)
  }, [])

  const progress = timeline.length > 1 ? activeIndex / (timeline.length - 1) : 0
  const activeEntry = timeline[activeIndex] ?? timeline[0]

  return (
    <div className="m-carousel" style={{ '--tlh-progress': String(progress) } as CSSProperties}>
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

      <ol
        className="m-rail"
        ref={railRef}
        tabIndex={0}
        aria-label="Journey timeline. Swipe left or right."
      >
        {timeline.map((entry, index) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
            index={index}
            state="active"
          />
        ))}
      </ol>
    </div>
  )
}
