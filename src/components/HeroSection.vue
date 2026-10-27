<script setup lang="ts">
import { heroImage } from '../data/works'
</script>

<template>
  <section class="hero">
    <div class="hero__left">
      <p class="eyebrow">— Photographer / Director</p>
      <h1 class="hero__title">
        Avant-<br /><span class="hero__accent">Garde</span><br />Fashion
      </h1>
      <div class="hero__meta">
        <p class="hero__desc">
          A study of light, form and the spaces between. Editorial and campaign
          work for Maison Margiela, Rick Owens, and The Row.
        </p>
      </div>
    </div>
    <div class="hero__image">
      <img :src="heroImage" alt="FW26 — Look 07" />
      <div class="hero__labels">
        <span>FW26 — LOOK 07</span>
        <span>SCROLL — FW26 ●</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 720px 1fr;
  gap: 48px;
  align-items: stretch;
  min-height: 720px;
  padding: 0 var(--pad-page);
}
.hero__left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}
.hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(64px, 8vw, 120px);
  font-weight: 700;
  line-height: 0.9;
}
.hero__accent {
  color: var(--accent);
}
.hero__meta {
  padding-top: 24px;
}
.hero__desc {
  margin: 0;
  max-width: 320px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}
.hero__image {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--bg-elev);
  min-height: 480px;
}
.hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}
.hero__labels {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--text-secondary);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}
@media (max-width: 1100px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
