<script setup lang="ts">
import SiteNav from "../components/SiteNav.vue";
import HeroSection from "../components/HeroSection.vue";
import PortfolioGrid from "../components/PortfolioGrid.vue";
import MarqueeBand from "../components/MarqueeBand.vue";
import ManifestoSection from "../components/ManifestoSection.vue";
import ServicesList from "../components/ServicesList.vue";
import BillboardFooter from "../components/BillboardFooter.vue";
import { setupReveals } from "../composables/useReveal";
import { useGsapScope } from "../composables/useGsapScope";

useGsapScope((root) => {
  setupReveals(root);
  setupReveals(root, { selector: "[data-reveal-item]", y: 32, stagger: 0.06 });
});
</script>

<template>
  <main ref="root" class="page" data-route="home">
    <SiteNav />
    <HeroSection />
    <PortfolioGrid />
    <MarqueeBand />
    <ManifestoSection />
    <ServicesList />
    <BillboardFooter />
  </main>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
}
</style>
