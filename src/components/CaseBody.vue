<script setup lang="ts">
import type { FactItem } from '../types'

defineProps<{
  statement: string
  facts: FactItem[]
  nextTitle?: string
}>()
</script>

<template>
  <section class="case-body">
    <div class="case-body__main">
      <span class="eyebrow">( STATEMENT )</span>
      <p class="case-body__statement">{{ statement }}</p>
    </div>
    <aside class="case-body__facts">
      <div v-for="fact in facts" :key="fact.key" class="fact">
        <span class="fact__key">{{ fact.key }}</span>
        <span class="fact__value">{{ fact.value }}</span>
      </div>
    </aside>
  </section>
  <section class="case-next">
    <span class="eyebrow">NEXT WORK →</span>
    <h2 class="case-next__title">{{ nextTitle ?? 'Porcelain' }}</h2>
  </section>
</template>

<style scoped>
.case-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 64px;
  padding: 64px var(--pad-page);
}
.case-body__main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.case-body__statement {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 44px);
  font-weight: 700;
  line-height: 1.2;
}
.case-body__facts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.fact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--line);
  padding-top: 12px;
}
.fact__key {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
.fact__value {
  font-size: 13px;
}
.case-next {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px var(--pad-page) 80px;
  text-align: center;
}
.case-next__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(56px, 8vw, 110px);
  font-weight: 700;
}
@media (max-width: 900px) {
  .case-body {
    grid-template-columns: 1fr;
  }
}
</style>
