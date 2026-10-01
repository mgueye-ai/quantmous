import { useEffect } from 'react'

/**
 * Scroll-linked "rise into place" for section content.
 *
 * Each `[data-rise]` pane gets a `--rise` progress value between 0 and 1,
 * which CSS turns into a small upward travel and fade. The pane is at 0 while
 * it is still below the fold and reaches 1 once its top passes the settle
 * line, so a section appears to come up to meet the reader instead of simply
 * being scrolled past.
 *
 * Nothing here touches the scroll position — the page scrolls natively and
 * this only reads it.
 */

/**
 * Viewport fractions the pane's top travels between. The pane settles just
 * under the nav, so the travel finishes exactly as the section tops out —
 * including when a nav link glides the reader there.
 */
const START = 1
const SETTLE = 0.2

export function useSectionRise(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const panes = Array.from(document.querySelectorAll<HTMLElement>('[data-rise]'))
    if (panes.length === 0) return

    let frame = 0

    const update = () => {
      frame = 0
      const start = window.innerHeight * START
      const span = window.innerHeight * (START - SETTLE)

      // Read every rect before writing any style, so one layout pass serves
      // the whole batch instead of thrashing per pane.
      const tops = panes.map((pane) => pane.getBoundingClientRect().top)

      panes.forEach((pane, index) => {
        const progress = (start - tops[index]) / span
        const clamped = progress < 0 ? 0 : progress > 1 ? 1 : progress
        pane.style.setProperty('--rise', clamped.toFixed(3))
      })
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      // Leave the panes fully settled if the effect is ever switched off.
      panes.forEach((pane) => pane.style.removeProperty('--rise'))
    }
  }, [enabled])
}
