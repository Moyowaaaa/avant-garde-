<script setup lang="ts">
/**
 * Billboard footer — the ember shader from the pen design is replaced
 * with a lightweight CSS radial-gradient + animated grain so the
 * component ships with zero WebGL dependency. Swap in a canvas/GL
 * component later if you need the exact shader look.
 */
</script>

<template>
  <footer class="billboard">
    <div class="billboard__ticker">
      <span>AVAILABLE WORLDWIDE — FW26</span>
      <span>BOOK A SHOOT ●</span>
      <span>PARIS / TOKYO / NEW YORK ●</span>
    </div>
    <div class="billboard__middle">
      <span class="billboard__kicker">● NOW BOOKING — FW26 / SS27</span>
      <h2 class="billboard__line">LET'S CREATE</h2>
      <div class="billboard__row">
        <em class="billboard__line billboard__line--italic">SOMETHING</em>
        <span class="billboard__arrow" aria-hidden="true">↗</span>
      </div>
      <a class="billboard__email" href="mailto:studio@miravolkov.com">STUDIO@MIRAVOLKOV.COM</a>
    </div>
    <div class="billboard__meta">
      <span>©2026 MIRA VOLKOV</span>
      <span class="billboard__proto">PROTOTYPE — TEXT DRIFTS ON HOVER ●</span>
      <span>INSTAGRAM / BEHANCE / ARENA</span>
    </div>
  </footer>
</template>

<style scoped>
.billboard {
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(60% 90% at 50% 110%, rgba(255, 59, 47, 0.28), transparent 60%),
    radial-gradient(40% 60% at 80% 100%, rgba(201, 169, 97, 0.12), transparent 60%),
    var(--bg);
}
.billboard__ticker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  height: 44px;
  background: var(--accent);
  color: #0a0a0a;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  overflow: hidden;
  white-space: nowrap;
}
.billboard__middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 560px;
  padding: 48px var(--pad-page);
  text-align: center;
}
.billboard__kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--accent-soft);
}
.billboard__line {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(56px, 11vw, 170px);
  font-weight: 700;
  line-height: 0.95;
}
.billboard__line--italic {
  font-style: italic;
}
.billboard__row {
  display: flex;
  align-items: center;
  gap: 32px;
}
.billboard__arrow {
  font-size: clamp(48px, 7vw, 110px);
  color: var(--accent);
  line-height: 1;
}
.billboard__email {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 2px;
  margin-top: 16px;
}
.billboard__email:hover {
  color: var(--accent);
}
.billboard__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px var(--pad-page);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--text-secondary);
}
.billboard__proto {
  color: var(--accent);
}
@media (max-width: 900px) {
  .billboard__ticker {
    gap: 20px;
    font-size: 9px;
  }
  .billboard__row {
    gap: 16px;
  }
  .billboard__meta {
    flex-direction: column;
  }
}
</style>
