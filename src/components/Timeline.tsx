import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { TimelineHorizontal } from './TimelineHorizontal'
import { TimelineSwipe } from './TimelineSwipe'
import { TimelineVertical } from './TimelineVertical'

/** Must match the breakpoint used by `timeline.css`. */
const WIDE_QUERY = '(min-width: 861px)'

export function Timeline() {
  const isWide = useMediaQuery(WIDE_QUERY)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="journey" className="section journey">
      <div className="shell">
        <Reveal as="header" className="section__head">
          <p className="section__index">02 — Timeline</p>
          <h2 className="section__title">The Journey So Far</h2>
          <p className="section__lead">
            Education, work, businesses, leadership, and athletics — from a TEDx stage in 2019 to
            NYU.
          </p>
        </Reveal>
      </div>

      {isWide && !prefersReducedMotion ? (
        <TimelineHorizontal />
      ) : isWide ? (
        <TimelineVertical />
      ) : (
        <TimelineSwipe />
      )}
    </section>
  )
}
