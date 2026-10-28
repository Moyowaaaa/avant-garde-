<script setup lang="ts">
import { gsap, ScrollTrigger } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { useGsapScope } from "../composables/useGsapScope";

defineProps<{
  tall: string;
  stack: string[];
  alt?: string;
}>();

useGsapScope((root) => {
  if (prefersReducedMotion()) return;
  const frames = Array.from(
    root.querySelectorAll<HTMLElement>('[data-gallery="frame"]'),
  );
  const images = Array.from(
    root.querySelectorAll<HTMLElement>('[data-gallery="image"]'),
  );
  if (frames.length === 0) return;

  gsap.set(frames, { clipPath: "inset(12% 6% 12% 6%)", opacity: 0 });
  gsap.set(images, { scale: 1.12 });

  ScrollTrigger.batch(frames, {
    start: "top 85%",
    once: true,
    onEnter: (entered) => {
      entered.forEach((frame, i) => {
        const img = frame.querySelector<HTMLElement>('[data-gallery="image"]');
        gsap.to(frame, {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1,
          delay: i * 0.08,
          ease: "power3.out",
          overwrite: "auto",
        });
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 1.2,
            delay: i * 0.08,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    },
  });
});
</script>

<template>
  <section ref="root" class="gallery">
    <div class="gallery__frame" data-gallery="frame">
      <img
        class="gallery__tall"
        :src="tall"
        :alt="alt ?? 'Case gallery'"
        loading="lazy"
        data-gallery="image"
      />
    </div>
    <div class="gallery__stack">
      <div
        v-for="(src, i) in stack"
        :key="i"
        class="gallery__frame"
        data-gallery="frame"
      >
        <img
          :src="src"
          :alt="`${alt ?? 'Case gallery'} ${i + 1}`"
          loading="lazy"
          data-gallery="image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  min-height: 560px;
  padding: 0 var(--pad-page);
  width: 100%;
  max-width: 90rem;
  margin: auto;
  max-height: 70rem;
  padding-bottom: 2rem;
}
.gallery__frame {
  overflow: hidden;
  border-radius: var(--radius-sm);
  min-height: 0;
}
.gallery__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.gallery__tall {
  width: 100%;
  height: 100%;
  min-height: 560px;
  object-fit: cover;
  border-radius: inherit;
}
.gallery__stack {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
  max-height: 70rem;
}
.gallery__stack img {
  width: 100%;
  height: 100%;
  min-height: 268px;
  object-fit: cover;
  border-radius: inherit;
}
@media (max-width: 900px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 900px) {
  .gallery {
    max-height: 70rem;
  }
}
</style>
