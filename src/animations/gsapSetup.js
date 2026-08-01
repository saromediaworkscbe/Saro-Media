/**
 * Single registration point for GSAP plugins.
 * Import gsap from here everywhere; never register plugins twice.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'expo.out', duration: 0.9 });

export { gsap, ScrollTrigger };
