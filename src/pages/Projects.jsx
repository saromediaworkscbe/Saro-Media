import { useMemo, useState } from 'react';
import Seo from '@/components/ui/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import ProjectFilter from '@/sections/projects/ProjectFilter';
import ProjectGrid from '@/sections/projects/ProjectGrid';
import { projects } from '@/data/projects';

const Projects = () => {
  const [category, setCategory] = useState('All');

  // Memoized so MediaCards keep referential stability between renders
  const visible = useMemo(
    () => (category === 'All' ? projects : projects.filter((p) => p.category === category)),
    [category],
  );

  return (
    <>
      <Seo title="Projects" description="Selected film, branding, digital and campaign work by Aether Studio." />
      <PageHeader
        eyebrow={`Archive — ${projects.length} projects`}
        title="The work"
        description="Everything here shipped, launched, aired or sold out. Filter by discipline, or scroll the lot."
      />
      <Container className="pb-section">
        <div className="mb-14">
          <ProjectFilter active={category} onChange={setCategory} />
        </div>
        <ProjectGrid projects={visible} />
      </Container>
    </>
  );
};

export default Projects;
