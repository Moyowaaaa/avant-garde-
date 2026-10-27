<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CaseHero from '../components/CaseHero.vue'
import CaseBody from '../components/CaseBody.vue'
import CaseGallery from '../components/CaseGallery.vue'
import { caseGalleryStack, caseGalleryTall, caseHeroImage } from '../data/works'

const meta = [
  { key: 'CLIENT', value: 'Maison Margiela' },
  { key: 'YEAR', value: '2026' },
  { key: 'ROLE', value: 'Photo + Direction' },
]

const facts = [
  { key: 'LOCATION', value: 'Palais Royal, Paris' },
  { key: 'FILM', value: 'Portra 800 + Digital' },
  { key: 'TEAM', value: 'Styling: A. Chen / MUA: R. Diallo' },
]
</script>

<template>
  <main class="page">
    <header class="case-nav">
      <RouterLink to="/" class="case-nav__link">← ALL WORKS</RouterLink>
      <span class="case-nav__logo">MIRA VOLKOV</span>
      <RouterLink to="/lab" class="case-nav__link">NEXT →</RouterLink>
    </header>
    <CaseHero
      tag="CAMPAIGN — MAISON MARGIELA / FW26"
      title="Rouge Noir"
      :image="caseHeroImage"
      :facts="meta"
    />
    <CaseBody
      statement="Black is never one color. Twelve looks, one Paris night — leather, lace and smoke."
      :facts="facts"
      next-title="Porcelain"
    />
    <CaseGallery :tall="caseGalleryTall" :stack="caseGalleryStack" alt="Rouge Noir gallery" />
  </main>
</template>

<style scoped>
.page {
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
}
.case-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 var(--pad-page);
}
.case-nav__logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
}
.case-nav__link {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
.case-nav__link:hover {
  color: var(--text-primary);
}
</style>
