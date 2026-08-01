import Container from '@/components/ui/Container';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import AnimatedImage from '@/components/ui/AnimatedImage';
import Reveal from '@/components/ui/Reveal';

/** Detail page opener: title, meta columns, then a full-bleed scaling hero image. */
const ProjectHero = ({ project }) => (
  <header className="pt-40 md:pt-48">
    <Container>
      <Reveal delay={0.2}>
        <p className="mb-5 font-mono text-label uppercase text-ember">
          {project.category} — {project.year}
        </p>
      </Reveal>
      <AnimatedHeading
        as="h1"
        split="chars"
        immediate
        delay={0.35}
        className="font-display text-display-lg font-medium"
      >
        {project.title}
      </AnimatedHeading>

      <Reveal delay={0.55} className="mt-12 grid gap-8 border-t border-ink-line pt-8 md:grid-cols-3">
        <div>
          <p className="mb-2 font-mono text-label uppercase text-bone-faint">Client</p>
          <p className="text-bone-muted">{project.client}</p>
        </div>
        <div>
          <p className="mb-2 font-mono text-label uppercase text-bone-faint">Services</p>
          <p className="text-bone-muted">{project.services.join(', ')}</p>
        </div>
        <div>
          <p className="mb-2 font-mono text-label uppercase text-bone-faint">Result</p>
          <p className="text-bone-muted">
            {project.accentStat.value}
            {project.accentStat.suffix} {project.accentStat.label}
          </p>
        </div>
      </Reveal>
    </Container>

    <div className="mt-14 px-gutter">
      <AnimatedImage
        src={project.cover}
        alt={`${project.title} — hero still`}
        ratio="aspect-[16/9] md:aspect-[21/9]"
        scale
        eager
        className="mx-auto max-w-[1600px]"
      />
    </div>
  </header>
);

export default ProjectHero;
