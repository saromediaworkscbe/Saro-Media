/**
 * Single registration point for GSAP plugins.
 * Import gsap from here everywhere; never register plugins twice.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'expo.out', duration: 0.9 });

// Wire an existing Lenis instance into GSAP's ticker + ScrollTrigger.
// Call this once, after Lenis is instantiated (e.g. in your root layout/App).
export function connectLenis(lenis) {
  if (!lenis) return;

  // Tell ScrollTrigger about every Lenis scroll tick
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker instead of its own rAF loop,
  // so both stay perfectly frame-synced
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Tell ScrollTrigger to use Lenis's scroll position/methods
  // instead of native window scroll
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => lenis.resize());
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };