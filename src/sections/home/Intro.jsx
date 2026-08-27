import { useSplitText } from '@/hooks/useSplitText';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import Grid from '@/components/ui/Grid';
import Reveal from '@/components/ui/Reveal';
import AnimatedImage from '@/components/ui/AnimatedImage';
import { prefersReducedMotion } from '@/utils/helpers';
import introImg from '@/assets/images/img-2.jpg';

/**
 * Agency introduction — word-by-word color reveal scrubbed to scroll,
 * the classic "reading light" effect, paired with a supporting photo
 * instead of a single full-width paragraph.
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
        <Grid className="items-center">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Reveal>
              <p className="mb-8 font-mono text-label uppercase text-ember">The studio</p>
            </Reveal>
            <p
              ref={elementRef}
              className="max-w-2xl font-display sm:text-[18px] md:text-[22px] lg:text-[32px] font-medium leading-snug"
            >
              Saro Media Works is a creative media production company passionate about turning
              real moments into unforgettable memories. We specialize in premium wedding
              photography, cinematic wedding films, commercial photography, brand videos,
              corporate events, fashion shoots, and creative visual storytelling.
            </p>
          </div>
          <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <AnimatedImage
              src={introImg}
              alt="Behind the scenes at a Saro Media Works shoot"
              ratio="aspect-[4/5]"
              parallax
            />
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default Intro;
