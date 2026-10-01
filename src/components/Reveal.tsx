import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  /** Stagger, in milliseconds. */
  delay?: number
  style?: CSSProperties
}

/** Fades content in and lifts it slightly once it enters the viewport. */
export function Reveal({ as: Tag = 'div', children, className, delay = 0, style }: RevealProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={['reveal', className].filter(Boolean).join(' ')}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
