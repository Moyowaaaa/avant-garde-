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

export function destroyLenis(): void {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn)
    tickerFn = null
  }
  lenis?.destroy()
  lenis = null
}
