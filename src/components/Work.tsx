import { projects } from '../data/work'
import { AppsCollection } from './AppsCollection'
import { WorkShowcase } from './WorkShowcase'

const themes: Record<string, string> = {
  'mous-apps': 'mous',
  'hill-web-works': 'hill',
}

export function Work() {
  return (
    <>
      {projects.map((project, index) => (
        <section
          key={project.id}
          id={index === 0 ? 'work' : undefined}
          className={`stack stack--${themes[project.id] ?? 'mous'}`}
          aria-label={project.name}
        >
          <div className="stack__inner shell">
            <WorkShowcase project={project} index={index} />
          </div>
          {project.products ? <AppsCollection products={project.products} /> : null}
        </section>
      ))}
    </>
  )
}
