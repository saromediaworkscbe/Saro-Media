import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import PricingCard from '@/components/ui/PricingCard';
import { packages } from '@/data/packages';

const PackagesPreview = () => (
  <section className="py-section" id="packages">
    <Container>
      <SectionTitle eyebrow="Packages" title="Four ways to work with us" className="mb-14" />
      <Reveal variant="clip" stagger={0.1} className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} />
        ))}
      </Reveal>
    </Container>
  </section>
);

export default PackagesPreview;
