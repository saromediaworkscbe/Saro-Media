import { gsap } from '@/animations/gsapSetup';

/**
 * Parallax an inner image inside an overflow-hidden frame.
 * The image should be ~120% tall so movement never shows edges.
 */
export const parallaxImage = (image, trigger, amount = 12) =>
  gsap.fromTo(
    image,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );

/** Scale an image from oversized to natural as it scrolls into view. */
export const scaleOnScroll = (image, trigger) =>
  gsap.fromTo(
    image,
    { scale: 1.25 },
    {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'top 20%', scrub: true },
    },
  );
