import { useEffect, useRef, useState } from 'react'
import { navItems, links, person } from '../data/site'
import { ExternalLink } from './ExternalLink'
import { CloseIcon, LinkedInIcon, MenuIcon, StravaIcon } from './Icons'

interface NavProps {
  activeId: string
}

export function Nav({ activeId }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-menu-open', open)
    return () => document.body.classList.remove('is-menu-open')
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    const mql = window.matchMedia('(min-width: 861px)')
    const onBreakpoint = () => mql.matches && setOpen(false)

    document.addEventListener('keydown', onKeyDown)
    mql.addEventListener('change', onBreakpoint)
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      mql.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#home">
          {person.name}
        </a>

        <p className="nav__quote">
          <em>&ldquo;{person.quote}&rdquo;</em>
        </p>

        <div className="nav__end">
          <nav className="nav__links" aria-label="Primary">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav__link${activeId === item.id ? ' is-active' : ''}`}
                    aria-current={activeId === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__social">
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
          </div>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`nav__panel${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="nav__panel-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeId === item.id ? 'is-active' : undefined}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__panel-social">
          <ExternalLink href={links.linkedin} className="btn btn--secondary btn--sm" label="Moustapha Gueye on LinkedIn">
            <LinkedInIcon size={16} />
            LinkedIn
          </ExternalLink>
          <ExternalLink href={links.strava} className="btn btn--secondary btn--sm" label="Moustapha Gueye on Strava">
            <StravaIcon size={16} />
            Strava
          </ExternalLink>
        </div>
      </div>
    </header>
  )
}
