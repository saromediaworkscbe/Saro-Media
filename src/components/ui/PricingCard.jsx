import { memo } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/helpers';

const PricingCard = memo(function PricingCard({ pkg }) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col border p-8 transition-colors duration-500',
        pkg.highlight
          ? 'border-ember bg-ink-soft'
          : 'border-ink-line bg-transparent hover:border-bone-faint',
      )}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-8 bg-ember px-3 py-1 font-mono text-label uppercase text-ink">
          Most booked
        </span>
      )}
      <h3 className="font-display text-2xl text-bone">{pkg.name}</h3>
      <p className="mt-2 text-sm text-bone-muted">{pkg.tagline}</p>
      <p className="mt-8">
        <span className="font-display text-5xl font-medium text-bone">
          ${pkg.price.toLocaleString()}
        </span>
        <span className="ml-2 font-mono text-label uppercase text-bone-faint">{pkg.period}</span>
      </p>
      <ul className="mt-8 flex-1 space-y-3 border-t border-ink-line pt-8">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-bone-muted">
            <Check size={16} className="mt-0.5 shrink-0 text-ember" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        to="/#contact"
        variant={pkg.highlight ? 'primary' : 'outline'}
        className="mt-10 justify-center"
      >
        Start with {pkg.name}
      </Button>
    </article>
  );
});

export default PricingCard;
