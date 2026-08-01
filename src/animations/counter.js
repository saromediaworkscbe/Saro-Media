import { gsap } from '@/animations/gsapSetup';

/**
 * Animate a number from 0 to `end`, writing into el.textContent.
 * Returns the tween so callers can kill it on cleanup.
 */
export const animateCounter = (el, end, { duration = 2, scrollTrigger } = {}) => {
  const state = { value: 0 };
  return gsap.to(state, {
    value: end,
    duration,
    ease: 'power2.out',
    scrollTrigger,
    onUpdate: () => {
      el.textContent = Math.round(state.value).toLocaleString();
    },
  });
};
