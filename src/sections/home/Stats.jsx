import Container from '@/components/ui/Container';
import Counter from '@/components/ui/Counter';
import Reveal from '@/components/ui/Reveal';
import { stats } from '@/data/services';

/** Numbers counter band. */
const Stats = () => (
  <section className="border-y border-ink-line bg-ink-soft">
    <Container>
      <Reveal
        variant="scale"
        stagger={0.1}
        className="grid grid-cols-2 divide-ink-line lg:grid-cols-4 lg:divide-x"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 py-12 text-center lg:py-16">
            <p className="font-display text-5xl font-medium text-bone md:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 font-mono text-label uppercase text-bone-faint">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </Container>
  </section>
);

export default Stats;
