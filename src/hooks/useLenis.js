import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/animations/gsapSetup';
import { prefersReducedMotion } from '@/utils/helpers';

/**
 * Owns the single Lenis instance for the app and wires it into GSAP's
 * ticker so ScrollTrigger and smooth scroll never fight.
 */
export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.4, // was 1.15 — a little more glide so scrolling doesn't feel rushed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  return lenisRef;
};
