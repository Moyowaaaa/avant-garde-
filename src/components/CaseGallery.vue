<script setup lang="ts">
defineProps<{
  tall: string
  stack: string[]
  alt?: string
}>()
</script>

<template>
  <section class="gallery">
    <img class="gallery__tall" :src="tall" :alt="alt ?? 'Case gallery'" loading="lazy" />
    <div class="gallery__stack">
      <img
        v-for="(src, i) in stack"
        :key="i"
        :src="src"
        :alt="`${alt ?? 'Case gallery'} ${i + 1}`"
        loading="lazy"
      />
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
}
.gallery__tall {
  width: 100%;
  height: 100%;
  min-height: 560px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
.gallery__stack {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
}
.gallery__stack img {
  width: 100%;
  height: 100%;
  min-height: 268px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
@media (max-width: 900px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>
