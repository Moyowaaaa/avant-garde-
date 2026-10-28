<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    progress?: number
    done?: boolean
  }>(),
  { progress: 0, done: false },
)

const shown = computed(() => !props.done)
const pct = computed(() => Math.round(Math.min(1, Math.max(0, props.progress)) * 100))
</script>

<template>
  <Transition name="loader-fade">
    <div v-if="shown" class="loader" role="status" aria-label="Loading portfolio">
      <div class="loader__inner">
        <p class="loader__eyebrow">MIRA VOLKOV — PORTFOLIO</p>
        <p class="loader__title">Avant-Garde</p>
        <div class="loader__bar" aria-hidden="true">
          <span
            class="loader__fill"
            :style="{ transform: `scaleX(${Math.min(1, Math.max(0, progress))})` }"
          />
        </div>
        <p class="loader__pct">{{ pct }}%</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}
.loader-fade-leave-active {
  transition: opacity 500ms var(--ease-out), visibility 0s linear 500ms;
}
.loader-fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
.loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.loader__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--accent);
}
.loader__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  font-style: italic;
  line-height: 1;
}
.loader__bar {
  width: min(280px, 60vw);
  height: 2px;
  background: var(--line);
  overflow: hidden;
}
.loader__fill {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
}
.loader__pct {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
@media (prefers-reduced-motion: reduce) {
  .loader-fade-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
