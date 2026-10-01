import { useEffect, useRef, useState } from 'react'

/**
 * Reads which snapped slide is in view. Does not capture touch — native
 * overflow-x on the scroller handles the finger swipe.
 */
export function useScrollSnapIndex<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const update = () => {
      const items = Array.from(root.children) as HTMLElement[]
      if (items.length === 0) return

      const anchor = root.scrollLeft + root.clientWidth * 0.45
      let nearest = 0
      let shortest = Infinity
      for (let i = 0; i < items.length; i += 1) {
        const center = items[i].offsetLeft + items[i].offsetWidth / 2
        const gap = Math.abs(center - anchor)
        if (gap < shortest) {
          shortest = gap
          nearest = i
        }
      }

      setIndex((current) => (current === nearest ? current : nearest))
      const max = Math.max(1, root.scrollWidth - root.clientWidth)
      setProgress(root.scrollLeft / max)
    }

    update()
    root.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      root.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return { ref, index, progress }
}
