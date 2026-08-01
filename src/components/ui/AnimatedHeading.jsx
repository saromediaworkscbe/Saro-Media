import { useSplitText } from '@/hooks/useSplitText';
import { useGSAP } from '@gsap/react';
import { revealLines, revealChars } from '@/animations/textAnimation';
import { cn, prefersReducedMotion } from '@/utils/helpers';

/**
 * Heading that splits itself (lines by default, chars for heroes) and
 * reveals on scroll. `immediate` skips ScrollTrigger for above-the-fold use.
 */
const AnimatedHeading = ({
  as: Tag = 'h2',
  split = 'lines',
  immediate = false,
  delay = 0,
  className = '',
  children,
}) => {
  const { elementRef } = useSplitText(split === 'chars' ? 'chars,words' : 'lines', () => {
    if (prefersReducedMotion()) return;
    const el = elementRef.current;
    const targets = el.querySelectorAll(split === 'chars' ? '.char' : '.line');
    if (split === 'chars') el.classList.add('overflow-hidden');
    const scrollTrigger = immediate ? undefined : { trigger: el, start: 'top 85%' };
    const animate = split === 'chars' ? revealChars : revealLines;
    animate(targets, { delay, scrollTrigger });
  });

  useGSAP(() => {}, []); // ensures GSAP context participates in strict-mode cleanup

  return (
    <Tag ref={elementRef} className={cn(className)}>
      {children}
    </Tag>
  );
};

export default AnimatedHeading;
