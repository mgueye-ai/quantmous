import { featuredFocus, skillGroups, skillsIntro } from '../data/skills'
import { ExternalLink } from './ExternalLink'
import { StravaIcon } from './Icons'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <section id="skills" className="stack stack--skills skills">
      <div className="stack__inner shell">
        <Reveal as="header" className="section__head">
          <p className="section__index">04 — Skills &amp; Interests</p>
          <h2 className="section__title">{skillsIntro.title}</h2>
          <p className="section__lead">{skillsIntro.lead}</p>
        </Reveal>

        <div className="spotlight">
          {featuredFocus.map((card, index) => (
            <Reveal as="article" key={card.id} className="spotlight__card" delay={index * 60}>
              <p className="spotlight__index">{card.index}</p>
              <h3 className="spotlight__title">{card.title}</h3>
              <p className="spotlight__text">{card.text}</p>
              {card.href && card.linkLabel ? (
                <ExternalLink
                  href={card.href}
                  className="text-link spotlight__link"
                  label={card.linkAria ?? card.linkLabel}
                >
                  {card.id === 'ironman' ? <StravaIcon size={15} /> : null}
                  {card.linkLabel}
                </ExternalLink>
              ) : null}
            </Reveal>
          ))}
        </div>

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <Reveal
              as="section"
              key={group.id}
              className="skill-group"
              delay={Math.min(index * 40, 200)}
            >
              <h3 className="skill-group__title">{group.title}</h3>
              <ul className="skill-group__list">
                {group.items.map((item) => (
                  <li key={item.label} className="skill-group__item">
                    <span className="skill-group__label">{item.label}</span>
                    {item.note ? <span className="skill-group__note">{item.note}</span> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
