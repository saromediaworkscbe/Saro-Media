import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import Container from '@/components/ui/Container';
import Grid from '@/components/ui/Grid';
import Reveal from '@/components/ui/Reveal';
import Badge from '@/components/ui/Badge';
import AnimatedImage from '@/components/ui/AnimatedImage';
import ProjectHero from '@/sections/projects/ProjectHero';
import { getProjectBySlug, getNextProject } from '@/data/projects';
import { projectPath } from '@/utils/routes';
import { cursorProps } from '@/hooks/useCursor';

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/404" replace />;
  const next = getNextProject(slug);

  return (
    <>
      <Seo title={project.title} description={project.summary} />
      <ProjectHero project={project} />

      <Container className="py-section">
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <p className="font-display text-display-sm font-medium leading-snug">{project.summary}</p>
            </Reveal>
            <Reveal className="mt-8">
              <p className="text-bone-muted">{project.description}</p>
            </Reveal>
          </div>
          <aside className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="mb-4 font-mono text-label uppercase text-bone-faint">Technologies used</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </Reveal>
          </aside>
        </Grid>
      </Container>

      {/* Gallery: alternating widths, parallax on the full-width frames */}
      <Container className="space-y-6 pb-section md:space-y-10">
        {project.gallery.map((src, index) => (
          <AnimatedImage
            key={src}
            src={src}
            alt={`${project.title} — gallery image ${index + 1}`}
            ratio={index % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/3] md:aspect-[3/2]'}
            parallax={index % 3 === 0}
            className={index % 3 === 1 ? 'md:mr-auto md:w-2/3' : index % 3 === 2 ? 'md:ml-auto md:w-2/3' : ''}
          />
        ))}
      </Container>

      {/* Next project */}
      <Link
        to={projectPath(next.slug)}
        className="group block border-t border-ink-line"
        {...cursorProps('view', 'Next')}
      >
        <Container className="flex items-center justify-between gap-6 py-20 md:py-28">
          <div>
            <p className="mb-4 font-mono text-label uppercase text-bone-faint">Next project</p>
            <p className="font-display text-display-md font-medium transition-colors duration-500 group-hover:text-ember">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={40}
            className="shrink-0 text-bone-faint transition-all duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-ember"
            aria-hidden
          />
        </Container>
      </Link>
    </>
  );
};

export default ProjectDetails;
