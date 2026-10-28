<script setup lang="ts">
/**
 * Custom cursor — a small accent dot glued to the pointer plus a trailing
 * ring. The ring reads context from the element under the cursor:
 * links/buttons → expands with a "GO" hint feel (arrow kick),
 * work imagery → expands into a "VIEW" badge,
 * services rows → expands with a red wash.
 * Transform-only motion via GSAP quickTo; native cursor stays visible so
 * nothing is ever lost, and the whole thing is fine-pointer-only.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from '../lib/gsap'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

type CursorMode = 'idle' | 'link' | 'view' | 'drag'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const label = ref<HTMLElement | null>(null)
const mode = ref<CursorMode>('idle')
const enabled = ref(false)

let removeListeners: (() => void) | null = null

function modeForTarget(target: EventTarget | null): CursorMode {
  if (!(target instanceof HTMLElement)) return 'idle'
  const viewable = target.closest('[data-cursor="view"]')
  if (viewable) return 'view'
  const row = target.closest('.service')
  if (row) return 'drag'
  const interactive = target.closest('a, button, [role="button"]')
  if (interactive) return 'link'
  return 'idle'
}

onMounted(() => {
  if (!hasFinePointer() || prefersReducedMotion()) return
  const dotEl = dot.value
  const ringEl = ring.value
  if (!dotEl || !ringEl) return
  enabled.value = true
  document.documentElement.classList.add('has-custom-cursor')

  // Dot: glued to the pointer (short duration = near-1:1, buttery).
  const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3.out' })
  const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3.out' })
  // Ring: trails behind with visible lag — the "alive" part.
  const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.45, ease: 'power3.out' })
  const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.45, ease: 'power3.out' })

  // Start centred; avoids a fly-in from the corner on first mousemove.
  gsap.set([dotEl, ringEl], { x: window.innerWidth / 2, y: window.innerHeight / 2, xPercent: -50, yPercent: -50 })

  const onMove = (event: MouseEvent) => {
    dotX(event.clientX)
    dotY(event.clientY)
    ringX(event.clientX)
    ringY(event.clientY)
    const next = modeForTarget(event.target)
    if (next !== mode.value) mode.value = next
  }
  const onDown = () => {
    gsap.to([dotEl, ringEl], { scale: 0.8, duration: 0.2, ease: 'power3.out', overwrite: 'auto' })
  }
  const onUp = () => {
    gsap.to([dotEl, ringEl], { scale: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
  }
  const onLeaveDoc = () => {
    gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.25, overwrite: 'auto' })
  }
  const onEnterDoc = () => {
    gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.25, overwrite: 'auto' })
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  document.documentElement.addEventListener('mouseleave', onLeaveDoc)
  document.documentElement.addEventListener('mouseenter', onEnterDoc)

  removeListeners = () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mousedown', onDown)
    window.removeEventListener('mouseup', onUp)
    document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
    document.documentElement.removeEventListener('mouseenter', onEnterDoc)
    document.documentElement.classList.remove('has-custom-cursor')
  }
})

onBeforeUnmount(() => {
  removeListeners?.()
  removeListeners = null
})
</script>

<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div ref="ring" class="cursor__ring" :data-mode="mode">
      <span ref="label" class="cursor__label">{{
        mode === 'view' ? 'VIEW' : mode === 'drag' ? '●' : mode === 'link' ? '↗' : ''
      }}</span>
    </div>
    <div ref="dot" class="cursor__dot" :data-mode="mode" />
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  inset: 0;
  z-index: 120;
  pointer-events: none;
}
.cursor__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.cursor__dot[data-mode='view'],
.cursor__dot[data-mode='drag'],
.cursor__dot[data-mode='link'] {
  opacity: 0;
}
.cursor__ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(245, 241, 232, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 250ms var(--ease-out), height 250ms var(--ease-out),
    background-color 250ms var(--ease-out), border-color 250ms var(--ease-out);
}
.cursor__ring[data-mode='link'] {
  width: 56px;
  height: 56px;
  border-color: var(--accent);
  background: rgba(255, 59, 47, 0.12);
}
.cursor__ring[data-mode='view'] {
  width: 84px;
  height: 84px;
  border-color: transparent;
  background: var(--accent);
}
.cursor__ring[data-mode='drag'] {
  width: 72px;
  height: 72px;
  border-color: transparent;
  background: rgba(255, 59, 47, 0.9);
}
.cursor__label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #0a0a0a;
  opacity: 0;
  transition: opacity 160ms ease-out;
}
.cursor__ring[data-mode='view'] .cursor__label,
.cursor__ring[data-mode='drag'] .cursor__label {
  opacity: 1;
}
.cursor__ring[data-mode='link'] .cursor__label {
  opacity: 1;
  color: var(--accent);
  font-size: 14px;
}
</style>
