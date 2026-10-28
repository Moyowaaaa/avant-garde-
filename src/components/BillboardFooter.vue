<template>
  <footer id="contact" class="billboard" tabindex="-1">
    <div class="billboard__ticker">
      <span>AVAILABLE WORLDWIDE — FW26</span>
      <span>BOOK A SHOOT ●</span>
      <span>PARIS / TOKYO / NEW YORK ●</span>
    </div>
    <div class="billboard__middle">
      <span class="billboard__kicker" data-reveal
        >● NOW BOOKING — FW26 / SS27</span
      >
      <a
        class="billboard__cta"
        data-reveal
        aria-label="Let's create something — email the studio"
      >
        <h2 class="billboard__line">
          <span class="billboard__word">LET'S</span>
          <span class="billboard__word">CREATE</span>
        </h2>
        <span class="billboard__row">
          <em class="billboard__line billboard__line--italic">
            <span class="billboard__word">SOMETHING</span>
          </em>
          <span class="billboard__arrow" aria-hidden="true">↗</span>
        </span>
      </a>
    </div>
    <div class="billboard__meta">
      <span class="billboard__copy">©2026 MIRA VOLKOV</span>
      <nav class="billboard__socials" aria-label="Social">
        <a
          class="billboard__social"
          href="https://instagram.com"
          target="_blank"
          rel="noopener"
          >INSTAGRAM</a
        >
        <span class="billboard__sep" aria-hidden="true">/</span>
        <a
          class="billboard__social"
          href="https://behance.net"
          target="_blank"
          rel="noopener"
          >BEHANCE</a
        >
        <span class="billboard__sep" aria-hidden="true">/</span>
        <a
          class="billboard__social"
          href="https://are.na"
          target="_blank"
          rel="noopener"
          >ARENA</a
        >
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.billboard {
  display: flex;
  flex-direction: column;
  scroll-margin-top: 80px;
  outline: none;
  background:
    radial-gradient(
      60% 90% at 50% 110%,
      rgba(255, 59, 47, 0.28),
      transparent 60%
    ),
    radial-gradient(
      40% 60% at 80% 100%,
      rgba(201, 169, 97, 0.12),
      transparent 60%
    ),
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
  cursor: pointer;
}
.billboard__kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--accent-soft);
}
/* The whole type block is one mailto link. Each word highlights
   individually on hover; siblings dim. CSS-only, no JS. */
.billboard__cta {
  display: inline-block;
  color: inherit;
  padding: 16px 32px;
  border-radius: var(--radius-md);
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
.billboard__word {
  transition:
    color var(--dur-ui) var(--ease-out),
    opacity var(--dur-ui) var(--ease-out);
}
.billboard__row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.billboard__arrow {
  font-size: clamp(48px, 7vw, 110px);
  color: var(--accent);
  line-height: 1;
  display: inline-block;
  transition:
    color var(--dur-fast) var(--ease-out),
    transform var(--dur-ui) var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .billboard__word:hover {
    color: var(--accent);
  }
  .billboard__cta:has(.billboard__word:hover) .billboard__word:not(:hover) {
    opacity: 0.3;
  }
  .billboard__cta:hover .billboard__arrow {
    color: #ff6a5f;
    transform: translate(10px, -10px) rotate(8deg);
  }
  .billboard__cta:active .billboard__arrow {
    transform: translate(4px, -4px) scale(0.96);
  }
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
.billboard__copy {
  transition: color var(--dur-fast) var(--ease-out);
  cursor: pointer;
}
.billboard__socials {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.billboard__social {
  display: inline-block;
  color: inherit;
  transition:
    color var(--dur-fast) var(--ease-out),
    transform var(--dur-ui) var(--ease-out);
}
.billboard__sep {
  color: var(--line);
}
@media (hover: hover) and (pointer: fine) {
  .billboard__copy:hover {
    color: var(--text-primary);
  }
  .billboard__social:hover {
    color: var(--accent);
    transform: translateY(-2px);
  }
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
