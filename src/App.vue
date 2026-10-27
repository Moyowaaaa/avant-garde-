<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import { destroyLenis } from './lib/lenis'

onBeforeUnmount(() => {
  destroyLenis()
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity var(--dur-ui) var(--ease-out);
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
