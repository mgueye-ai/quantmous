import type { WorkProject } from '../data/work'
import { ExternalLink } from './ExternalLink'
import { MediaFrame } from './MediaFrame'
import { Reveal } from './Reveal'

interface WorkShowcaseProps {
  project: WorkProject
  index: number
}

export function WorkShowcase({ project, index }: WorkShowcaseProps) {
  const hasProducts = Boolean(project.products?.length)

  return (
    <article className={`showcase${hasProducts ? ' showcase--stacked' : ''}`}>
      <Reveal className="showcase__body">
        <div className="showcase__head">
          <p className="showcase__index">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="showcase__title">{project.name}</h3>
          <p className="showcase__role">{project.role}</p>
        </div>
        <div className="showcase__copy">
          <p className="prose showcase__summary">{project.summary}</p>

          <ul className="showcase__facts">
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          {project.capabilities ? (
            <ul className="tag-list">
              {project.capabilities.map((capability) => (
                <li key={capability} className="tag tag--navy">
                  {capability}
                </li>
              ))}
            </ul>
          ) : null}

          {project.clients ? (
            <div className="clients">
              <h4 className="panel__label">Featured client work</h4>
              <ul className="clients__list">
                {project.clients.map((client) => (
                  <li key={client.name} className="client">
                    <span className="client__name">{client.name}</span>
                    <span className="client__sector">{client.sector}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ExternalLink
            href={project.href}
            className="btn btn--primary showcase__cta"
            label={`${project.linkLabel} (${project.name})`}
          >
            {project.linkLabel}
          </ExternalLink>
        </div>
      </Reveal>

      {!hasProducts ? (
        <div className="showcase__media">
          <ExternalLink
            href={project.href}
            className="app__link"
            label={`${project.name} — ${project.media.caption}`}
            withArrow={false}
          >
            <MediaFrame
              filename={project.media.filename}
              alt={project.media.alt}
              caption={project.media.caption}
              src={project.media.src}
              ratio="16 / 9"
            />
          </ExternalLink>
          <p className="showcase__media-note">Site preview · {project.media.caption}</p>
        </div>
      ) : null}
    </article>
  )
}
