import { links, navItems, person } from '../data/site'
import { ExternalLink } from './ExternalLink'
import { LinkedInIcon, MailIcon, StravaIcon } from './Icons'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__identity">
          <p className="footer__name">{person.name}</p>
          <p className="footer__line">
            Computer &amp; Data Science · Mathematics Minor · Aspiring Quantitative Developer ·
            Ironman in Training · It won&rsquo;t always be 70 and sunny
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <ExternalLink
            href={links.linkedin}
            className="icon-link"
            label="Moustapha Gueye on LinkedIn"
            withArrow={false}
          >
            <LinkedInIcon />
          </ExternalLink>
          <ExternalLink
            href={links.strava}
            className="icon-link"
            label="Moustapha Gueye on Strava"
            withArrow={false}
          >
            <StravaIcon />
          </ExternalLink>
          <a className="icon-link" href={`mailto:${person.email}`} aria-label="Email Moustapha Gueye">
            <MailIcon />
          </a>
        </div>
      </div>

      <div className="shell footer__base">
        <p>© {new Date().getFullYear()} Moustapha Gueye</p>
        <p>
          <ExternalLink href={links.mousApps} className="footer__link" label="Mous Apps website">
            Mous Apps
          </ExternalLink>
          <ExternalLink
            href={links.hillWebWorks}
            className="footer__link"
            label="Hill Web Works website"
          >
            Hill Web Works
          </ExternalLink>
        </p>
      </div>
    </footer>
  )
}
