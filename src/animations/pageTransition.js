/**
 * Route transition variants (Framer Motion).
 *
 * Rationale: GSAP drives everything scroll- and cursor-related, but route
 * mount/unmount choreography is exactly what AnimatePresence exists for —
 * doing this in GSAP means fighting the router for unmount timing.
 * The visual language (masked wipe + eased settle) matches the GSAP work.
 */
export const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } },
};

export const curtainVariants = {
  initial: { scaleY: 1 },
  enter: { scaleY: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
  exit: { scaleY: 1, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
};
