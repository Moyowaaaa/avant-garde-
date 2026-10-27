import { onBeforeUnmount, onMounted, useTemplateRef, type ShallowRef } from 'vue'
import { gsap } from '../lib/gsap'

/**
 * Scoped GSAP context bound to a component root ref.
 * Runs `setup` inside `gsap.context` on mount and reverts on unmount,
 * killing all ScrollTriggers created within the scope.
 */
export function useGsapScope(
  setup: (root: HTMLElement) => void,
  refKey = 'root',
): { rootRef: Readonly<ShallowRef<HTMLElement | null>> } {
  const rootRef = useTemplateRef<HTMLElement>(refKey)
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const el = rootRef.value
    if (!el) return
    ctx = gsap.context(() => setup(el), el)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

  return { rootRef }
}
