<script setup lang="ts">
import { heroImage } from "../data/works";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { useGsapScope } from "../composables/useGsapScope";

useGsapScope((root) => {
  if (prefersReducedMotion()) return;
  const eyebrow = root.querySelector('[data-hero="eyebrow"]');
  const lines = root.querySelectorAll('[data-hero="line"]');
  const meta = root.querySelector('[data-hero="meta"]');
  const media = root.querySelector('[data-hero="media"]');
  const image = root.querySelector('[data-hero="image"]');

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (eyebrow) tl.from(eyebrow, { y: 16, opacity: 0, duration: 0.5 }, 0.1);
  if (lines.length > 0)
    tl.from(lines, { y: 56, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.15);
  if (meta) tl.from(meta, { y: 20, opacity: 0, duration: 0.6 }, 0.55);
  if (media)
    tl.from(media, { clipPath: "inset(0 0 100% 0)", duration: 1 }, 0.25);
  if (image) tl.from(image, { scale: 1.15, duration: 1.2 }, 0.25);
});
</script>

<template>
  <section ref="root" class="hero">
    <div class="hero__left">
      <p class="eyebrow" data-hero="eyebrow">— Photographer / Director</p>
      <h1 class="hero__title">
        <span class="hero__line" data-hero="line">Avant-</span><br /><span
          class="hero__line hero__accent"
          data-hero="line"
          >Garde</span
        ><br /><span class="hero__line" data-hero="line">Fashion</span>
      </h1>
      <div class="hero__meta" data-hero="meta">
        <p class="hero__desc">
          A study of light, form and the spaces between. Editorial and campaign
          work for Maison Margiela, Rick Owens, and The Row.
        </p>
      </div>
    </div>
    <div class="hero__image" data-hero="media" data-cursor="view">
      <img :src="heroImage" alt="FW26 — Look 07" data-hero="image" />
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
  max-width: 90rem;
  margin: auto;
  width: 100%;
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
