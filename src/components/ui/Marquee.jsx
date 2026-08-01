import { cn } from '@/utils/helpers';

/**
 * Infinite marquee. Content is duplicated once and translated -50% in a
 * CSS loop — cheaper than a rAF tween and pauses on hover via CSS.
 * The duplicate row is aria-hidden so screen readers hear it once.
 */
const Marquee = ({ children, duration = 30, reverse = false, className = '' }) => (
  <div className={cn('marquee overflow-hidden', className)}>
    <div
      className="marquee-track flex w-max items-center"
      style={{
        '--marquee-duration': `${duration}s`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden>
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
