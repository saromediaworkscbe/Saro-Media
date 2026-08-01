import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { featuredProjects } from '@/data/projects';
import { prefersReducedMotion } from '@/utils/helpers';
import { attachTilt } from '@/animations/tilt3d';
import { useIsDesktop } from '@/hooks/useMediaQuery';

/**
 * Horizontal scroll gallery: the section pins and a track of project
 * cards scrubs sideways. Each card shows its cover image by default;
 * on hover it reveals a 2x2 collage of that project's 4 images.
 * Clicking any image (cover or quadrant) opens it in a lightbox.
 */

const COLLAGE = [
  'lg:w-[36vw] lg:aspect-[4/3] lg:mt-0',
  'lg:w-[26vw] lg:aspect-[4/3] lg:mt-[14vh]',
  'lg:w-[32vw] lg:aspect-[4/3] lg:mt-[4vh]',
  'lg:w-[28vw] lg:aspect-[4/3] lg:mt-[18vh]',
];

// Each project → up to 4 images (cover + first 3 gallery shots), padded if short.
const projectGroups = featuredProjects.map((project) => {
  const raw = [project.cover, ...project.gallery].slice(0, 4);
  while (raw.length < 4) raw.push(raw[raw.length - 1]);
  return {
    title: project.title,
    year: project.year,
    images: raw.map((src, i) => ({
      src,
      alt: i === 0 ? project.title : `${project.title} — detail ${i}`,
    })),
  };
});

const QUADRANT = [
  'top-0 left-0',
  'top-0 right-0',
  'bottom-0 left-0',
  'bottom-0 right-0',
];

/** Fullscreen lightbox rendered into <body> so ScrollTrigger's
 *  pin transforms can't break its fixed positioning. */
const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 lg:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white lg:right-8 lg:top-8"
      >
        &times;
      </button>
      <figure className="m-0 max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] max-w-full object-contain"
        />
      </figure>
    </div>,
    document.body,
  );
};

/** One project card: cover fades out on hover to reveal a 2x2 collage.
 *  The inner layer tilts toward the cursor in 3D; the outer div keeps the
 *  aspect-ratio sizing + overflow clip so the tilt never breaks layout. */
const ProjectCard = ({ group, className, onOpen }) => {
  const wrapRef = useRef(null);
  const tiltRef = useRef(null);
  const isDesktop = useIsDesktop();

  useGSAP(
    () => {
      if (prefersReducedMotion() || !isDesktop) return;
      return attachTilt(wrapRef.current, tiltRef.current);
    },
    { scope: wrapRef, dependencies: [isDesktop] },
  );

  return (
    <div ref={wrapRef} className={`group relative shrink-0 overflow-hidden ${className}`}>
      <div ref={tiltRef} className="absolute inset-0">
        {/* 2x2 collage — always mounted underneath */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
          {group.images.map((image, i) => (
            <button
              key={image.alt}
              type="button"
              onClick={() => onOpen(image)}
              aria-label={`View ${image.alt} fullscreen`}
              className="relative cursor-zoom-in overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {/* Cover overlay — sits on top, fades out on hover to reveal collage */}
        <button
          type="button"
          onClick={() => onOpen(group.images[0])}
          aria-label={`View ${group.title} fullscreen`}
          className="absolute inset-0 z-10 cursor-zoom-in overflow-hidden opacity-100 transition-opacity duration-500 ease-out group-hover:pointer-events-none group-hover:opacity-0"
        >
          <img
            src={group.images[0].src}
            alt={group.images[0].alt}
            draggable={false}
            className="h-full w-full object-cover"
          />
        </button>

        {/* Caption — visible over cover, fades with it */}
        <div className="absolute bottom-3 left-3 z-20 bg-black/60 px-2 py-1 text-xs uppercase tracking-widest text-white opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0">
          {group.title} · {group.year}
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const scope = useRef(null);
  const trackRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section  ref={scope}
      id="featured-projects"
      data-pin-target
      className="overflow-hidden py-section">
      <Container className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionTitle eyebrow="Selected work — 2024/26" title="Featured projects" />
        <Button to="/projects" variant="ghost">
          All projects
        </Button>
      </Container>

      {/* Mobile: stacked collage grid per project. lg+: horizontal track. */}
      <div
        ref={trackRef}
        className="grid grid-cols-1 gap-8 px-gutter sm:grid-cols-2 lg:flex lg:w-max lg:gap-[4vw] lg:pr-[20vw]"
      >
        {projectGroups.map((group, index) => (
          <ProjectCard
            key={group.title}
            group={group}
            className={`aspect-[4/3] w-full ${COLLAGE[index % COLLAGE.length]}`}
            onOpen={setActiveImage}
          />
        ))}
      </div>

      {activeImage && <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />}
    </section>
  );
};

export default FeaturedProjects;