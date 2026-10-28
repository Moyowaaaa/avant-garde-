<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

defineProps<{ items?: string[] }>()
const defaults = ['PARIS FASHION WEEK — FW26', 'EDITORIAL — CAMPAIGN — RUNWAY', 'MIRA VOLKOV — ®2026']

const rootRef = useTemplateRef<HTMLElement>('root')
let ctx: gsap.Context | null = null

onMounted(() => {
  const root = rootRef.value
  const track = root?.querySelector<HTMLElement>('[data-marquee-track]')
  // Velocity skew: transform-only, layered on top of the CSS loop.
  if (!root || !track || prefersReducedMotion()) return
  ctx = gsap.context(() => {
    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.3, ease: 'power3.out' })
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = gsap.utils.clamp(-12, 12, self.getVelocity() / -300)
        skewTo(velocity)
        if (Math.abs(velocity) < 0.5) skewTo(0)
      },
    })
  }, root)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <div ref="root" class="marquee" aria-hidden="true">
    <div class="marquee__track" data-marquee-track>
      <span v-for="(item, i) in (items ?? defaults)" :key="i">{{ item }}</span>
      <span v-for="(item, i) in (items ?? defaults)" :key="'b' + i">{{ item }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  height: 64px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--accent);
  color: #0a0a0a;
}
.marquee__track {
  display: flex;
  gap: 64px;
  white-space: nowrap;
  animation: scroll 22s linear infinite;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}
@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
