import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/animations/gsapSetup';
import { useIsDesktop, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Custom cursor follower. A small dot tracks the pointer directly; the
 * outer ring eases behind it with gsap.quickTo. Elements opt into states
 * via data-cursor / data-cursor-label (see hooks/useCursor).
 * Renders nothing on touch devices or under reduced motion.
 */
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = isDesktop && !reducedMotion;

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }
    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      const variant = target?.dataset.cursor;
      setLabel(target?.dataset.cursorLabel ?? '');
      gsap.to(ring, {
        scale: variant === 'view' ? 3.2 : variant === 'hover' ? 1.6 : 1,
        backgroundColor: variant === 'view' ? 'rgba(255,107,0,0.95)' : 'rgba(255,107,0,0)',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: variant ? 0 : 1, duration: 0.3 });
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border border-ember/60 will-change-transform"
      >
        {label && (
          <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-ink">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-ember will-change-transform"
      />
    </div>
  );
};

export default Cursor;
