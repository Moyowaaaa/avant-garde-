<script setup lang="ts">
import SiteNav from '../components/SiteNav.vue'
import LabCard from '../components/LabCard.vue'
import { labImages } from '../data/works'
import type { LabPrototype } from '../types'

const left: { prototype: LabPrototype; variant: 'magnet' | 'glow' | 'shimmer' | 'embers'; image?: string }[] = [
  {
    prototype: {
      id: 'P01',
      title: 'MAGNETIC IMAGE',
      hint: 'MOUSE ● REACTS TO CURSOR',
      description:
        'Move your cursor across the frame — the photo bends toward it with a red edge-bleed. Prototype for portfolio card hover.',
    },
    variant: 'magnet',
    image: labImages.p01,
  },
  {
    prototype: {
      id: 'P03',
      title: 'SHIMMER SWEEP',
      hint: 'TIME ● LOOPS',
      description:
        'A light band sweeps across the headline every ~5s on its own. Prototype for billboard + CTA shimmer.',
    },
    variant: 'shimmer',
  },
]

const right: { prototype: LabPrototype; variant: 'magnet' | 'glow' | 'shimmer' | 'embers'; image?: string }[] = [
  {
    prototype: {
      id: 'P02',
      title: 'CURSOR GLOW',
      hint: 'MOUSE ● AMBIENT',
      description:
        'A red aura with a breathing ring follows the cursor. Prototype for dark-section hover ambience.',
    },
    variant: 'glow',
  },
  {
    prototype: {
      id: 'P04',
      title: 'EMBER FIELD',
      hint: 'TIME ● AMBIENT LOOP',
      description:
        'Rising embers, sparks and grain loop forever. This is the exact engine behind the footer billboard.',
    },
    variant: 'embers',
  },
]
</script>

<template>
  <main class="page">
    <SiteNav logo="MOTION LAB" index="03 / 04" :links="['P01', 'P02', 'P03', 'P04']" />
    <header class="lab-header">
      <h1 class="lab-header__title">Motion Lab</h1>
      <span class="lab-header__sub">LIVE SHADER PROTOTYPES — HOVER / TIME / MOUSE ●</span>
    </header>
    <div class="lab-grid">
      <div class="lab-col">
        <LabCard
          v-for="card in left"
          :key="card.prototype.id"
          :prototype="card.prototype"
          :variant="card.variant"
          :image="card.image"
        />
      </div>
      <div class="lab-col">
        <LabCard
          v-for="card in right"
          :key="card.prototype.id"
          :prototype="card.prototype"
          :variant="card.variant"
          :image="card.image"
        />
      </div>
    </div>
    <p class="lab-note">TIP — MOVE YOUR CURSOR OVER P01 + P02 ● P03 + P04 LOOP ON THEIR OWN</p>
  </main>
</template>

<style scoped>
.page {
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  padding-bottom: 64px;
}
.lab-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 48px var(--pad-page) 32px;
}
.lab-header__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 700;
}
.lab-header__sub {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--accent);
}
.lab-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 0 var(--pad-page);
}
.lab-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.lab-note {
  padding: 32px var(--pad-page) 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
@media (max-width: 900px) {
  .lab-grid {
    grid-template-columns: 1fr;
  }
  .lab-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .lab-header__title {
    font-size: 44px;
  }
}
</style>
