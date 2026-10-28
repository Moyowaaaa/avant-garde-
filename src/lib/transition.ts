import { nextTick, reactive } from "vue";
import type { RouteLocationNormalized } from "vue-router";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./motion";
import { alignRouteScroll, getLenis } from "./lenis";
import { cases } from "../data/works";

export interface RouteLabel {
  eyebrow: string;
  title: string;
}

/** Label shown on the curtain. `visible` enables pointer events while it covers. */
export const curtainState = reactive({
  visible: false,
  eyebrow: "",
  title: "",
});

let panel: HTMLElement | null = null;
let covering = false;
/** Setups deferred while the curtain covers the screen (flushed as it lifts). */
const revealWaiters = new Set<() => void>();

export function isCovering(): boolean {
  return covering;
}

/** Run `cb` once the curtain starts lifting (or immediately if uncovered). */
export function onRevealDone(cb: () => void): () => void {
  if (!covering) {
    cb();
    return () => undefined;
  }
  revealWaiters.add(cb);
  return () => {
    revealWaiters.delete(cb);
  };
}

export function registerCurtain(el: HTMLElement): void {
  panel = el;
  // CSS parks the panel with `top: 100%`. Keep GSAP's pixel `y` at 0 so a
  // stylesheet transform is never parsed in and stacked on yPercent.
  gsap.set(el, { y: 0, yPercent: 0 });
}

export function unregisterCurtain(el: HTMLElement): void {
  if (panel === el) panel = null;
}

function flushWaiters(): void {
  revealWaiters.forEach((cb) => {
    try {
      cb();
    } catch {
      // A deferred setup must never break the reveal.
    }
  });
  revealWaiters.clear();
}

function withTimeout(promise: Promise<void>, ms: number): Promise<void> {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    }),
  ]);
}

export function labelForRoute(route: RouteLocationNormalized): RouteLabel {
  const param = route.params.slug;
  const slug = Array.isArray(param) ? param[0] : param;
  if (route.name === "case" && slug && cases[slug]) {
    return { eyebrow: cases[slug].tag, title: cases[slug].title };
  }
  return { eyebrow: "MIRA VOLKOV — PORTFOLIO", title: "Avant-Garde" };
}

/**
 * Slide the curtain up over the current page with the destination label.
 * Resolves once covered — the router guard awaits this before navigating.
 * Skips when the app is not mounted yet (the initial navigation) and under
 * reduced motion. Times out after 2.5s so a stuck tween cannot block the route.
 */
export async function coverRoute(label: RouteLabel): Promise<void> {
  const el = panel;
  if (prefersReducedMotion() || !el) return;
  getLenis()?.stop();
  covering = true;
  curtainState.eyebrow = label.eyebrow;
  curtainState.title = label.title;
  curtainState.visible = true;
  await nextTick();
  gsap.killTweensOf(el);
  const line = el.querySelector<HTMLElement>(".curtain__line");
  const kicker = el.querySelector<HTMLElement>(".curtain__eyebrow");
  const bar = el.querySelector<HTMLElement>(".curtain__fill");
  if (line) gsap.killTweensOf(line);
  if (kicker) gsap.killTweensOf(kicker);
  if (bar) gsap.killTweensOf(bar);
  try {
    await withTimeout(
      new Promise<void>((resolve) => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.inOut" },
          onComplete: () => resolve(),
        });
        // Full-viewport travel. Ease-in-out because the panel is moving
        // across the screen, not entering from rest.
        tl.fromTo(
          el,
          { y: 0, yPercent: 0 },
          { y: 0, yPercent: -100, duration: 0.3 },
        );
        if (bar)
          tl.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.55, ease: "power2.inOut" },
            0,
          );
        if (kicker) {
          tl.fromTo(
            kicker,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
            0.22,
          );
        }
        if (line) {
          tl.fromTo(
            line,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.5, ease: "power3.out" },
            0.2,
          );
        }
      }),
      2500,
    );
  } catch {
    // Fall through — navigation must proceed.
  }
}

/**
 * Lift the curtain to reveal the incoming page. Deferred view setups
 * (via useGsapScope) start as the lift begins, so entrances play
 * choreographed with the reveal rather than behind the curtain.
 */
export async function revealRoute(): Promise<void> {
  const lenis = getLenis();
  const el = panel;
  if (prefersReducedMotion() || !el || !curtainState.visible) {
    covering = false;
    curtainState.visible = false;
    flushWaiters();
    alignRouteScroll();
    lenis?.start();
    // start() drops `overflow: hidden`. Repeat the jump in case the
    // browser restores the offset from before the curtain stopped Lenis.
    requestAnimationFrame(() => alignRouteScroll());
    return;
  }
  try {
    await withTimeout(
      new Promise<void>((resolve) => {
        gsap
          .timeline({
            // Hold while the incoming view mounts underneath, still covered.
            delay: 0.28,
            onStart: () => {
              // The incoming view is mounted under the curtain. Jump before
              // entrances are created so they measure the resting scroll.
              alignRouteScroll();
              covering = false;
              flushWaiters();
              ScrollTrigger.refresh();
            },
            onComplete: () => resolve(),
          })
          .to(el, {
            y: 0,
            yPercent: -200,
            duration: 0.65,
            ease: "power4.inOut",
          });
      }),
      2500,
    );
  } catch {
    // Fall through — the curtain must clear.
  }
  covering = false;
  curtainState.visible = false;
  flushWaiters();
  // Drop the inline transform so `top: 100%` is the only parked offset.
  gsap.set(el, { y: 0, yPercent: 0, clearProps: "transform" });
  alignRouteScroll();
  lenis?.start();
  requestAnimationFrame(() => alignRouteScroll());
}
