import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import PricingCard from '@/components/ui/PricingCard';
import { packages } from '@/data/packages';

const PackagesPreview = () => (
  <section className="py-section" id="packages">
    <Container>
      <SectionTitle eyebrow="Packages" title="Three ways to work with us" className="mb-16" />
      <Reveal variant="clip" stagger={0.12} className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} />
        ))}
      </Reveal>
    </Container>
  </section>
);

export default PackagesPreview;
