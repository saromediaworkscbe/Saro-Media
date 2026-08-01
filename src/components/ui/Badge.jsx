import { cn } from '@/utils/helpers';

const Badge = ({ children, active = false, className = '', ...props }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border px-3 py-1 font-mono text-label uppercase transition-colors duration-300',
      active ? 'border-ember bg-ember text-ink' : 'border-ink-line text-bone-muted',
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export default Badge;
