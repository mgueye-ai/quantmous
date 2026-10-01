import { useCallback, useEffect, useRef, useState } from 'react'
import { timeline } from '../data/timeline'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { TimelineDetail } from './TimelineDetail'
import { TimelineItem, type EntryState } from './TimelineItem'

/** Must match the breakpoint used by `timeline.css`. */
const DESKTOP_QUERY = '(min-width: 961px)'

function stateFor(index: number, activeIndex: number): EntryState {
  if (index === activeIndex) return 'active'
  if (Math.abs(index - activeIndex) === 1) return 'adjacent'
  return 'far'
}

/**
 * Vertical timeline: a compact rail with a sticky detail panel on wide screens,
 * stacked entries on small ones. Used on narrow viewports and whenever the
 * visitor prefers reduced motion.
 */
export function TimelineVertical() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])

  const registerRef = useCallback((node: HTMLLIElement | null, index: number) => {
    itemsRef.current[index] = node
  }, [])

  /**
   * An entry becomes active when it crosses the middle of the viewport. The
   * zero-height root band means at most one entry qualifies at a time, and
   * normal scrolling is never intercepted.
   */
  useEffect(() => {
    const nodes = itemsRef.current.filter((node): node is HTMLLIElement => node !== null)
    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.index)
          if (!Number.isNaN(index)) setActiveIndex(index)
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [isDesktop])

  const activate = useCallback((index: number) => setActiveIndex(index), [])
  const activeEntry = timeline[activeIndex] ?? timeline[0]

  return (
    <div className="shell">
      <div className="tl">
        <ol className="tl__list">
          {timeline.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              state={stateFor(index, activeIndex)}
              passed={index < activeIndex}
              compact={isDesktop}
              onActivate={activate}
              registerRef={registerRef}
            />
          ))}
        </ol>

        {isDesktop ? (
          <aside className="tl__panel" aria-label="Timeline entry details">
            <div className="tl__panel-sticky">
              <p className="tl__counter">
                <span className="tl__counter-now">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="tl__counter-sep" aria-hidden="true">
                  /
                </span>
                <span className="tl__counter-total">
                  {String(timeline.length).padStart(2, '0')}
                </span>
              </p>
              <div id="timeline-detail" tabIndex={-1} key={activeEntry.id} className="tl__panel-body">
                <TimelineDetail entry={activeEntry} variant="sticky" />
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  )
}
