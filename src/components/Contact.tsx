import { links, person } from '../data/site'
import { ExternalLink } from './ExternalLink'
import { GitHubIcon, LinkedInIcon, MailIcon, StravaIcon } from './Icons'
import { Reveal } from './Reveal'

const channels = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: links.linkedin,
    icon: LinkedInIcon,
    aria: 'Moustapha Gueye on LinkedIn',
  },
  {
    id: 'strava',
    label: 'Strava',
    href: links.strava,
    icon: StravaIcon,
    aria: "Moustapha Gueye's training on Strava",
  },
  {
    id: 'mous-apps',
    label: 'Mous Apps',
    href: links.mousApps,
    icon: null,
    aria: 'Mous Apps website',
  },
  {
    id: 'hill-web-works',
    label: 'Hill Web Works',
    href: links.hillWebWorks,
    icon: null,
    aria: 'Hill Web Works website',
  },
]

export function Contact() {
  return (
    <section id="contact" className="stack stack--contact contact">
      <div className="stack__inner shell">
        <Reveal as="header" className="section__head">
          <p className="section__index">06 — Contact</p>
          <h2 className="section__title">Let&rsquo;s Connect</h2>
        </Reveal>

        <Reveal className="contact__email-row">
          <a className="contact__email" href={`mailto:${person.email}`}>
            <MailIcon size={20} />
            {person.email}
          </a>
        </Reveal>

        <Reveal as="ul" className="contact__channels" delay={80}>
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <li key={channel.id}>
                <ExternalLink href={channel.href} className="channel" label={channel.aria}>
                  {Icon ? (
                    <span className="channel__icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                  ) : null}
                  <span className="channel__label">{channel.label}</span>
                </ExternalLink>
              </li>
            )
          })}

          <li>
            <div className="channel channel--empty">
              <span className="channel__icon" aria-hidden="true">
                <GitHubIcon size={18} />
              </span>
              <span className="channel__label">GitHub</span>
            </div>
          </li>
        </Reveal>
      </div>
    </section>
  )
}
