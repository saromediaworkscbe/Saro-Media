import Seo from '@/components/ui/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import PricingCard from '@/components/ui/PricingCard';
import Comparison from '@/sections/packages/Comparison';
import Terms from '@/sections/packages/Terms';
import Faq from '@/sections/packages/Faq';
import CtaBanner from '@/sections/home/CtaBanner';
import { packages } from '@/data/packages';

const Packages = () => (
  <>
    <Seo title="Packages" description="Fixed, honest pricing for films, identities and digital work. Three packages, no black boxes." />
    <PageHeader
      eyebrow="Packages"
      title="Our Packages"
      description=""
    />
    <Container className="pb-section">
      <Reveal stagger={0.1} className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} />
        ))}
      </Reveal>
    </Container>
    <Comparison />
    <Terms />
    <Faq />
    <CtaBanner />
  </>
);

export default Packages;
