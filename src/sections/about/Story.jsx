import Container from '@/components/ui/Container';
import Grid from '@/components/ui/Grid';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import AnimatedImage from '@/components/ui/AnimatedImage';
import { milestones } from '@/data/services';
import { img } from '@/utils/helpers';

const Story = () => (
  <section className="py-section">
    <Container>
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <SectionTitle eyebrow="The story" title="From a sublet to two studios" />
          <Reveal className="mt-8 space-y-5 text-bone-muted">
            <p>
              Aether started in 2017 when two film-school dropouts spent their last savings on a
              camera instead of rent. The first client paid in pizza. The second paid in cash, and
              told a friend.
            </p>
            <p>
              Nine years later we're fourteen people across New York and Lisbon — still small on
              purpose, still led by the founders, still choosing projects by one question: will we
              be proud of this in five years?
            </p>
          </Reveal>
          <div className="mt-12">
            <AnimatedImage
              src={img('photo-1522071820081-009f0129c71c', 1000)}
              alt="The Aether team working around a shared table in the studio"
              ratio="aspect-[3/2]"
              parallax
            />
          </div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <Reveal stagger={0.1} className="border-l border-ink-line">
            {milestones.map((m) => (
              <div key={m.year} className="relative py-7 pl-10">
                <span className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full bg-ember" aria-hidden />
                <p className="font-mono text-label uppercase text-ember">{m.year}</p>
                <p className="mt-2 text-bone-muted">{m.event}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Grid>
    </Container>
  </section>
);

export default Story;
