import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from '@/animations/gsapSetup';

/**
 * Thin wrapper over useGSAP scoped to a container ref.
 * Everything created inside `callback` (tweens, ScrollTriggers) is
 * reverted automatically on unmount — no manual cleanup in components.
 */
export const useScrollAnimation = (callback, deps = []) => {
  const scope = useRef(null);
  useGSAP(callback, { scope, dependencies: deps });
  return scope;
};

/** Refresh ScrollTrigger after layout-shifting async work (images, fonts). */
export const refreshScrollTrigger = () => ScrollTrigger.refresh();
