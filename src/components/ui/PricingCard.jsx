import { memo } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/helpers';
import { SITE } from '@/utils/constants';

const PricingCard = memo(function PricingCard({ pkg }) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col p-6 transition-colors duration-500 sm:p-8',
        pkg.highlight ? 'bg-ink-soft' : 'bg-transparent',
      )}
    >
      {/* Accent bar instead of a floating badge — sits flush against the edge */}
      <div className={cn('absolute inset-y-0 left-0 w-[3px]', pkg.highlight ? 'bg-ember' : 'bg-ink-line')} />

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl text-bone sm:text-2xl">{pkg.name}</h3>
        {pkg.highlight && (
          <span className="font-mono text-[10px] uppercase tracking-wide text-ember sm:text-label">
            Most booked
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-bone-muted">{pkg.tagline}</p>

      <p className="mt-6 flex items-baseline gap-1 sm:mt-8">
        <span className="font-mono text-sm text-bone-faint">$</span>
        <span className="font-display text-4xl font-medium leading-none text-bone sm:text-5xl">
          {pkg.price.toLocaleString()}
        </span>
        <span className="ml-1 font-mono text-[10px] uppercase text-bone-faint sm:text-label">/{pkg.period}</span>
      </p>

      {/* Numbered list instead of checkmarks — quieter, no repeated icon */}
      <ul className="mt-6 flex-1 space-y-3 border-t border-ink-line pt-6 sm:mt-8 sm:pt-8">
        {pkg.features.map((feature, i) => (
          <li key={feature} className="flex items-baseline gap-3 text-sm text-bone-muted">
            <span className="font-mono text-[10px] text-bone-faint">{String(i + 1).padStart(2, '0')}</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
        variant={pkg.highlight ? 'primary' : 'outline'}
        className="mt-8 justify-center sm:mt-10"
      >
        Start with {pkg.name}
      </Button>
    </article>
  );
});

export default PricingCard;