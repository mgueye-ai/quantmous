import type { ReactNode } from 'react'
import { ArrowUpRightIcon } from './Icons'

interface ExternalLinkProps {
  href: string
  children: ReactNode
  /** Spoken label; defaults to the visible text plus an "opens in a new tab" hint. */
  label?: string
  className?: string
  /** Appends the small diagonal arrow used for outbound links. */
  withArrow?: boolean
}

/**
 * Every outbound link on the site goes through here so the security and
 * accessibility attributes can never drift apart.
 */
export function ExternalLink({
  href,
  children,
  label,
  className,
  withArrow = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // An explicit label replaces the link text for screen readers, so the
      // new-tab hint has to live inside it rather than in a hidden span.
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
      className={className}
    >
      {children}
      {withArrow ? <ArrowUpRightIcon /> : null}
      {label ? null : <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  )
}
