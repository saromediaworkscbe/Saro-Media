import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { services } from '@/data/services';
import { formatIndex, prefersReducedMotion } from '@/utils/helpers';

/**
 * Services section:
 * - Mobile & Tablet (< 1024px): Horizontal touch-scrollable carousel with snap points.
 * - Desktop (>= 1024px): Pinned horizontal scroll track powered by GSAP ScrollTrigger.
 */
const ServiceCard = ({ service, index }) => (
  <article className="flex h-full w-full flex-col justify-between border border-ink-line bg-ink-soft p-6 sm:p-8 lg:p-10 transition-colors duration-300 hover:border-ember/40">
    <div>
      <p className="font-mono text-[10px] text-ember">{formatIndex(index)}</p>
      <h3 className="mt-4 font-display text-xl font-medium leading-tight sm:text-2xl lg:text-3xl text-bone">
        {service.title}
      </h3>
      <p className="mt-4 text-sm text-bone-muted leading-relaxed sm:text-base">{service.description}</p>
    </div>
    <div className="mt-8 flex flex-wrap gap-2 border-t border-ink-line/60 pt-6">
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
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
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
      <Container className="mb-8 sm:mb-14">
        <SectionTitle eyebrow="What we do" title={`${services.length} disciplines, one studio`} />
      </Container>

      {/* Mobile & Tablet layout (< 1024px): Horizontal touch-scrollable swipe carousel */}
      <div className="lg:hidden">
        <div
          data-lenis-prevent
          className="flex gap-4 overflow-x-auto pb-6 pt-2 px-5 sm:px-8 snap-x snap-mandatory no-scrollbar scrollbar-none"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="w-[82vw] max-w-[340px] shrink-0 snap-center sm:w-[360px]"
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop layout (>= 1024px): Pinned horizontal scroll track */}
      <div className="hidden lg:block">
        <div
          ref={trackRef}
          className="flex w-max gap-8 px-8 xl:px-16 pr-[20vw]"
        >
          {services.map((service, index) => (
            <div key={service.id} className="w-[380px] xl:w-[420px] shrink-0">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
