import { useMemo, useState } from 'react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import ProjectFilter from '@/sections/projects/ProjectFilter';
import ProjectGrid from '@/sections/projects/ProjectGrid';
import { projects } from '@/data/projects';

/** Full filterable archive, folded into the one-page flow (was the /projects page). */
const ProjectsArchive = () => {
  const [category, setCategory] = useState('All');

  const visible = useMemo(
    () => (category === 'All' ? projects : projects.filter((p) => p.category === category)),
    [category],
  );

  return (
    <section id="projects" className="border-t border-ink-line py-section">
      <Container>
        <SectionTitle eyebrow={`Archive — ${projects.length} projects`} title="The full archive" />
        <Reveal delay={0.2} className="mt-6 max-w-xl">
          <p className="text-lg text-bone-muted">
            Everything here shipped, launched, aired or sold out. Filter by discipline, or scroll the lot.
          </p>
        </Reveal>
        <div className="mb-14 mt-12">
          <ProjectFilter active={category} onChange={setCategory} />
        </div>
        <ProjectGrid projects={visible} />
      </Container>
    </section>
  );
};

export default ProjectsArchive;
