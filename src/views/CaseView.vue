<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CaseHero from "../components/CaseHero.vue";
import CaseBody from "../components/CaseBody.vue";
import CaseGallery from "../components/CaseGallery.vue";
import { cases, defaultCaseSlug } from "../data/works";
import { setupReveals } from "../composables/useReveal";
import { useGsapScope } from "../composables/useGsapScope";
import BillboardFooter from "@/components/BillboardFooter.vue";

const route = useRoute();
const detail = computed(
  () => cases[route.params.slug as string] ?? cases[defaultCaseSlug],
);

useGsapScope((root) => {
  setupReveals(root);
});
</script>

<template>
  <main :key="detail.slug" :data-slug="detail.slug" ref="root" class="page">
    <header class="case-nav">
      <RouterLink to="/#works" class="case-nav__link">← ALL WORKS</RouterLink>

      <a href="/">
        <span class="case-nav__logo">MIRA VOLKOV</span>
      </a>

      <RouterLink :to="`/work/${detail.nextSlug}`" class="case-nav__link"
        >NEXT →</RouterLink
      >
    </header>
    <CaseHero
      :tag="detail.tag"
      :title="detail.title"
      :image="detail.image"
      :facts="detail.meta"
    />
    <CaseBody
      :statement="detail.statement"
      :facts="detail.facts"
      :next-title="detail.nextTitle"
    />
    <CaseGallery
      :tall="detail.galleryTall"
      :stack="detail.galleryStack"
      :alt="detail.title"
    />
    <BillboardFooter />
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
