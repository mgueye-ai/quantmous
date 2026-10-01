import { useEffect, useRef, useState } from 'react'

/**
 * Horizontal snap carousel driven by touch, not overflow-x.
 *
 * Native overflow scroll is unreliable on phones once a parent clips overflow,
 * so the track is translated instead and vertical page scrolling stays free
 * until the gesture is clearly sideways.
 */
export function useSwipeCarousel(enabled: boolean) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLElement>(null)
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    if (!enabled) {
      track.style.transform = ''
      track.style.transition = ''
      indexRef.current = 0
      setIndex(0)
      return
    }

    let active = false
    let startX = 0
    let startY = 0
    let origin = 0
    let axis: 'x' | 'y' | null = null
    let suppressClick = false

    const gap = () => {
      const style = getComputedStyle(track)
      return parseFloat(style.columnGap || style.gap) || 0
    }

    const itemWidth = () => {
      const first = track.children[0] as HTMLElement | undefined
      if (!first) return 0
      return first.getBoundingClientRect().width + gap()
    }

    const lastIndex = () => Math.max(0, track.children.length - 1)

    const paint = (px: number, animate: boolean) => {
      track.style.transition = animate ? 'transform 380ms cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none'
      track.style.transform = `translate3d(${px}px, 0, 0)`
    }

    const go = (next: number, animate: boolean) => {
      const clamped = Math.min(lastIndex(), Math.max(0, next))
      indexRef.current = clamped
      setIndex(clamped)
      paint(-clamped * itemWidth(), animate)
    }

    const onStart = (x: number, y: number) => {
      active = true
      axis = null
      startX = x
      startY = y
      origin = -indexRef.current * itemWidth()
      paint(origin, false)
    }

    const onMove = (x: number, y: number, event: Event) => {
      if (!active) return
      const dx = x - startX
      const dy = y - startY
      if (axis === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      }
      if (axis !== 'x') return
      event.preventDefault()
      if (Math.abs(dx) > 10) suppressClick = true
      paint(origin + dx, false)
    }

    const onEnd = (x: number) => {
      if (!active) return
      active = false
      if (axis !== 'x') {
        axis = null
        return
      }
      const dx = x - startX
      const width = itemWidth()
      const threshold = Math.max(36, width * 0.16)
      let next = indexRef.current
      if (dx < -threshold) next += 1
      else if (dx > threshold) next -= 1
      axis = null
      go(next, true)
    }

    const touchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      onStart(event.touches[0].clientX, event.touches[0].clientY)
    }

    const touchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return
      onMove(event.touches[0].clientX, event.touches[0].clientY, event)
    }

    const touchEnd = (event: TouchEvent) => {
      const point = event.changedTouches[0]
      if (point) onEnd(point.clientX)
    }

    const pointerStart = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (event.button !== 0) return
      onStart(event.clientX, event.clientY)
      viewport.setPointerCapture(event.pointerId)
    }

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      onMove(event.clientX, event.clientY, event)
    }

    const pointerEnd = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      onEnd(event.clientX)
    }

    const clickCapture = (event: Event) => {
      if (!suppressClick) return
      event.preventDefault()
      event.stopPropagation()
      suppressClick = false
    }

    const onResize = () => go(indexRef.current, false)

    viewport.addEventListener('touchstart', touchStart, { passive: true })
    viewport.addEventListener('touchmove', touchMove, { passive: false })
    viewport.addEventListener('touchend', touchEnd, { passive: true })
    viewport.addEventListener('touchcancel', touchEnd, { passive: true })
    viewport.addEventListener('pointerdown', pointerStart)
    viewport.addEventListener('pointermove', pointerMove)
    viewport.addEventListener('pointerup', pointerEnd)
    viewport.addEventListener('pointercancel', pointerEnd)
    viewport.addEventListener('click', clickCapture, true)
    window.addEventListener('resize', onResize)
    go(indexRef.current, false)

    return () => {
      viewport.removeEventListener('touchstart', touchStart)
      viewport.removeEventListener('touchmove', touchMove)
      viewport.removeEventListener('touchend', touchEnd)
      viewport.removeEventListener('touchcancel', touchEnd)
      viewport.removeEventListener('pointerdown', pointerStart)
      viewport.removeEventListener('pointermove', pointerMove)
      viewport.removeEventListener('pointerup', pointerEnd)
      viewport.removeEventListener('pointercancel', pointerEnd)
      viewport.removeEventListener('click', clickCapture, true)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled])

  return { viewportRef, trackRef, index }
}
