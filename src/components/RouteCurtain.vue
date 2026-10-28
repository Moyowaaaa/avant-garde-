<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  curtainState,
  registerCurtain,
  unregisterCurtain,
} from '../lib/transition'

/**
 * Full-viewport curtain. Mounted with the app and parked below the fold
 * so a route guard can cover the current page before the next view mounts.
 */
const panel = ref<HTMLElement | null>(null)

onMounted(() => {
  if (panel.value) registerCurtain(panel.value)
})

onBeforeUnmount(() => {
  if (panel.value) unregisterCurtain(panel.value)
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="panel"
      class="curtain"
      :class="{ 'curtain--on': curtainState.visible }"
      role="status"
      :aria-hidden="curtainState.visible ? 'false' : 'true'"
    >
      <div class="curtain__inner">
        <p class="curtain__eyebrow">{{ curtainState.eyebrow }}</p>
        <p class="curtain__title">
          <span class="curtain__line">{{ curtainState.title }}</span>
        </p>
        <div class="curtain__bar" aria-hidden="true"><span class="curtain__fill" /></div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.curtain {
  position: fixed;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: var(--bg);
  pointer-events: none;
}
.curtain--on {
  pointer-events: auto;
}
.curtain__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 0 24px;
}
.curtain__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  opacity: 0;
}
.curtain__title {
  margin: 0;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: clamp(48px, 9vw, 128px);
  font-weight: 700;
  line-height: 1.05;
}
.curtain__line {
  display: block;
  padding-block: 0.06em;
}
.curtain__bar {
  width: min(240px, 50vw);
  height: 2px;
  background: rgba(245, 241, 232, 0.14);
  overflow: hidden;
}
.curtain__fill {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--accent);
  transform-origin: left center;
}
@media (prefers-reduced-motion: reduce) {
  .curtain {
    display: none;
  }
}
</style>
