import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollTrigger';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { NAV_LINKS, SITE } from '@/utils/constants';
import { prefersReducedMotion } from '@/utils/helpers';
import Contact from '@/sections/home/Contact';

/**
 * Footer reveal: the footer sits beneath the page (negative margin trick
 * replaced by a translate reveal) and slides into place as the page ends.
 */
const Footer = () => {
  const scope = useScrollAnimation(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      '[data-footer-inner]',
      { yPercent: -28 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      },
    );
  });

  return (
    <footer ref={scope} className="overflow-hidden border-t border-ink-line bg-ink">
      <div data-footer-inner>
        <Container className="pb-10 pt-20 md:pt-28">
          <Contact/>

          <div className="grid gap-10 border-ink-line  sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-lg font-semibold">
                Saro<span className="text-ember">.</span>
              </p>
              <p className="mt-3 max-w-56 text-sm text-bone-muted">{SITE.tagline}</p>
            </div>
            <nav aria-label="Footer">
              <p className="mb-4 font-mono text-label uppercase text-bone-faint">Sitemap</p>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-bone-muted transition-colors hover:text-bone">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-4 font-mono text-label uppercase text-bone-faint">Socials</p>
              <ul className="space-y-2">
                {SITE.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-bone-muted transition-colors hover:text-bone"
                    >
                      {social.label}
                      <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-label uppercase text-bone-faint">Studio</p>
              <address className="text-sm not-italic leading-relaxed text-bone-muted">
                {SITE.address}
                <br />
                <a href={`mailto:${SITE.email}`} className="mt-2 inline-block hover:text-bone">
                  {SITE.email}
                </a>
              </address>
            </div>
          </div>

          <p className="mt-16 border-t border-ink-line pt-6 font-mono text-label uppercase text-bone-faint">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
