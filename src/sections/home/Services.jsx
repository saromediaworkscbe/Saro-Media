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
const STICKY_OFFSET_REM = 4.5; // vertical stagger per panel, in rem

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
        <div className="space-y-6">
          {services.map((service, index) => (
            <article
              key={service.id}
              data-service-panel
              style={{
                top: `${6 + index * STICKY_OFFSET_REM}rem`,
                zIndex: index + 1,
              }}
              className="sticky border border-ink-line bg-ink-soft p-8 shadow-xl will-change-transform md:p-12"
            >
              <div className="grid gap-8 md:grid-cols-12">
                <p className="font-mono text-label text-ember md:col-span-1">{formatIndex(index)}</p>
                <h3 className="font-display text-display-sm font-medium md:col-span-5">
                  {service.title}
                </h3>
                <div className="md:col-span-6">
                  <p className="text-bone-muted">{service.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
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