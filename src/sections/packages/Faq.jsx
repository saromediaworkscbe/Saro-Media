import Container from '@/components/ui/Container';
import Grid from '@/components/ui/Grid';
import SectionTitle from '@/components/ui/SectionTitle';
import Accordion from '@/components/ui/Accordion';
import { faqs } from '@/data/packages';

const Faq = () => (
  <section className="py-section">
    <Container>
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionTitle eyebrow="FAQ" title="Before you ask" />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </div>
      </Grid>
    </Container>
  </section>
);

export default Faq;
