import { useSplitText } from '@/hooks/useSplitText';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { prefersReducedMotion } from '@/utils/helpers';

/**
 * Agency introduction — word-by-word color reveal scrubbed to scroll,
 * the classic "reading light" effect.
 */
const Intro = () => {
  const { elementRef } = useSplitText('words', (split, el) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      split.words,
      { color: '#2A2A2A' },
      {
        color: '#F5F5F5',
        stagger: 0.4,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true },
      },
    );
  });

  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <p className="mb-8 font-mono text-label uppercase text-ember">The studio</p>
        </Reveal>
        <p
          ref={elementRef}
          className="max-w-6xl font-display sm:text-[18px] md:text-[22px] lg:text-[38px] font-medium leading-snug "
        >
         Saro Media Works is a creative media production company passionate about turning real moments into unforgettable memories. We specialize in premium wedding photography, cinematic wedding films, commercial photography, brand videos, corporate events, fashion shoots, and creative visual storytelling.
        </p>
      </Container>
    </section>
  );
};

export default Intro;
