import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { services } from '@/data/services';
import { formatIndex, prefersReducedMotion } from '@/utils/helpers';

/**
 * Horizontal scroll gallery of services — same pinned-track mechanism as
 * FeaturedProjects (proven working pattern in this codebase), replacing
 * the earlier sticky-stacked-panels design.
 */
const ServiceCard = ({ service, index }) => (
  <article className="flex w-[85vw] shrink-0 flex-col justify-between border border-ink-line bg-ink-soft p-6 sm:w-[60vw] sm:p-8 lg:w-[30vw] lg:p-10">
    <div>
      <p className="font-mono text-[10px] text-ember">{formatIndex(index)}</p>
      <h3 className="mt-4 font-display text-2xl font-medium leading-tight sm:text-3xl">
        {service.title}
      </h3>
      <p className="mt-4 text-sm text-bone-muted sm:text-base">{service.description}</p>
    </div>
    <div className="mt-8 flex flex-wrap gap-2 border-t border-ink-line pt-6">
      {service.deliverables.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>
  </article>
);

const Services = () => {
  const scope = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="overflow-hidden py-section">
      <Container className="mb-12">
        <SectionTitle eyebrow="What we do" title={`${services.length} disciplines, one studio`} />
      </Container>

      {/* Mobile/tablet: wrapped 2-col grid, no scroll-hijacking. lg+: horizontal pinned track. */}
      <div
        ref={trackRef}
        className="grid grid-cols-1 gap-6 px-gutter sm:grid-cols-2 lg:flex lg:w-max lg:gap-8 lg:pr-[20vw]"
      >
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
