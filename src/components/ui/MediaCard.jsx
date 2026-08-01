import { memo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '@/animations/gsapSetup';
import { useGSAP } from '@gsap/react';
import Badge from '@/components/ui/Badge';
import { cursorProps } from '@/hooks/useCursor';
import { prefersReducedMotion } from '@/utils/helpers';
import { attachTilt } from '@/animations/tilt3d';
import { useIsDesktop } from '@/hooks/useMediaQuery';

const MediaCard = memo(function MediaCard({ project, index = 0, ratio = 'aspect-[4/3]' }) {
  const btnRef = useRef(null);
  const cardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  // cover + gallery makes the full album; falls back to just the cover
  // if a project has no gallery images.
  const album = [project.cover, ...(project.gallery || [])];

  // First 4 images for the hover collage, padded if the project has fewer.
  const collage = [...album];
  while (collage.length < 4) collage.push(collage[collage.length - 1]);

  const onEnter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(cardRef.current.querySelectorAll('[data-collage-img]'), {
      scale: 1.06,
      duration: 0.8,
      ease: 'expo.out',
    });
  };
  const onLeave = () => {
    gsap.to(cardRef.current.querySelectorAll('[data-collage-img]'), {
      scale: 1,
      duration: 0.8,
      ease: 'expo.out',
    });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion() || !isDesktop) return;
      return attachTilt(btnRef.current, cardRef.current);
    },
    { scope: btnRef, dependencies: [isDesktop] },
  );

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setIsOpen(true)}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className="group block w-full text-left"
        {...cursorProps('view', 'View')}
      >
        <div ref={cardRef} className={`relative overflow-hidden ${ratio}`}>
          {/* 2x2 collage — always mounted underneath */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
            {collage.slice(0, 4).map((src, i) => (
              <div key={src + i} className="relative overflow-hidden">
                <img
                  data-collage-img
                  src={src}
                  alt={`${project.title} — detail ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Cover overlay — fades out on hover to reveal the collage */}
          <div className="absolute inset-0 z-10 overflow-hidden opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0">
            <img
              data-collage-img
              src={project.cover}
              alt={project.title}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <div>
            <span className="mr-3 font-mono text-label text-bone-faint">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-xl text-bone transition-colors duration-300 group-hover:text-ember md:text-2xl">
              {project.title}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Badge>{project.category}</Badge>
            <span className="hidden font-mono text-label text-bone-faint sm:inline">{project.year}</span>
          </div>
        </div>
      </button>

      {isOpen && <AlbumGallery project={project} album={album} onClose={() => setIsOpen(false)} />}
    </>
  );
});

/**
 * Full-screen overlay: bento-style grid of every image in the album.
 * First image is the tall hero tile, rest fill in around it.
 * Labels pull from project.services (rotating through them), falling
 * back to the project category if there aren't enough services listed.
 *
 * Clicking any tile opens that image full-size in a second overlay
 * (selectedSrc), with a close button that fades in on hover.
 */
function AlbumGallery({ project, album, onClose }) {
  const overlayRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedSrc, setSelectedSrc] = useState(null);

  useGSAP(() => {
    overlayRef.current?.focus();

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'expo.out', delay: 0.05 },
    );
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (selectedSrc) {
        setSelectedSrc(null);
      } else {
        onClose();
      }
    }
  };

  const labelFor = (i) => project.services?.[i] || project.category;

  const [heroSrc, ...restSrcs] = album;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-sm cursor-auto"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between bg-black/80 px-6 py-5 backdrop-blur-sm sm:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-display text-lg text-bone md:text-xl">{project.title}</span>
          <span className="ml-3 font-mono text-label text-bone-faint">{album.length} photos</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-label uppercase text-bone-faint transition-colors hover:text-ember"
        >
          Close ✕
        </button>
      </div>

      {/* Bento grid */}
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-8 sm:px-10" onClick={(e) => e.stopPropagation()}>
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          {heroSrc && (
            <GalleryTile
              src={heroSrc}
              label={labelFor(0)}
              alt={project.title}
              className="aspect-[4/5] sm:col-span-1 sm:row-span-2 sm:aspect-auto"
              onClick={() => setSelectedSrc(heroSrc)}
            />
          )}
          {restSrcs.map((src, i) => (
            <GalleryTile
              key={src + i}
              src={src}
              label={labelFor(i + 1)}
              alt={`${project.title} ${i + 2}`}
              className="aspect-[4/3]"
              onClick={() => setSelectedSrc(src)}
            />
          ))}
        </div>
      </div>

      {/* Single-image lightbox, layered above the bento grid */}
      {selectedSrc && (
        <div
          className="group fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-6"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSrc(null);
          }}
        >
          <img src={selectedSrc} alt="" className="max-h-full max-w-full object-contain" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSrc(null);
            }}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center
                       rounded-full bg-ink/60 text-bone opacity-0 backdrop-blur-sm
                       transition-opacity duration-300 group-hover:opacity-100
                       hover:bg-ink/80"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>,
    document.body,
  );
}

function GalleryTile({ src, label, alt, className = '', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative block overflow-hidden text-left ${className}`}
      {...cursorProps('view', 'View')}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {label && (
        <span className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 font-mono text-label uppercase tracking-wide text-bone">
          {label}
        </span>
      )}
    </button>
  );
}

export default MediaCard;