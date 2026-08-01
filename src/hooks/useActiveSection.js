import { useEffect, useState } from 'react';
import { ScrollTrigger } from '@/animations/gsapSetup';

/**
 * Tracks which of the given section ids is currently active, for scroll-spy
 * nav highlighting. Defaults to the first id (matches the common scroll-spy
 * convention: the top-most nav item reads as "active" by default, rather
 * than nothing being highlighted while the user is still above the first
 * tracked section — Hero + Intro alone are ~2 screens tall here, so without
 * this default nothing lights up for a long first scroll). Each section
 * activates as soon as it starts entering the upper half of the viewport,
 * not only once fully centered, so switching between short sections feels
 * immediate rather than needing to scroll each one to dead center.
 *
 * Sections may be lazy-mounted (Home is a lazy route chunk) or simply not
 * present on the page at all (some are commented out at times) — so each id
 * is watched independently: one missing id retries on its own timeout
 * instead of blocking every other id's trigger from ever being created.
 */
export const useActiveSection = (ids, enabled) => {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    if (!enabled) {
      setActiveId(ids[0] ?? null);
      return undefined;
    }

    let cancelled = false;
    const triggers = [];
    const timers = [];

    const watch = (id, attempt = 0) => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (!el) {
        if (attempt < 25) {
          timers.push(setTimeout(() => watch(id, attempt + 1), 100));
        }
        return;
      }
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => self.isActive && setActiveId(id),
        }),
      );
    };

    ids.forEach((id) => watch(id));

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      triggers.forEach((t) => t.kill());
    };
  }, [ids, enabled]);

  return activeId;
};
