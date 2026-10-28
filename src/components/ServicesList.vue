<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import { services } from "../data/works";
import { gsap } from "../lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "../lib/motion";

const rootRef = useTemplateRef<HTMLElement>("root");
let cleanups: Array<() => void> = [];

function bindPreviewFollow(): void {
  const root = rootRef.value;
  if (!root || !hasFinePointer() || prefersReducedMotion()) return;

  const rows = Array.from(root.querySelectorAll<HTMLElement>(".service"));
  rows.forEach((row) => {
    const preview = row.querySelector<HTMLElement>(".service__preview");
    if (!preview) return;

    // Outer wrapper has no CSS transform, so quickTo x/y never fights the
    // inner image's rotate/scale entrance.
    const xTo = gsap.quickTo(preview, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(preview, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      // Clamp travel so the floating preview can never leave the row's box
      // (and therefore can never push the page sideways).
      const maxX = Math.max(0, rect.width / 2 - preview.offsetWidth / 2 - 16);
      const maxY = Math.max(0, rect.height / 2 - 40);
      const dx = gsap.utils.clamp(
        -maxX,
        maxX,
        event.clientX - rect.left - rect.width / 2,
      );
      const dy = gsap.utils.clamp(
        -maxY,
        maxY,
        event.clientY - rect.top - rect.height / 2,
      );
      xTo(dx);
      yTo(dy);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    row.addEventListener("mousemove", onMove);
    row.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      row.removeEventListener("mousemove", onMove);
      row.removeEventListener("mouseleave", onLeave);
    });
  });
}

function unbindPreviewFollow(): void {
  cleanups.forEach((fn) => fn());
  cleanups = [];
}

onMounted(bindPreviewFollow);
onBeforeUnmount(unbindPreviewFollow);
</script>

<template>
  <section id="journal" ref="root" class="services" tabindex="-1">
    <div class="services__header">
      <span class="eyebrow">( CAPABILITIES )</span>
      <span class="services__hint">→ VIEW CASE</span>
    </div>
    <RouterLink
      v-for="service in services"
      :key="service.title"
      class="service"
      :to="service.workSlug ? `/work/${service.workSlug}` : '/'"
    >
      <span class="service__num">{{ service.index }}</span>
      <h3 class="service__title">{{ service.title }}</h3>
      <p class="service__desc">{{ service.description }}</p>
      <span
        v-if="service.previewImage"
        class="service__preview"
        aria-hidden="true"
      >
        <img :src="service.previewImage" :alt="''" />
      </span>
      <span class="service__cta">VIEW CASE →</span>
    </RouterLink>
  </section>
</template>

<style scoped>
.services {
  display: flex;
  flex-direction: column;
  padding: 0 var(--pad-page) 64px;
  scroll-margin-top: 80px;
  outline: none;

  /* Clip the hover bleed + floating preview at the section box so the page
     can never scroll sideways, without clipping previews against rows. */
  overflow-x: clip;
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
  /* Visible overflow: the preview floats above neighbouring rows. */
  overflow: visible;

  transition:
    background-color var(--dur-ui) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
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
  transition: transform var(--dur-ui) var(--ease-out);
}
.service__desc {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 320px;
}
/* Floating preview: hidden until the row is hovered. Outer span is moved by
   GSAP (no CSS transform here); inner img owns rotate/scale via CSS. */
.service__preview {
  position: absolute;
  right: 180px;
  top: 50%;
  width: 240px;
  height: 150px;
  margin-top: -75px;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--dur-ui) var(--ease-out),
    visibility 0s linear var(--dur-ui);
}
.service__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
  transform: rotate(2deg) scale(0.92);
  transition: transform var(--dur-ui) var(--ease-out);
}
.service__cta {
  position: absolute;
  right: var(--pad-page);
  bottom: 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity var(--dur-ui) var(--ease-out),
    transform var(--dur-ui) var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .service:hover .service__title {
    font-style: italic;
    transform: translateX(8px);
  }
  .service:hover {
    background: var(--accent);
    color: #0a0a0a;
    margin: 0 calc(var(--pad-page) * -1);
    padding-left: var(--pad-page);
    padding-right: var(--pad-page);
  }
  .service:hover .service__num,
  .service:hover .service__desc {
    color: #0a0a0a;
  }
  .service:hover .service__preview {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
  .service:hover .service__preview img {
    transform: rotate(2deg) scale(1);
  }
  .service:hover .service__cta {
    opacity: 1;
    transform: none;
  }
}
/* Touch / coarse pointers: no hover to reveal with — keep previews off and
   the CTA always visible so every row stays usable. */
@media (hover: none), (pointer: coarse) {
  .service__preview {
    display: none;
  }
  .service__cta {
    opacity: 1;
    transform: none;
  }
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
  .service__cta {
    position: static;
    opacity: 1;
    transform: none;
  }
}
</style>
