<script setup lang="ts">
interface Props {
  logo?: string
  index?: string
  links?: string[]
}

withDefaults(defineProps<Props>(), {
  logo: 'MIRA VOLKOV',
  index: '01 / 04',
  links: () => ['WORKS', 'ABOUT', 'JOURNAL', 'CONTACT'],
})
</script>

<template>
  <header class="nav">
    <div class="nav__logo">{{ logo }}</div>
    <nav class="nav__links" aria-label="Primary">
      <a v-for="link in links" :key="link" href="#">{{ link }}</a>
    </nav>
    <div class="nav__index">{{ index }}</div>
  </header>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 var(--pad-page);
}
.nav__logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
}
.nav__links {
  display: flex;
  gap: 32px;
}
.nav__links a {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
}
.nav__links a:hover {
  color: var(--text-primary);
}
.nav__index {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--accent);
}
@media (max-width: 900px) {
  .nav__links {
    display: none;
  }
}
</style>
