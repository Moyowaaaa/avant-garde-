<script setup lang="ts">
import { services } from '../data/works'
</script>

<template>
  <section class="services">
    <div class="services__header">
      <span class="eyebrow">( CAPABILITIES )</span>
      <span class="services__hint">HOVER STATE MOCKUP → ROW 02</span>
    </div>
    <div
      v-for="service in services"
      :key="service.title"
      class="service"
      :class="{ 'service--active': service.active }"
    >
      <span class="service__num">{{ service.active ? '/02 ● ACTIVE' : service.index }}</span>
      <h3 class="service__title">{{ service.title }}</h3>
      <p class="service__desc">{{ service.description }}</p>
      <img
        v-if="service.previewImage"
        class="service__preview"
        :src="service.previewImage"
        :alt="service.title"
      />
      <span v-if="service.active" class="service__cta">VIEW CASE →</span>
    </div>
  </section>
</template>

<style scoped>
.services {
  display: flex;
  flex-direction: column;
  padding: 0 var(--pad-page) 64px;
}
.services__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
}
.services__hint {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
.service {
  display: grid;
  grid-template-columns: 140px 1fr 320px;
  align-items: center;
  gap: 24px;
  padding: 32px 0;
  border-top: 1px solid var(--line);
  position: relative;
}
.service:last-child {
  border-bottom: 1px solid var(--line);
}
.service__num {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--accent);
}
.service__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 700;
  transition: font-style 0.2s ease;
}
.service:hover .service__title {
  font-style: italic;
}
.service__desc {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 320px;
}
.service--active {
  background: var(--accent);
  color: #0a0a0a;
  margin: 0 calc(var(--pad-page) * -1);
  padding-left: var(--pad-page);
  padding-right: var(--pad-page);
}
.service--active .service__num,
.service--active .service__desc {
  color: #0a0a0a;
}
.service__preview {
  position: absolute;
  right: 260px;
  top: 50%;
  width: 240px;
  height: 150px;
  object-fit: cover;
  transform: translateY(-50%) rotate(2deg);
  border-radius: var(--radius-sm);
  pointer-events: none;
}
.service__cta {
  position: absolute;
  right: var(--pad-page);
  bottom: 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
}
@media (max-width: 900px) {
  .service {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .service__title {
    font-size: 38px;
  }
  .service__preview {
    display: none;
  }
}
</style>
