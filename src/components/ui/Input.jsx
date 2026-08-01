import { forwardRef, useId } from 'react';
import { cn } from '@/utils/helpers';

/**
 * Underlined form field in the site's editorial style.
 * Works as input or textarea; integrates with react-hook-form via ref.
 */
const Input = forwardRef(function Input(
  { label, error, as = 'input', className = '', ...props },
  ref,
) {
  const id = useId();
  const Tag = as;
  return (
    <div className={cn('group relative', className)}>
      <label htmlFor={id} className="mb-3 block font-mono text-label uppercase text-bone-faint">
        {label}
      </label>
      <Tag
        id={id}
        ref={ref}
        aria-invalid={Boolean(error) || undefined}
        className={cn(
          'w-full border-b bg-transparent pb-3 text-lg text-bone outline-none transition-colors duration-300 placeholder:text-bone-faint focus:border-ember',
          error ? 'border-ember' : 'border-ink-line',
          as === 'textarea' && 'min-h-28 resize-y',
        )}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-ember">{error}</p>}
    </div>
  );
});

export default Input;
