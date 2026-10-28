<script setup lang="ts">
import type { FactItem } from "../types";
import { gsap } from "../lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "../lib/motion";
import { useGsapScope } from "../composables/useGsapScope";

defineProps<{
  tag: string;
  title: string;
  image: string;
  facts: FactItem[];
}>();

useGsapScope((root) => {
  if (prefersReducedMotion()) return;
  const tag = root.querySelector('[data-case="tag"]');
  const title = root.querySelector('[data-case="title"]');
  const facts = root.querySelectorAll('[data-case="fact"]');
  const image = root.querySelector('[data-case="image"]');

  // Entrance: title rises, image de-zooms (transform + opacity + clip only).
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (tag) tl.from(tag, { y: 16, opacity: 0, duration: 0.5 }, 0.1);
  if (title) tl.from(title, { y: 64, opacity: 0, duration: 1 }, 0.15);
  if (facts.length > 0)
    tl.from(facts, { y: 16, opacity: 0, duration: 0.5, stagger: 0.07 }, 0.5);
  if (image) tl.from(image, { scale: 1.12, duration: 1.4 }, 0);

  // Gentle parallax on fine pointers only — transform, scrubbed.
  if (image && hasFinePointer()) {
    gsap.fromTo(
      image,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }
});
</script>

<template>
  <section ref="root" class="case-hero">
    <img class="case-hero__img" :src="image" :alt="title" data-case="image" />
    <div class="case-hero__overlay">
      <span class="case-hero__tag" data-case="tag">{{ tag }}</span>
      <h1 class="case-hero__title" data-case="title">{{ title }}</h1>
    </div>
    <dl class="case-hero__meta">
      <div
        v-for="fact in facts"
        :key="fact.key"
        class="case-hero__fact"
        data-case="fact"
      >
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
  inset: -8% 0;
  width: 100%;
  height: 116%;
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
