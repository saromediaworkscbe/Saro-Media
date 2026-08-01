import Seo from '@/components/ui/Seo';
import Container from '@/components/ui/Container';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

const NotFound = () => (
  <>
    <Seo title="Page not found" />
    <section className="flex min-h-svh items-center">
      <Container className="text-center">
        <Reveal delay={0.2}>
          <p className="mb-5 font-mono text-label uppercase text-ember">404 — Lost in the dark</p>
        </Reveal>
        <AnimatedHeading as="h1" split="chars" immediate delay={0.35} className="font-display text-display-xl font-medium">
          Cut. That page isn't in this edit.
        </AnimatedHeading>
        <Reveal delay={0.7} className="mt-10">
          <Button to="/" className="mx-auto">
            Back to the reel
          </Button>
        </Reveal>
      </Container>
    </section>
  </>
);

export default NotFound;
