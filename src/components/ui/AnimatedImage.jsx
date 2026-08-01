import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import { parallaxImage, scaleOnScroll } from '@/animations/parallax';
import { cn, prefersReducedMotion } from '@/utils/helpers';

/**
 * Image inside a masked frame with three optional GSAP behaviours:
 * - mask reveal (clip-path wipe on scroll into view)
 * - parallax drift while scrolling past
 * - scale-down settle
 * All images lazy-load and declare aspect ratio via the wrapper to avoid CLS.
 * A shimmer sweep covers the frame until the image actually finishes
 * loading, instead of leaving a flat placeholder color on fast scrollers.
 */
const AnimatedImage = ({
  src,
  alt = '',
  ratio = 'aspect-[3/2]',
  parallax = false,
  scale = false,
  mask = true,
  eager = false,
  className = '',
  imgClassName = '',
}) => {
  const frameRef = useRef(null);
  const imgRef = useRef(null);
  const shimmerRef = useRef(null);

  const revealImage = () => {
    if (prefersReducedMotion()) {
      gsap.set(imgRef.current, { opacity: 1 });
      gsap.set(shimmerRef.current, { opacity: 0 });
      return;
    }
    gsap.to(imgRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    gsap.to(shimmerRef.current, { opacity: 0, duration: 0.4 });
  };

  useGSAP(
    () => {
      // Cached images fire `load` before React attaches the handler below.
      if (imgRef.current?.complete) revealImage();

      if (prefersReducedMotion()) return;
      const frame = frameRef.current;
      const image = imgRef.current;

      if (mask) {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: frame, start: 'top 85%' },
          },
        );
      }
      if (parallax) parallaxImage(image, frame);
      if (scale) scaleOnScroll(image, frame);
    },
    { scope: frameRef },
  );

  return (
    <div ref={frameRef} className={cn('relative overflow-hidden bg-ink-soft', ratio, className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={revealImage}
        onError={revealImage}
        className={cn(
          'absolute inset-0 h-full w-full object-cover opacity-0',
          parallax && 'scale-[1.2]',
          imgClassName,
        )}
      />
      <div ref={shimmerRef} aria-hidden className="image-shimmer pointer-events-none absolute inset-0" />
    </div>
  );
};

export default AnimatedImage;
