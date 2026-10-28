<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import type { WorkItem } from '../types'
import { cases } from '../data/works'

const props = defineProps<{ work: WorkItem }>()

// Only works with a matching case detail get a link; others render static.
const casePath = computed(() => (cases[props.work.slug] ? `/work/${props.work.slug}` : null))
</script>

<template>
  <component
    :is="casePath ? RouterLink : 'article'"
    class="card"
    :to="casePath ?? undefined"
    :style="{ height: `${work.height}px` }"
    :aria-label="casePath ? `${work.title} — view case` : undefined"
    :data-cursor="casePath ? 'view' : undefined"
  >
    <img class="card__img" :src="work.image" :alt="work.title" loading="lazy" />
    <div class="card__overlay">
      <span class="card__meta">{{ work.meta }}</span>
      <h3 class="card__title">{{ work.title }}</h3>
    </div>
    <span v-if="casePath" class="card__cta">VIEW CASE →</span>
  </component>
</template>

<style scoped>
.card {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--bg-elev);
  color: inherit;
}
.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  a.card:hover .card__img {
    transform: scale(1.04);
  }
  a.card:hover .card__cta {
    opacity: 1;
    transform: none;
  }
}
.card:active .card__img {
  transform: scale(0.99);
}
.card__overlay {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.72));
}
.card__meta {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--text-secondary);
  text-transform: uppercase;
}
.card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
}
.card__cta {
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--text-primary);
  background: rgba(10, 10, 10, 0.6);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity var(--dur-ui) var(--ease-out), transform var(--dur-ui) var(--ease-out);
  pointer-events: none;
}
</style>
