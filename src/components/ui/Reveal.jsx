import { useScrollAnimation } from '@/hooks/useScrollTrigger';
import { gsap } from '@/animations/gsapSetup';
import { cn } from '@/utils/helpers';

// Entrance variants beyond the default fade-up, so long scroll sequences
// don't all announce themselves the same way. Each maps to a from/to pair;
// `y` still comes through as a prop so callers can tune distance/stagger.
const VARIANTS = {
  fade: (y) => ({
    from: { y, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
  }),
  clip: () => ({
    from: { clipPath: 'inset(0 0 100% 0)' },
    to: { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.inOut' },
  }),
  scale: () => ({
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out' },
  }),
  skew: (y) => ({
    from: { y, skewY: 4, opacity: 0 },
    to: { y: 0, skewY: 0, opacity: 1, duration: 1, ease: 'expo.out' },
  }),
};

/**
 * Reveal on scroll for arbitrary children. `variant="fade"` (default) is
 * the workhorse: paragraphs, cards, metadata — anything that isn't a
 * heading. Other variants (clip / scale / skew) exist to break up long
 * scroll sequences where every section entering the same way reads flat.
 */
const Reveal = ({
  as: Tag = 'div',
  y = 32,
  delay = 0,
  stagger = 0,
  variant = 'fade',
  className = '',
  children,
}) => {
  const scope = useScrollAnimation(() => {
    const targets = stagger > 0 ? scope.current.children : scope.current;
    const { from, to } = (VARIANTS[variant] || VARIANTS.fade)(y);
    gsap.fromTo(targets, from, {
      ...to,
      delay,
      stagger,
      scrollTrigger: { trigger: scope.current, start: 'top 88%' },
    });
  }, [variant]);

  return (
    <Tag ref={scope} className={cn(className)}>
      {children}
    </Tag>
  );
};

export default Reveal;
