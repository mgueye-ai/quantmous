import { useCallback, useEffect, useRef, useState } from 'react'
import { timeline } from '../data/timeline'
import { ArrowDownIcon } from './Icons'
import { TimelineCard } from './TimelineCard'
import type { EntryState } from './TimelineItem'

function stateFor(index: number, activeIndex: number): EntryState {
  if (index === activeIndex) return 'active'
  if (Math.abs(index - activeIndex) === 1) return 'adjacent'
  return 'far'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Horizontal timeline driven by vertical scroll.
 *
 * A tall spacer holds the scroll distance, a sticky viewport pins the track in
 * place, and the track is translated sideways in proportion to how far the
 * visitor has scrolled through the spacer. The page itself scrolls normally —
 * no wheel events are intercepted and no scrolling is slowed down.
 */
export function TimelineHorizontal() {
  const spacerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  /** Cached layout values, refreshed only when something actually resizes. */
  const metrics = useRef({ distance: 0, run: 1, centers: [] as number[] })

  const measure = useCallback(() => {
    const spacer = spacerRef.current
    const sticky = stickyRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!spacer || !sticky || !viewport || !track) return

    const distance = Math.max(0, track.scrollWidth - viewport.clientWidth)
    // Extra scroll past the end so the last entry holds for a beat instead of
    // sliding away the instant the track finishes.
    const hold = Math.round(window.innerHeight * 0.18)

    // The spacer grows by exactly the sideways distance, so one pixel of
    // vertical scroll moves the track one pixel sideways.
    spacer.style.setProperty('--tlh-distance', `${distance}px`)
    spacer.style.setProperty('--tlh-hold', `${hold}px`)

    const centers = Array.from(track.children).map((child) => {
      const el = child as HTMLElement
      return el.offsetLeft + el.offsetWidth / 2
    })

    metrics.current = {
      distance,
      run: Math.max(1, spacer.offsetHeight - sticky.offsetHeight - hold),
      centers,
    }
  }, [])

  useEffect(() => {
    const spacer = spacerRef.current
    const sticky = stickyRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!spacer || !sticky || !viewport || !track) return

    let frame = 0

    const update = () => {
      frame = 0
      const { distance, run, centers } = metrics.current
      const progress = clamp(-spacer.getBoundingClientRect().top / run, 0, 1)
      const x = progress * distance

      track.style.transform = `translate3d(${-x}px, 0, 0)`
      sticky.style.setProperty('--tlh-progress', String(progress))

      // The anchor sweeps from the left edge to the right edge as the track
      // advances, so the first and last cards can both take their turn as
      // active while the middle ones are picked at the centre of the screen.
      const target = x + viewport.clientWidth * progress
      let nearest = 0
      let shortest = Infinity
      for (let i = 0; i < centers.length; i += 1) {
        const gap = Math.abs(centers[i] - target)
        if (gap < shortest) {
          shortest = gap
          nearest = i
        }
      }
      setActiveIndex((current) => (current === nearest ? current : nearest))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const remeasure = () => {
      measure()
      onScroll()
    }

    remeasure()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', remeasure)

    const observer = new ResizeObserver(remeasure)
    observer.observe(track)
    observer.observe(viewport)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', remeasure)
      observer.disconnect()
    }
  }, [measure])

  /**
   * Tabbing into an off-screen card would otherwise move focus somewhere the
   * visitor cannot see, so bring the page to the position that centres it.
   */
  const onFocusCapture = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.tlh-card')
    const spacer = spacerRef.current
    const viewport = viewportRef.current
    if (!card || !spacer || !viewport) return

    const index = Number(card.dataset.index)
    const { distance, run, centers } = metrics.current
    if (Number.isNaN(index) || centers.length === 0) return

    const desired = clamp(centers[index] - viewport.clientWidth / 2, 0, distance)
    const progress = distance === 0 ? 0 : desired / distance

    const spacerTop = window.scrollY + spacer.getBoundingClientRect().top
    const target = Math.round(spacerTop + progress * run)

    if (Math.abs(window.scrollY - target) > 4) {
      window.scrollTo({ top: target, behavior: 'auto' })
    }
  }, [])

  const activeEntry = timeline[activeIndex] ?? timeline[0]

  return (
    <div className="tlh" ref={spacerRef}>
      <div className="tlh__sticky" ref={stickyRef}>
        <div className="shell tlh__bar">
          <p className="tlh__counter">
            <span className="tlh__counter-now">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span aria-hidden="true">/</span>
            <span>{String(timeline.length).padStart(2, '0')}</span>
          </p>
          <p className="tlh__current">{activeEntry.date}</p>
          <p className="tlh__hint">
            <span>Scroll. Time moves sideways.</span>
            <ArrowDownIcon size={13} />
          </p>
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

        <div className="tlh__viewport" ref={viewportRef} onFocusCapture={onFocusCapture}>
          <ol className="tlh__track" ref={trackRef}>
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
    </div>
  )
}
