import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Story from '@/sections/about/Story';
import Values from '@/sections/about/Values';

/** About, folded into the one-page flow: same content as the old /about page, minus its full-page header. */
const AboutSection = () => (
  <section id="about" className="border-t border-ink-line pt-section">
    <Container>
      <SectionTitle eyebrow="Est. 2017 — NY / LIS" title="Small on purpose" />
      <Reveal delay={0.2} className="mt-6 max-w-xl">
        <p className="text-lg text-bone-muted">
          Fourteen directors, designers and developers who&apos;d rather make twelve unforgettable
          things a year than fifty forgettable ones.
        </p>
      </Reveal>
    </Container>
    <Story />
    <Values />
  </section>
);

export default AboutSection;
