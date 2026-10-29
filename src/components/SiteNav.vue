<script setup lang="ts">
import { computed } from "vue";
import { getLenis } from "../lib/lenis";

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  logo?: string;
  index?: string;
  links?: Array<string | NavLink>;
}

const props = withDefaults(defineProps<Props>(), {
  logo: "MIRA VOLKOV",
  index: "01 / 04",
  links: () => [
    { label: "WORKS", href: "#works" },
    { label: "ABOUT", href: "#about" },
    { label: "JOURNAL", href: "#journal" },
    { label: "CONTACT", href: "#contact" },
  ],
});

const items = computed(() =>
  props.links.map((link) =>
    typeof link === "string" ? { label: link, href: "#" } : link,
  ),
);

function onLogoClick(event: MouseEvent): void {
  event.preventDefault();
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo(0, 0);
  if (location.hash) {
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  }
}

function onLinkClick(event: MouseEvent, href: string): void {
  if (!href.startsWith("#") || href.length < 2) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();

  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target);
  else target.scrollIntoView({ behavior: "auto", block: "start" });

  history.replaceState(null, "", href);
  target.focus({ preventScroll: true });
}
</script>

<template>
  <header class="nav">
    <div class="nav__bar">
      <a class="nav__logo" href="#top" @click="onLogoClick">{{ logo }}</a>
      <nav class="nav__links" aria-label="Primary">
        <a
          v-for="link in items"
          :key="link.label"
          :href="link.href"
          @click="onLinkClick($event, link.href)"
          >{{ link.label }}</a
        >
      </nav>
      <div class="nav__index">{{ index }}</div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 30;
  width: 100%;
  background: var(--bg);
}
.nav__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 var(--pad-page);
  max-width: 90rem;
  margin: auto;
  width: 100%;
}
.nav__logo {
  font-family: var(--font-display);
  font-size: 20px;
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
  transition: color var(--dur-fast) var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .nav__links a:hover {
    color: var(--text-primary);
  }
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
