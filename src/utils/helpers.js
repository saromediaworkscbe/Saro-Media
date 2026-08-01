export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const lerp = (start, end, amount) => start + (end - start) * amount;

export const formatIndex = (index) => String(index + 1).padStart(2, '0');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Unsplash source helper — swap for your own CDN in production.
 * Keeps image URLs in one place so optimization is a one-file change.
 */
export const img = (id, w = 1600, q = 75) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
