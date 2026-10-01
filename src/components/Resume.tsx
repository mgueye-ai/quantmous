import { links } from '../data/site'
import { FileTextIcon } from './Icons'
import { Reveal } from './Reveal'

export function Resume() {
  return (
    <section id="resume" className="stack stack--resume resume">
      <div className="stack__inner shell">
        <Reveal as="header" className="section__head">
          <p className="section__index">05 — Resume</p>
          <h2 className="section__title">Resume</h2>
        </Reveal>

        <Reveal className="resume__panel">
          <div className="resume__file">
            <span className="resume__icon" aria-hidden="true">
              <FileTextIcon size={20} />
            </span>
            <div>
              <p className="resume__name">Moustapha Gueye Resume</p>
              <p className="resume__meta">PDF</p>
            </div>
          </div>
          <a
            className="btn btn--primary"
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Moustapha Gueye's resume (opens in a new tab)"
          >
            View Resume
          </a>
        </Reveal>
      </div>
    </section>
  )
}
