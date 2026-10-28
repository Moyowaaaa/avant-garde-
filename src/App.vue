<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { RouterView } from 'vue-router'
import LoaderScreen from './components/LoaderScreen.vue'
import RouteCurtain from './components/RouteCurtain.vue'
import CustomCursor from './components/CustomCursor.vue'
import { destroyLenis } from './lib/lenis'
import { IMAGE_SET, preloadImages } from './lib/assets'
import { prefersReducedMotion } from './lib/motion'

const MS_PER_IMAGE_ESTIMATE = 120

const loadProgress = ref(0)
const loadDone = ref(false)
let minTimeElapsed = false
let assetsSettled = false

function maybeFinish(): void {
  if (minTimeElapsed && assetsSettled) loadDone.value = true
}
if (prefersReducedMotion()) {
  minTimeElapsed = true
} else {
  const minTime = Math.min(2500, 900 + IMAGE_SET.length * MS_PER_IMAGE_ESTIMATE)
  setTimeout(() => {
    minTimeElapsed = true
    maybeFinish()
  }, minTime)
}

preloadImages(IMAGE_SET, (fraction) => {
  loadProgress.value = fraction
})
  .catch(() => undefined)
  .finally(() => {
    loadProgress.value = 1
    assetsSettled = true
    maybeFinish()
  })

onBeforeUnmount(() => {
  destroyLenis()
})
</script>

<template>
  <LoaderScreen :progress="loadProgress" :done="loadDone" />
  <RouteCurtain />
  <CustomCursor />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 120ms linear;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
