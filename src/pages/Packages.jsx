import Seo from '@/components/ui/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import PricingCard from '@/components/ui/PricingCard';
import Comparison from '@/sections/packages/Comparison';
import Faq from '@/sections/packages/Faq';
import CtaBanner from '@/sections/home/CtaBanner';
import { packages } from '@/data/packages';

const Packages = () => (
  <>
    <Seo title="Packages" description="Fixed, honest pricing for films, identities and digital work. Three packages, no black boxes." />
    <PageHeader
      eyebrow="Pricing"
      title="Honest numbers"
      description="Every scope is fixed before production begins and itemised to the line. Pick a starting point — a third of projects change size once we talk."
    />
    <Container className="pb-section">
      <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} />
        ))}
      </Reveal>
    </Container>
    <Comparison />
    <Faq />
    <CtaBanner />
  </>
);

export default Packages;
