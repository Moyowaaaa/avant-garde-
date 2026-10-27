<script setup lang="ts">
defineProps<{ items?: string[] }>()
const defaults = ['PARIS FASHION WEEK — FW26', 'EDITORIAL — CAMPAIGN — RUNWAY', 'MIRA VOLKOV — ®2026']
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="(item, i) in (items ?? defaults)" :key="i">{{ item }}</span>
      <span v-for="(item, i) in (items ?? defaults)" :key="'b' + i">{{ item }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  height: 64px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--accent);
  color: #0a0a0a;
}
.marquee__track {
  display: flex;
  gap: 64px;
  white-space: nowrap;
  animation: scroll 22s linear infinite;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}
@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
