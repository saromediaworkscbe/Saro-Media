import { memo, useCallback, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import Badge from '@/components/ui/Badge';
import { PROJECT_CATEGORIES } from '@/data/projects';
import { cursorProps } from '@/hooks/useCursor';
import { prefersReducedMotion } from '@/utils/helpers';

/**
 * Category filter row. Controlled component — state lives in the page.
 * A shared pill slides behind whichever button is active, so switching
 * filters reads as one indicator moving rather than each tab independently
 * swapping color.
 */
const ProjectFilter = memo(function ProjectFilter({ active, onChange }) {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const buttonRefs = useRef({});
  const isFirstRun = useRef(true);

  const positionPill = useCallback(
    (animate) => {
      const container = containerRef.current;
      const button = buttonRefs.current[active];
      const pill = pillRef.current;
      if (!container || !button || !pill) return;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const target = { x: buttonRect.left - containerRect.left, width: buttonRect.width };

      if (!animate || prefersReducedMotion()) {
        gsap.set(pill, { ...target, opacity: 1 });
        return;
      }
      gsap.to(pill, { ...target, opacity: 1, duration: 0.5, ease: 'expo.out' });
    },
    [active],
  );

  useGSAP(
    () => {
      positionPill(!isFirstRun.current);
      isFirstRun.current = false;
    },
    { scope: containerRef, dependencies: [active] },
  );

  // The buttons wrap responsively (flex-wrap), so a viewport resize or
  // orientation change can shift the active button's position without
  // `active` itself changing — re-sync the pill instantly, no animation.
  useEffect(() => {
    const onResize = () => positionPill(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [positionPill]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap gap-2"
      role="group"
      aria-label="Filter projects by category"
    >
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-0 rounded-full bg-ember opacity-0"
      />
      {PROJECT_CATEGORIES.map((category) => (
        <button
          key={category}
          ref={(el) => {
            buttonRefs.current[category] = el;
          }}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={active === category}
          className="relative"
          {...cursorProps('hover')}
        >
          <Badge active={active === category}>{category}</Badge>
        </button>
      ))}
    </div>
  );
});

export default ProjectFilter;
