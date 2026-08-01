import { gsap } from '@/animations/gsapSetup';

/**
 * Reveal split lines from below their mask.
 * Expects SplitType output with `.line` wrappers inside a `.line-mask` parent.
 */
export const revealLines = (lines, { delay = 0, stagger = 0.08, scrollTrigger } = {}) =>
  gsap.fromTo(
    lines,
    { yPercent: 110 },
    { yPercent: 0, duration: 1.1, stagger, delay, ease: 'expo.out', scrollTrigger },
  );

/** Character cascade for hero headlines. */
export const revealChars = (chars, { delay = 0, stagger = 0.02, scrollTrigger } = {}) =>
  gsap.fromTo(
    chars,
    { yPercent: 120, rotate: 4 },
    { yPercent: 0, rotate: 0, duration: 1, stagger, delay, ease: 'expo.out', scrollTrigger },
  );

/** Word-by-word fade-up, softer than char animation — for paragraphs. */
export const revealWords = (words, { delay = 0, stagger = 0.03, scrollTrigger } = {}) =>
  gsap.fromTo(
    words,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger, delay, ease: 'power3.out', scrollTrigger },
  );
