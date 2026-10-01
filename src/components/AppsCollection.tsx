import type { FocusEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { WorkProduct } from '../data/work'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollSnapIndex } from '../hooks/useScrollSnapIndex'
import { ArrowDownIcon } from './Icons'
import { ExternalLink } from './ExternalLink'
import { MediaFrame } from './MediaFrame'

type CardState = 'active' | 'adjacent' | 'far'

function stateFor(index: number, activeIndex: number): CardState {
  if (index === activeIndex) return 'active'
  if (Math.abs(index - activeIndex) === 1) return 'adjacent'
  return 'far'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function AppCard({
  product,
  index,
  state,
}: {
  product: WorkProduct
  index?: number
  state?: CardState
}) {
  return (
    <li className="app" data-index={index} data-state={state}>
      <ExternalLink
        href={product.href}
        className="app__link"
        label={`${product.name} — ${product.domain}`}
        withArrow={false}
      >
        <MediaFrame
          filename={product.name.toLowerCase()}
          alt={`The ${product.name} website — ${product.tagline}`}
          caption={product.domain}
          src={product.preview}
          ratio="16 / 9"
          className="app__media"
        />
      </ExternalLink>

      <div className="app__head">
        <h5 className="app__name">{product.name}</h5>
        <span className={`app__status${product.status === 'Live' ? ' app__status--live' : ''}`}>
          {product.status}
        </span>
      </div>

      <p className="app__tagline">{product.tagline}</p>
      <p className="app__description">{product.description}</p>

      <p className="app__meta">
        {product.reach ? <span className="app__reach">{product.reach}</span> : null}
        <span className="app__domain">{product.domain}</span>
      </p>
    </li>
  )
}

function AppsSwipe({ products }: { products: WorkProduct[] }) {
  const { ref, index } = useScrollSnapIndex<HTMLUListElement>()

  return (
    <div className="apps">
      <div className="shell">
        <h4 className="panel__label">The collection — live sites</h4>
      </div>
      <ul
        className="apps__scroller"
        ref={ref}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Mous Apps collection. Swipe left or right."
      >
        {products.map((product) => (
          <AppCard key={product.name} product={product} />
        ))}
      </ul>
      <p className="shell apps__hint" aria-hidden="true">
        {String(index + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')} · swipe
      </p>
    </div>
  )
}

function AppsGrid({ products }: { products: WorkProduct[] }) {
  return (
    <div className="shell apps">
      <h4 className="panel__label">The collection — live sites</h4>
      <ul className="apps__list">
        {products.map((product) => (
          <AppCard key={product.name} product={product} />
        ))}
      </ul>
    </div>
  )
}

/**
 * Scroll-driven collection, same mechanic as the desktop timeline: a tall
 * spacer, a sticky viewport, and a track that translates sideways as you
 * scroll so every app gets a turn on screen.
 */
function AppsHorizontal({ products }: { products: WorkProduct[] }) {
  const spacerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const metrics = useRef({ distance: 0, run: 1, centers: [] as number[] })

  const measure = useCallback(() => {
    const spacer = spacerRef.current
    const sticky = stickyRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!spacer || !sticky || !viewport || !track) return

    const distance = Math.max(0, track.scrollWidth - viewport.clientWidth)
    const hold = Math.round(window.innerHeight * 0.18)

    spacer.style.setProperty('--tlh-distance', `${distance}px`)
    spacer.style.setProperty('--tlh-hold', `${hold}px`)

    const centers = Array.from(track.children).map((child) => {
      const el = child as HTMLElement
      return el.offsetLeft + el.offsetWidth / 2
    })

    metrics.current = {
      distance,
      run: Math.max(1, spacer.offsetHeight - sticky.offsetHeight - hold),
      centers,
    }
  }, [])

  useEffect(() => {
    const spacer = spacerRef.current
    const sticky = stickyRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!spacer || !sticky || !viewport || !track) return

    let frame = 0

    const update = () => {
      frame = 0
      const { distance, run, centers } = metrics.current
      const progress = clamp(-spacer.getBoundingClientRect().top / run, 0, 1)
      const x = progress * distance

      track.style.transform = `translate3d(${-x}px, 0, 0)`
      sticky.style.setProperty('--tlh-progress', String(progress))

      const target = x + viewport.clientWidth * progress
      let nearest = 0
      let shortest = Infinity
      for (let i = 0; i < centers.length; i += 1) {
        const gap = Math.abs(centers[i] - target)
        if (gap < shortest) {
          shortest = gap
          nearest = i
        }
      }
      setActiveIndex((current) => (current === nearest ? current : nearest))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const remeasure = () => {
      measure()
      onScroll()
    }

    remeasure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', remeasure)
    const observer = new ResizeObserver(remeasure)
    observer.observe(track)
    observer.observe(viewport)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', remeasure)
      observer.disconnect()
    }
  }, [measure])

  const onFocusCapture = useCallback((event: FocusEvent<HTMLDivElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.app')
    const spacer = spacerRef.current
    const viewport = viewportRef.current
    if (!card || !spacer || !viewport) return

    const index = Number(card.dataset.index)
    const { distance, run, centers } = metrics.current
    if (Number.isNaN(index) || centers.length === 0) return

    const desired = clamp(centers[index] - viewport.clientWidth / 2, 0, distance)
    const progress = distance === 0 ? 0 : desired / distance
    const spacerTop = window.scrollY + spacer.getBoundingClientRect().top
    const target = Math.round(spacerTop + progress * run)

    if (Math.abs(window.scrollY - target) > 4) {
      window.scrollTo({ top: target, behavior: 'auto' })
    }
  }, [])

  const active = products[activeIndex] ?? products[0]

  return (
    <div className="apps-h" ref={spacerRef}>
      <div className="apps-h__sticky" ref={stickyRef}>
        <div className="shell tlh__bar">
          <p className="tlh__counter">
            <span className="tlh__counter-now">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span aria-hidden="true">/</span>
            <span>{String(products.length).padStart(2, '0')}</span>
          </p>
          <p className="tlh__current">{active.name}</p>
          <p className="tlh__hint">
            <span>Scroll. The collection moves sideways.</span>
            <ArrowDownIcon size={13} />
          </p>
        </div>

        <div className="shell tlh__rail" aria-hidden="true">
          <span className="tlh__rail-line">
            <span className="tlh__rail-fill" />
          </span>
          <span className="tlh__ticks">
            {products.map((product, index) => (
              <span
                key={product.name}
                className="tlh__tick"
                data-state={stateFor(index, activeIndex)}
                data-passed={index < activeIndex ? 'true' : undefined}
              />
            ))}
          </span>
        </div>

        <div
          className="apps-h__viewport"
          ref={viewportRef}
          onFocusCapture={onFocusCapture}
          role="region"
          aria-label="Mous Apps collection. Scroll to move through every live site."
        >
          <ul className="apps-h__track" ref={trackRef}>
            {products.map((product, index) => (
              <AppCard
                key={product.name}
                product={product}
                index={index}
                state={stateFor(index, activeIndex)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface AppsCollectionProps {
  products: WorkProduct[]
}

export function AppsCollection({ products }: AppsCollectionProps) {
  const isWide = useMediaQuery('(min-width: 901px)')
  const prefersReducedMotion = useReducedMotion()

  if (!isWide) return <AppsSwipe products={products} />
  if (prefersReducedMotion) return <AppsGrid products={products} />
  return <AppsHorizontal products={products} />
}
