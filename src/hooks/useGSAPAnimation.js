import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';

/**
 * Re-export point so feature code imports animation tooling from hooks/,
 * keeping gsap plugin registration behind a single module boundary.
 */
export { useGSAP, gsap };
