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
  if (!lenis) return undefined;

  const onScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', onScroll);

  const tick = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const onRefresh = () => {
    lenis.resize();
  };
  ScrollTrigger.addEventListener('refresh', onRefresh);

  return () => {
    lenis.off('scroll', onScroll);
    gsap.ticker.remove(tick);
    ScrollTrigger.removeEventListener('refresh', onRefresh);
  };
}

export { gsap, ScrollTrigger };