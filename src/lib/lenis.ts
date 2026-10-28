import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { prefersReducedMotion } from './motion'

let lenis: Lenis | null = null
let tickerFn: ((time: number) => void) | null = null

export function initLenis(): Lenis | null {
  if (lenis) return lenis
  // Reduced motion: skip smoothing entirely, keep native scroll.
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  lenis.on('scroll', ScrollTrigger.update)
  tickerFn = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function scrollTopImmediate(): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true })
  } else {
    window.scrollTo(0, 0)
  }
}

/** Jump to an element id. False when it is not in the document yet. */
export function scrollToHash(hash: string): boolean {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  if (!id) return false
  const target = document.getElementById(id)
  if (!target) return false
  if (lenis) {
    // Immediate so the section is in place when the route curtain lifts.
    // `force` still runs while Lenis is stopped during the cover.
    lenis.scrollTo(target, { immediate: true, force: true })
  } else {
    target.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
  return true
}

/**
 * Put the incoming route where it should be: the hash target, or the top.
 * Returns false while the outgoing view is still the one in the document
 * (the leave transition has not finished). Scrolling then sticks the old
 * offset onto the page that mounts next.
 */
export function alignRouteScroll(): boolean {
  if (location.hash) return scrollToHash(location.hash)

  const main = document.querySelector('main.page')
  if (!main) return false

  const path = location.pathname
  if (path.startsWith('/work/')) {
    const slug = decodeURIComponent(path.slice('/work/'.length).replace(/\/$/, ''))
    if (main.getAttribute('data-slug') !== slug) return false
  } else if (main.getAttribute('data-route') !== 'home') {
    return false
  }

  scrollTopImmediate()
  return true
}

export function destroyLenis(): void {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn)
    tickerFn = null
  }
  lenis?.destroy()
  lenis = null
}
