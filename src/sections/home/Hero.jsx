import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { gsap } from '@/animations/gsapSetup';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { prefersReducedMotion } from '@/utils/helpers';
import homeImg from '@/assets/images/home.jpg';
import logoImg from '@/assets/images/logo.png';

const HeroParticles = lazy(() => import('@/components/three/HeroParticles'));

const Hero = () => {
  const scope = useRef(null);
  const textRef = useRef(null);
  const [showParticles, setShowParticles] = useState(false);

  // The WebGL particle layer only exists while the hero is actually on
  // screen — no point burning a GPU context for a section scrolled 4000px
  // past, and it's skipped outright under reduced motion.
  useEffect(() => {
    if (prefersReducedMotion() || !scope.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setShowParticles(entry.isIntersecting), {
      rootMargin: '200px 0px',
    });
    observer.observe(scope.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      document.fonts.ready.then(() => {
        const split = new SplitType('[data-hero-title]', { types: 'chars,words' });

        // Was delay: 2.2 — cut way down so the headline shows up almost
        // immediately instead of leaving a long blank pause on load.
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo('[data-hero-eyebrow]', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
          .fromTo(
            split.chars,
            { xPercent: 100, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1.1,
              stagger: { each: 0.018, from: 'end' },
              ease: 'expo.out',
            },
            '-=0.5',
          )
          .fromTo(
            '[data-hero-meta]',
            { x: 70, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
            '-=0.7',
          )
          .fromTo(
            '[data-hero-media]',
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut' },
            '-=0.8',
          );

        // Text moves DOWN as you scroll, and gets masked from the bottom up,
        // so the pinned image behind it "swallows" it as it sinks.
        // FADE_BAND controls how wide the black->transparent transition zone
        // is (in % of the element's height) — before, both stops sat at the
        // same position, which produced a hard, visible cutoff edge instead
        // of a soft fade.
        const FADE_BAND = 18;

        gsap.to(textRef.current, {
          y: 220,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-hero-text]',
            start: 'top top',
            end: '+=100%',
            scrub: 1.2, // a bit more smoothing lag than before (was 1) so it settles more gently
            onUpdate: (self) => {
              const stop = (1 - self.progress) * 100; // 100% -> 0%
              const solidStop = Math.max(0, stop - FADE_BAND);
              const fadeStop = Math.min(100, stop + FADE_BAND / 2);
              const mask = `linear-gradient(to bottom, black 0%, black ${solidStop}%, transparent ${fadeStop}%)`;
              textRef.current.style.maskImage = mask;
              textRef.current.style.webkitMaskImage = mask;
              // Fade opacity down in lockstep with the mask so the text
              // visually dissolves into the image rather than just being
              // clipped by a hard edge.
              gsap.set(textRef.current, { opacity: self.progress < 0.85 ? 1 : 1 - (self.progress - 0.85) / 0.15 });
            },
          },
        });
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative min-h-[130svh] sm:min-h-[145svh] md:min-h-[160svh]"
    >
      {/* Media pins in place for the height of this section */}
      <div
        data-hero-media
        className="sticky top-0 z-0 h-svh w-full overflow-hidden"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        <img
          src={homeImg}
          alt="Aether Studio Hero"
          className="h-full w-full object-cover object-[30%_center] sm:object-[25%_center] md:object-center"
          loading="eager"
          fetchPriority="high"
        />
        {showParticles && (
          <Suspense fallback={null}>
            <HeroParticles className="pointer-events-none absolute inset-0" />
          </Suspense>
        )}
        {/* Slight overall fade plus a stronger gradient on the right, where the
            right-aligned text sits, so the headline stays legible against
            whatever is in the photo behind it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink/70 via-ink/25 to-transparent"
        />
      </div>

      {/* Text is now sticky too, so it stays pinned and gets pushed down + masked into the image instead of scrolling off naturally */}
      <div
        ref={textRef}
        data-hero-text
        className="sticky top-10 z-50 -mt-[80svh] flex h-svh flex-col items-end justify-center pb-8 pt-10 sm:pt-0 text-right sm:pb-0 md:pt-32"
      >
        <Container className="flex flex-col items-end text-right">
  {/* Logo */}
  <img
    src={logoImg}
    alt="Saro Media Works"
    className="mb-4 h-16 w-auto sm:mb-6 sm:h-20"
  />

  {/* Eyebrow */}
  <p
    data-hero-eyebrow
    className="mb-3 max-w-[220px] text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8921A] opacity-0 sm:mb-6 sm:max-w-none sm:text-label"
  >
    Media & Creative Agency — India
  </p>

  {/* Heading */}
  <h1
    data-hero-title
    className="max-w-[300px] text-right font-display text-[2.2rem] font-semibold uppercase leading-[0.9] text-[#FBF2DC] sm:max-w-none sm:text-display-lg"
  >
    We Capture{" "}
    <span className="font-normal text-[#C8921A]">
      Stories
    </span>
  </h1>

  {/* Description */}
  <div className="mt-5 flex flex-col items-end">
    <p
      data-hero-meta
      className="max-w-[260px] text-right font-body text-xs font-light leading-relaxed text-[#FBF2DC]/80 opacity-0 sm:max-w-md sm:text-sm lg:text-base"
    >
      At Saro Media Works, we transform emotions into timeless visual
      experiences through cinematic photography and filmmaking.
    </p>
  </div>
</Container>
      </div>
    </section>
  );
};

export default Hero;