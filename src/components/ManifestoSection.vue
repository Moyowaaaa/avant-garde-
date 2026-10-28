<script setup lang="ts">
defineProps<{
  num?: string;
  statement?: string;
  side?: string;
  cta?: string;
}>();
</script>

<template>
  <section id="about" class="manifesto" tabindex="-1">
    <div class="manifesto__main" data-reveal>
      <span class="eyebrow">{{ num ?? "( MANIFESTO )" }}</span>
      <p class="manifesto__text">
        {{
          statement ??
          "I photograph clothing the way architects draw buildings — as structures that hold memory, movement, and desire."
        }}
      </p>
    </div>
    <aside class="manifesto__side">
      <p class="manifesto__side-text">
        {{
          side ??
          "Based in Paris. Shooting worldwide. Available for editorials, campaigns and creative direction."
        }}
      </p>
      <a class="manifesto__cta">{{ cta ?? "BOOK A SHOOT →" }}</a>
      <span class="manifesto__rule" aria-hidden="true" />
    </aside>
  </section>
</template>

<style scoped>
.manifesto {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 64px;
  padding: 64px var(--pad-page);
  scroll-margin-top: 80px;
  outline: none;
  width: 100%;
  max-width: 90rem;
  margin: auto;
}
.manifesto__main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.manifesto__text {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 700;
  line-height: 1.2;
}
.manifesto__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.manifesto__side-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}
.manifesto__cta {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 2px;
  transition: color var(--dur-fast) var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .manifesto__cta:hover {
    color: var(--accent);
  }
}
.manifesto__rule {
  width: 48px;
  height: 2px;
  background: var(--accent);
}
@media (max-width: 900px) {
  .manifesto {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
