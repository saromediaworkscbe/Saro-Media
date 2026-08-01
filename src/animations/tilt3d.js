import { gsap } from '@/animations/gsapSetup';

/**
 * Pointer-driven 3D tilt. `container` receives the CSS perspective and owns
 * the pointer listeners; `target` (usually a direct child that fills it) is
 * what actually rotates + lifts on translateZ. Returns a cleanup function —
 * pass it straight back from a useGSAP callback to have it revert on unmount.
 */
export const attachTilt = (container, target, { max = 8, lift = 24, perspective = 1000 } = {}) => {
  gsap.set(container, { perspective });
  gsap.set(target, { transformStyle: 'preserve-3d' });

  const rotateX = gsap.quickTo(target, 'rotateX', { duration: 0.6, ease: 'power3.out' });
  const rotateY = gsap.quickTo(target, 'rotateY', { duration: 0.6, ease: 'power3.out' });
  const z = gsap.quickTo(target, 'z', { duration: 0.6, ease: 'power3.out' });

  const onMove = (e) => {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY(px * max * 2);
    rotateX(-py * max * 2);
    z(lift);
  };
  const onLeave = () => {
    rotateX(0);
    rotateY(0);
    z(0);
  };

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    gsap.set(target, { clearProps: 'transform' });
  };
};
