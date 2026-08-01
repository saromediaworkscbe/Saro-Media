import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/animations/gsapSetup';
import Button from '@/components/ui/Button';
import { NAV_LINKS, SITE } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import { cursorProps } from '@/hooks/useCursor';
import { useActiveSection } from '@/hooks/useActiveSection';

const HEADER_OFFSET = 80; // matches h-20 navbar height

// The same-page nav links (Work/Reviews/About/Contact scroll to a Home
// section) — used to scroll-spy which one is currently in view.
const HASH_IDS = NAV_LINKS.filter((link) => link.to.includes('#')).map(
  (link) => link.to.split('#')[1],
);

/**
 * Navbar hides on scroll-down, returns on scroll-up (ScrollTrigger
 * direction), and gains a surface once past the hero.
 */
// Scroll distance (px) over which the header background eases from fully
// transparent to fully solid — a smooth ramp instead of a hard on/off
// switch, so it doesn't snap to solid after only a few pixels of scroll.
const BG_FADE_DISTANCE = 320;

const Navbar = () => {
  const barRef = useRef(null);
  const bgRef = useRef(null);
  const progressRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeHash = useActiveSection(HASH_IDS, location.pathname === '/');

  const isLinkActive = useCallback(
    (link, routerIsActive) =>
      link.to.includes('#') ? activeHash === link.to.split('#')[1] : routerIsActive,
    [activeHash],
  );

  useGSAP(() => {
    const showAnim = gsap
      .from(barRef.current, { yPercent: -110, paused: true, duration: 0.45, ease: 'expo.out' })
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) showAnim.play();
        else if (self.scroll() > 120) showAnim.reverse();
        gsap.set(bgRef.current, { opacity: gsap.utils.clamp(0, 1, self.scroll() / BG_FADE_DISTANCE) });
      },
    });

    // Thin progress bar along the header's bottom edge, tracking scroll
    // through the whole (now quite long, one-page) site.
    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
    });
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll while the mobile menu is open so the home page
  // content behind it can't be scrolled/peeked.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Scrolls to a hash target, retrying if the section or Lenis
  // isn't ready yet (route just changed, lazy-loaded, etc.)
  const scrollToHash = useCallback((hash, attempt = 0) => {
    const target = document.querySelector(hash);
    const lenisReady = window.lenis && typeof window.lenis.scrollTo === 'function';

    if (!target) {
      if (attempt < 25) {
        setTimeout(() => scrollToHash(hash, attempt + 1), 80);
      }
      return;
    }

    // Refresh ScrollTrigger so all pin spacers and measurements are accurate
    ScrollTrigger.refresh();

    const performScroll = () => {
      const el = document.querySelector(hash);
      if (!el) return;
      const scrollTarget = el.closest('.pin-spacer') || el;
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(scrollTarget, { offset: -HEADER_OFFSET, duration: 1.2 });
      } else {
        const top = scrollTarget.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    performScroll();

    // Second pass after layout recalculation / pinning settles
    setTimeout(() => {
      ScrollTrigger.refresh();
      performScroll();
    }, 300);
  }, []);

  const handleNavClick = useCallback(
    (to, e) => {
      closeMenu();
      if (to.includes('#')) {
        const hash = to.substring(to.indexOf('#'));
        if (location.pathname === '/') {
          e.preventDefault();
          if (location.hash === hash) {
            // Same hash as current URL — react-router won't emit a change,
            // so the effect below won't fire. Scroll directly instead.
            scrollToHash(hash);
          } else {
            // Changing the hash triggers the effect below, which scrolls.
            // Scrolling here too would race it and produce janky, doubled
            // scroll animations.
            navigate(to, { replace: false });
          }
        }
        // If on a different route, let react-router navigate normally
        // to "/#hash" — the effect below picks it up once we land on "/".
      }
    },
    [closeMenu, location.hash, location.pathname, navigate, scrollToHash],
  );

  // Handles landing on "/#hash" via a fresh navigation from another page
  // (or a hard refresh / direct link).
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      scrollToHash(location.hash);
    }
  }, [location.pathname, location.hash, scrollToHash]);

  return (
    <>
      <header ref={barRef} className="fixed inset-x-0 top-0 z-50">
        <div
          ref={bgRef}
          aria-hidden
          className="absolute inset-0 bg-ink/85 opacity-0 backdrop-blur-md"
        />
        <nav
          className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between px-gutter"
          aria-label="Main"
        >
          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-tight text-bone"
            {...cursorProps('hover')}
          >
            Saro Media<span className="text-ember">.</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={(e) => handleNavClick(link.to, e)}
                  className={({ isActive }) =>
                    cn(
                      'font-mono text-label uppercase transition-colors duration-300 hover:text-bone',
                      isLinkActive(link, isActive) ? 'text-ember' : 'text-bone-muted',
                    )
                  }
                  {...cursorProps('hover')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button to="/#contact" variant="outline" className="px-5 py-2.5 text-xs">
              Start a project
            </Button>
          </div>

          <button
            type="button"
            className="text-bone lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        <div
          ref={progressRef}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ember"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key={location.pathname}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-gutter pb-10 pt-6 lg:hidden"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            {/* The overlay sits above the header (z-100 vs z-50), covering
                it entirely — so the logo and close control live here too,
                not just on the header underneath. */}
            <div className="flex h-14 items-center justify-between">
              <Link
                to="/"
                onClick={closeMenu}
                className="font-display text-lg font-semibold tracking-tight text-bone"
                {...cursorProps('hover')}
              >
                Saro Media<span className="text-ember">.</span>
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-bone"
                {...cursorProps('hover')}
              >
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-1">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    onClick={(e) => handleNavClick(link.to, e)}
                    className={({ isActive }) =>
                      cn(
                        'font-display text-3xl font-medium xs:text-4xl',
                        isLinkActive(link, isActive) ? 'text-ember' : 'text-bone',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-ink-line pt-6">
              <a href={`mailto:${SITE.email}`} className="text-bone-muted">
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;