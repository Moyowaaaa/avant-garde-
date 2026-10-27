<script setup lang="ts">
import type { WorkItem } from '../types'

defineProps<{ work: WorkItem }>()
</script>

<template>
  <article class="card" :style="{ height: `${work.height}px` }">
    <img class="card__img" :src="work.image" :alt="work.title" loading="lazy" />
    <div class="card__overlay">
      <span class="card__meta">{{ work.meta }}</span>
      <h3 class="card__title">{{ work.title }}</h3>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--bg-elev);
}
.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.card:hover .card__img {
  transform: scale(1.04);
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
</style>
