import { useEffect, useRef } from 'react'

/**
 * One shared IntersectionObserver reveals every opted-in element, so the page
 * never pays for dozens of observers or a scroll listener.
 */
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )
  }
  return observer
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const io = getObserver()
    if (!io) {
      node.classList.add('is-visible')
      return
    }

    io.observe(node)
    return () => io.unobserve(node)
  }, [])

  return ref
}
