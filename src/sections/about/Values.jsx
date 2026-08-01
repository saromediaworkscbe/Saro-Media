import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { values } from '@/data/services';
import { formatIndex } from '@/utils/helpers';

const Values = () => (
  <section className="border-t border-ink-line py-section">
    <Container>
      <SectionTitle eyebrow="How we work" title="Four rules we don't break" className="mb-16" />
      <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2">
        {values.map((value, index) => (
          <article key={value.title} className="border border-ink-line p-8">
            <p className="font-mono text-label text-ember">{formatIndex(index)}</p>
            <h3 className="mt-4 font-display text-2xl text-bone">{value.title}</h3>
            <p className="mt-3 text-bone-muted">{value.body}</p>
          </article>
        ))}
      </Reveal>
    </Container>
  </section>
);

export default Values;
