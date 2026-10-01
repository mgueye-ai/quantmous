import { person } from '../data/site'
import { media } from '../lib/media'
import { ArrowDownIcon } from './Icons'
import { MediaFrame } from './MediaFrame'

export function Hero() {
  return (
    <section id="home" className="section hero stack stack--hero">
      <div className="shell hero__inner">
        <div className="hero__body">
          <p className="hero__meta">New York, NY · NYU &rsquo;29</p>
          <h1 className="hero__name">{person.name}</h1>
          <p className="hero__lead">{person.introLead}</p>
          <p className="hero__intro">{person.intro}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#journey">
              Explore My Journey
            </a>
            <a className="btn btn--ghost" href="#work">
              View My Work
            </a>
          </div>
          <div className="hero__portrait">
            <MediaFrame
              filename="moustapha-headshot"
              src={media.headshot}
              alt="Professional headshot of Moustapha Gueye"
              caption="Professional headshot"
              ratio="4 / 5"
              priority
              monogram="MG"
              className="media--portrait"
            />
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#focus" aria-label="Scroll to What I'm Building Toward">
        <span>Scroll</span>
        <span className="hero__scroll-icon" aria-hidden="true">
          <ArrowDownIcon size={14} />
        </span>
      </a>
    </section>
  )
}
