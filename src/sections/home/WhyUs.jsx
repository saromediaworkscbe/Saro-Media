import Container from '@/components/ui/Container';
import Grid from '@/components/ui/Grid';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import AnimatedImage from '@/components/ui/AnimatedImage';
import { values } from '@/data/services';
import { img } from '@/utils/helpers';

const WhyUs = () => (
  <section className="py-section">
    <Container>
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <SectionTitle eyebrow="Why Aether" title="Twelve projects a year. On purpose." />
          <Reveal className="mt-8">
            <p className="max-w-md text-bone-muted">
              Scarcity isn't a marketing line — it's the operating model. A small slate means the
              founders are in every review, and nothing ships that we wouldn't put in the reel.
            </p>
          </Reveal>
          <div className="mt-12 hidden lg:block">
            <AnimatedImage
              src={img('photo-1524749292158-7540c2494485', 1000)}
              alt="Director reviewing footage on a monitor in a dark studio"
              ratio="aspect-[4/5]"
              parallax
            />
          </div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <Reveal stagger={0.12} className="divide-y divide-ink-line border-y border-ink-line">
            {values.map((value) => (
              <div key={value.title} className="py-8">
                <h3 className="font-display text-2xl text-bone">{value.title}</h3>
                <p className="mt-3 max-w-lg text-bone-muted">{value.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Grid>
    </Container>
  </section>
);

export default WhyUs;
