import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export interface RevealOptions {
  /** Selector within scope for reveal targets. Defaults to `[data-reveal]`. */
  selector?: string
  /** Vertical offset in px for the entrance. Defaults to 24. */
  y?: number
  /** Duration in seconds. Defaults to 0.7. */
  duration?: number
  /** Stagger between targets in seconds. Defaults to 0. */
  stagger?: number
  /** ScrollTrigger start. Defaults to `top 85%`. */
  start?: string
}

/**
 * One-shot batch reveal for `[data-reveal]` targets inside a scope element.
 * Transform + opacity only; refreshes ScrollTrigger after images/fonts settle.
 */
export function setupReveals(root: HTMLElement, options: RevealOptions = {}): void {
  const {
    selector = '[data-reveal]',
    y = 24,
    duration = 0.7,
    stagger = 0,
    start = 'top 85%',
  } = options

  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
  if (targets.length === 0) return

  if (prefersReducedMotion()) {
    gsap.set(targets, { clearProps: 'all' })
    return
  }

  gsap.set(targets, { y, opacity: 0 })

  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (entered) => {
      gsap.to(entered, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'transform',
      })
    },
  })

  const refresh = () => ScrollTrigger.refresh()
  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => undefined)
  }
  window.addEventListener('load', refresh, { once: true })
}
