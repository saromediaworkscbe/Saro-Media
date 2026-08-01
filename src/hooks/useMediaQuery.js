import { useSyncExternalStore } from 'react';

const subscribe = (query) => (callback) => {
  const mql = window.matchMedia(query);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

/** SSR-safe media query hook built on useSyncExternalStore. */
export const useMediaQuery = (query) =>
  useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
