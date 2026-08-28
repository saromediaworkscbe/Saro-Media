import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { connectLenis } from '@/animations/gsapSetup';
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    const disconnect = connectLenis(lenis);

    return () => {
      if (disconnect) disconnect();
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  return lenisRef;
};
