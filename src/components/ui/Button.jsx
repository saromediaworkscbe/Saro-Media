import { forwardRef, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/animations/gsapSetup';
import { cn, prefersReducedMotion } from '@/utils/helpers';
import { cursorProps } from '@/hooks/useCursor';

const variants = {
  primary: 'border border-ember/60 text-ember hover:border-ember hover:bg-ember hover:text-ink',
  outline: 'border border-ink-line/70 text-bone-muted hover:border-bone hover:text-bone',
  ghost: 'text-bone-muted hover:text-bone',
};

/**
 * Magnetic button: the element eases toward the pointer within its bounds
 * and springs back on leave. Falls back to a plain button for touch and
 * reduced-motion users.
 */
const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', icon = true, className = '', children, ...props },
  forwardedRef,
) {
  const innerRef = useRef(null);
  const setRefs = useCallback(
    (node) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const onPointerMove = useCallback((event) => {
    if (prefersReducedMotion()) return;
    const el = innerRef.current;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.4, duration: 0.4, ease: 'power3.out' });
  }, []);

  const onPointerLeave = useCallback(() => {
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  }, []);

  const Tag = as || (to ? Link : href ? 'a' : 'button');

  return (
    <Tag
      ref={setRefs}
      to={to}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-xs font-normal uppercase tracking-[0.14em] transition-colors duration-300 ease-out-expo will-change-transform',
        variants[variant],
        className,
      )}
      {...cursorProps('hover')}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={13}
          className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </Tag>
  );
});

export default Button;