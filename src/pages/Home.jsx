import Seo from '@/components/ui/Seo';
import Hero from '@/sections/home/Hero';
import Intro from '@/sections/home/Intro';
import ProjectsArchive from '@/sections/home/ProjectsArchive';
import Services from '@/sections/home/Services';
import ReviewsPreview from '@/sections/home/ReviewsPreview';
import PackagesPreview from '@/sections/home/PackagesPreview';
import Terms from '@/sections/packages/Terms';
import CtaBanner from '@/sections/home/CtaBanner';

const Home = () => (
  <>
    <Seo description="Saro is a media & creative agency making films, brands and digital experiences. Twelve projects a year, each one built to be remembered." />
    <Hero />
    <Intro />
    <ProjectsArchive />
    <Services />
    <PackagesPreview />
    <Terms />
    {/* <ReviewsPreview /> */}
    <CtaBanner />
  </>
);

export default Home;