import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/animations/gsapSetup';
import { prefersReducedMotion } from '@/utils/helpers';

/**
 * One-time loading screen: counts 0→100 while fonts settle, then the
 * curtain splits vertically to reveal the page. Calls onComplete so the
 * hero can begin its own timeline the moment the curtain clears.
 */
const Loader = ({ onComplete }) => {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onComplete();
        return;
      }
      const counter = { value: 0 };
      const tl = gsap.timeline({ onComplete });

      tl.to(counter, {
        value: 100,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => {
          scope.current.querySelector('[data-count]').textContent = Math.round(counter.value);
        },
      })
        .to('[data-loader-text]', { yPercent: -110, duration: 0.5, ease: 'expo.in' })
        .to('[data-panel="top"]', { yPercent: -101, duration: 0.9, ease: 'expo.inOut' }, '<0.1')
        .to('[data-panel="bottom"]', { yPercent: 101, duration: 0.9, ease: 'expo.inOut' }, '<');
    },
    { scope },
  );

  return (
    <div ref={scope} className="fixed inset-0 z-[80]" aria-hidden>
      <div data-panel="top" className="absolute inset-x-0 top-0 h-1/2 bg-ink-soft" />
      <div data-panel="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-soft" />
      <div className="absolute inset-0 flex items-end justify-between overflow-hidden p-8">
        <div className="overflow-hidden">
          <p data-loader-text className="font-display text-lg text-bone">
            Aether<span className="text-ember">.</span> Studio
          </p>
        </div>
        <div className="overflow-hidden">
          <p data-loader-text className="font-display text-7xl font-medium text-bone md:text-9xl">
            <span data-count>0</span>
            <span className="text-ember">%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
