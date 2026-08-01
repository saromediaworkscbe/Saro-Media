import Seo from '@/components/ui/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Story from '@/sections/about/Story';
import Values from '@/sections/about/Values';
import Stats from '@/sections/home/Stats';
import CtaBanner from '@/sections/home/CtaBanner';

const About = () => (
  <>
    <Seo title="About" description="Aether is a fourteen-person media & creative studio in New York and Lisbon, founded in 2017." />
    <PageHeader
      eyebrow="Est. 2017 — NY / LIS"
      title="Small on purpose"
      description="Fourteen directors, designers and developers who'd rather make twelve unforgettable things a year than fifty forgettable ones."
    />
    <Story />
    <Values />
    <Stats />
    <CtaBanner />
  </>
);

export default About;
