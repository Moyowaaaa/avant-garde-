<script setup lang="ts">
import WorkCard from './WorkCard.vue'
import { works } from '../data/works'

const columns = [
  [works[0], works[1]],
  [works[2], works[3]],
  [works[4], works[5]],
]
</script>

<template>
  <section id="works" class="portfolio" tabindex="-1">
    <div class="portfolio__header" data-reveal>
      <h2 class="portfolio__title">Selected Works</h2>
      <span class="portfolio__count">01 — 06</span>
    </div>
    <div class="portfolio__grid">
      <div v-for="(col, i) in columns" :key="i" class="portfolio__col">
        <WorkCard
          v-for="work in col"
          :key="work.slug"
          :work="work"
          data-reveal-item
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px var(--pad-page);
  width:100%;
  margin:auto;
  max-width: 90rem;
  scroll-margin-top: 80px;
  outline: none;
}
.portfolio__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.portfolio__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
}
.portfolio__count {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.portfolio__col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media (max-width: 900px) {
  .portfolio__grid {
    grid-template-columns: 1fr;
  }
  .portfolio__title {
    font-size: 34px;
  }
}
</style>
