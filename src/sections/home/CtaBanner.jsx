import Container from '@/components/ui/Container';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Marquee from '@/components/ui/Marquee';

/** Closing CTA with an oversized marquee ribbon behind it. */
const CtaBanner = () => (
  <section className="relative overflow-hidden border-t border-ink-line py-section" id='contact'>
    <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.06]" aria-hidden>
      <Marquee duration={20}>
        <span className="whitespace-nowrap px-8 font-display text-[16vw] font-semibold uppercase leading-none">
          Saro media works - Saro media works -
        </span>
      </Marquee>
    </div>
    <Container className="relative text-center">
      <AnimatedHeading as="h2" className="mx-auto max-w-3xl font-display text-display-lg font-medium">
        Your next project starts with one call
      </AnimatedHeading>
      <Reveal delay={0.2} className="mt-10">
        <Button to="/#contact" className="mx-auto">
          Book the call
        </Button>
      </Reveal>
    </Container>
  </section>
);

export default CtaBanner;
