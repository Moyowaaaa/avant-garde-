import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import CaseView from "./views/CaseView.vue";
import "./tokens.css";
import { coverRoute, labelForRoute, revealRoute } from "./lib/transition";
import { alignRouteScroll, initLenis } from "./lib/lenis";
import { ScrollTrigger } from "./lib/gsap";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/work/rouge-noir", redirect: "/work/aw25" },
    { path: "/work/:slug", name: "case", component: CaseView },
  ],
  scrollBehavior() {
    // The leave transition is still running, so the outgoing page is the
    // one in the document. Wait until the incoming view has replaced it,
    // then jump. `false` keeps the router from scrolling the old page.
    return new Promise((resolve) => {
      const started = performance.now();
      const attempt = () => {
        const aligned = alignRouteScroll();
        if (!aligned && performance.now() - started < 1500) {
          requestAnimationFrame(attempt);
          return;
        }
        requestAnimationFrame(() => ScrollTrigger.refresh());
        resolve(false);
      };
      attempt();
    });
  },
});


router.beforeEach(async (to, from, next) => {
  if (to.fullPath === from.fullPath) {
    next();
    return;
  }
  await coverRoute(labelForRoute(to));
  next();
});

router.afterEach(() => {
  void revealRoute().finally(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
});

const app = createApp(App);
app.use(router);

router.isReady().then(() => {
  initLenis();
  app.mount("#app");
});
