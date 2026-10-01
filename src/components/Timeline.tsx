import { useReducedMotion } from '../hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { TimelineHorizontal } from './TimelineHorizontal'
import { TimelineVertical } from './TimelineVertical'

export function Timeline() {
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

      {prefersReducedMotion ? <TimelineVertical /> : <TimelineHorizontal />}
    </section>
  )
}
