import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import { Stars } from '@/components/ui/ReviewCard';
import { ratingSummary } from '@/data/reviews';

const RatingSummary = () => (
  <section className="border-y border-ink-line bg-ink-soft py-16">
    <Container className="grid gap-12 md:grid-cols-2 md:items-center">
      <Reveal>
        <p className="font-display text-7xl font-medium text-bone md:text-8xl">
          {ratingSummary.average}
          <span className="text-ember">/5</span>
        </p>
        <Stars count={5} className="mt-4" />
        <p className="mt-3 text-sm text-bone-muted">
          Across <Counter value={ratingSummary.total} /> completed projects
        </p>
      </Reveal>
      <Reveal stagger={0.06} className="space-y-3">
        {ratingSummary.breakdown.map((row) => (
          <div key={row.stars} className="flex items-center gap-4">
            <span className="w-14 font-mono text-label text-bone-faint">{row.stars} star</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-line">
              <div
                className="h-full bg-ember"
                style={{ width: `${(row.count / ratingSummary.total) * 100}%` }}
              />
            </div>
            <span className="w-8 text-right font-mono text-label text-bone-muted">{row.count}</span>
          </div>
        ))}
      </Reveal>
    </Container>
  </section>
);

export default RatingSummary;
