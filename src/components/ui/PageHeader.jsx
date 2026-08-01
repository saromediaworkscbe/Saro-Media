import Container from '@/components/ui/Container';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Reveal from '@/components/ui/Reveal';

/** Consistent opener for interior pages. */
const PageHeader = ({ eyebrow, title, description }) => (
  <header className="pb-16 pt-40 md:pb-24 md:pt-48">
    <Container>
      {eyebrow && (
        <Reveal delay={0.2}>
          <p className="mb-5 font-mono text-label uppercase text-ember">{eyebrow}</p>
        </Reveal>
      )}
      <AnimatedHeading
        as="h1"
        split="chars"
        immediate
        delay={0.35}
        className="max-w-5xl font-display text-display-lg font-medium"
      >
        {title}
      </AnimatedHeading>
      {description && (
        <Reveal delay={0.6}>
          <p className="mt-8 max-w-xl text-lg text-bone-muted">{description}</p>
        </Reveal>
      )}
    </Container>
  </header>
);

export default PageHeader;
