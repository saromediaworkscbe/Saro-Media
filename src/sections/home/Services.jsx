import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Badge from '@/components/ui/Badge';
import { services } from '@/data/services';
import { formatIndex, prefersReducedMotion } from '@/utils/helpers';

/**
 * Stacked service panels: each panel pins briefly while the next slides
 * over it — a card-deck effect built from individual ScrollTriggers.
 */
const STICKY_OFFSET_REM = 3.25; // vertical stagger per panel, in rem

const Services = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const panels = gsap.utils.toArray('[data-service-panel]');
      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        gsap.set(panel, { transformOrigin: 'top center' });
        gsap.to(panel, {
          scale: 0.94,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: panels[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="py-section">
      <Container>
        <SectionTitle eyebrow="What we do" title="Four disciplines, one studio" className="mb-16" />
        <div className="space-y-3 sm:space-y-4">
          {services.map((service, index) => (
            <article
              key={service.id}
              data-service-panel
              style={{
                top: `${6 + index * STICKY_OFFSET_REM}rem`,
                zIndex: index + 1,
              }}
              className="sticky relative bg-ink-soft p-5 will-change-transform sm:p-6 md:p-8"
            >
              {/* Thin accent bar on the leading edge — replaces the boxed border + shadow */}
              <div className="absolute inset-y-0 left-0 w-[3px] bg-ember" />

              <div className="grid gap-x-6 gap-y-3 md:grid-cols-12">
                <p className="font-mono text-[10px] text-ember md:col-span-1">{formatIndex(index)}</p>
                <h3 className="font-display text-xl font-medium leading-tight sm:text-2xl md:col-span-5">
                  {service.title}
                </h3>
                <div className="md:col-span-6">
                  <p className="text-sm text-bone-muted">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-line pt-4">
                    {service.deliverables.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="text-sm text-bone-faint">
            Scopes are fixed before production begins — see{' '}
            <a href="/packages" className="text-bone-muted underline underline-offset-4 hover:text-ember">
              packages
            </a>{' '}
            for how we price.
          </p>
        </Reveal>
      </Container>
    </section>
  );
};

export default Services;