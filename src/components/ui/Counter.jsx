import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animateCounter } from '@/animations/counter';
import { prefersReducedMotion } from '@/utils/helpers';

/** Number that counts up when scrolled into view. */
const Counter = ({ value, suffix = '', className = '' }) => {
  const numberRef = useRef(null);
  const scope = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        numberRef.current.textContent = value.toLocaleString();
        return;
      }
      animateCounter(numberRef.current, value, {
        scrollTrigger: { trigger: scope.current, start: 'top 85%' },
      });
    },
    { scope, dependencies: [value] },
  );

  return (
    <span ref={scope} className={className}>
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  );
};

export default Counter;
