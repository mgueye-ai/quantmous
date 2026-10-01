import { useEffect, useState } from 'react'

/**
 * Watches every top-level `<section>` and reports which one currently owns the
 * viewport. Also writes `data-focus` so CSS can let off-screen sections recede.
 *
 * Measurement is based on how much of the *viewport* a section fills rather
 * than `intersectionRatio`, so a very tall section (the timeline) is treated
 * the same way as a short one.
 */
export function useSectionFocus(ids: string[], enabled: boolean): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return

    const coverage = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        const viewport = window.innerHeight || 1

        for (const entry of entries) {
          const target = entry.target as HTMLElement
          const visible = entry.intersectionRect.height / viewport
          coverage.set(target.id, visible)
          if (enabled) {
            target.dataset.focus = visible > 0.34 ? 'near' : 'away'
          } else {
            target.dataset.focus = 'near'
          }
        }

        let bestId = ''
        let bestValue = 0
        for (const id of ids) {
          const value = coverage.get(id) ?? 0
          if (value > bestValue) {
            bestValue = value
            bestId = id
          }
        }
        if (bestId) setActiveId(bestId)
      },
      { threshold: [0, 0.05, 0.15, 0.25, 0.35, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      sections.forEach((section) => delete section.dataset.focus)
    }
  }, [ids, enabled])

  return activeId
}
