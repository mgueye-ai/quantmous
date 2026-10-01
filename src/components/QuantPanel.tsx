import { quantFocus } from '../data/focus'
import { links } from '../data/site'
import { ExternalLink } from './ExternalLink'
import { LinkedInIcon } from './Icons'
import { Reveal } from './Reveal'

export function QuantPanel() {
  return (
    <Reveal as="article" className="panel panel--quant">
      <div className="panel__intro">
        <p className="eyebrow">{quantFocus.eyebrow}</p>
        <h3 className="panel__title">{quantFocus.title}</h3>
        <p className="panel__study">{quantFocus.study}</p>
        <p className="prose panel__text">{quantFocus.description}</p>
        <p className="panel__note">{quantFocus.clarification}</p>

        <ExternalLink
          href={links.linkedin}
          className="btn btn--secondary panel__cta"
          label="View Moustapha Gueye's professional profile on LinkedIn"
        >
          <LinkedInIcon size={16} />
          Professional Profile on LinkedIn
        </ExternalLink>
      </div>

      <div className="panel__content">
        <div className="panel__block">
          <h4 className="panel__label">Areas of focus</h4>
          <ul className="tag-list">
            {quantFocus.areas.map((area) => (
              <li key={area} className="tag tag--navy">
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel__block">
          <h4 className="panel__label">Right now</h4>
          <ul className="now">
            {quantFocus.now.map((item) => (
              <li key={item.title} className="now__item">
                <div className="now__head">
                  <h5 className="now__title">{item.title}</h5>
                  <span className="now__status">{item.status}</span>
                </div>
                <p className="now__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}
