import { onBeforeUnmount, onMounted, useTemplateRef, type ShallowRef } from 'vue'
import { gsap } from '../lib/gsap'
import { isCovering, onRevealDone } from '../lib/transition'

/**
 * Scoped GSAP context bound to a component root ref.
 * Runs `setup` inside `gsap.context` on mount and reverts on unmount,
 * killing all ScrollTriggers created within the scope.
 *
 * When a route curtain covers the screen, setups created during the mount
 * are deferred until the curtain starts lifting — so `from()` entrances
 * play choreographed with the reveal instead of behind the curtain.
 */
export function useGsapScope(
  setup: (root: HTMLElement) => void,
  refKey = 'root',
): { rootRef: Readonly<ShallowRef<HTMLElement | null>> } {
  const rootRef = useTemplateRef<HTMLElement>(refKey)
  let ctx: gsap.Context | null = null
  let cancelDeferred: (() => void) | null = null

  onMounted(() => {
    const el = rootRef.value
    if (!el) return
    const run = () => {
      ctx = gsap.context(() => setup(el), el)
    }
    if (isCovering()) {
      cancelDeferred = onRevealDone(run)
    } else {
      run()
    }
  })

  onBeforeUnmount(() => {
    cancelDeferred?.()
    cancelDeferred = null
    ctx?.revert()
    ctx = null
  })

  return { rootRef }
}
