<script setup lang="ts">
import type { FactItem } from '../types'

defineProps<{
  tag: string
  title: string
  image: string
  facts: FactItem[]
}>()
</script>

<template>
  <section class="case-hero">
    <img class="case-hero__img" :src="image" :alt="title" />
    <div class="case-hero__overlay">
      <span class="case-hero__tag">{{ tag }}</span>
      <h1 class="case-hero__title">{{ title }}</h1>
    </div>
    <dl class="case-hero__meta">
      <div v-for="fact in facts" :key="fact.key" class="case-hero__fact">
        <dt>{{ fact.key }}</dt>
        <dd>{{ fact.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.case-hero {
  position: relative;
  min-height: 860px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}
.case-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.case-hero__overlay {
  position: relative;
  padding: 0 var(--pad-page);
  margin-bottom: auto;
  padding-top: 120px;
}
.case-hero__tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--accent);
}
.case-hero__title {
  margin: 12px 0 0;
  font-family: var(--font-display);
  font-size: clamp(64px, 10vw, 150px);
  font-weight: 700;
  line-height: 0.95;
}
.case-hero__meta {
  position: relative;
  display: flex;
  gap: 48px;
  margin: 0;
  padding: 24px var(--pad-page);
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(8px);
}
.case-hero__fact {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.case-hero__fact dt {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
.case-hero__fact dd {
  margin: 0;
  font-size: 14px;
}
@media (max-width: 900px) {
  .case-hero__meta {
    flex-wrap: wrap;
    gap: 24px;
  }
}
</style>
