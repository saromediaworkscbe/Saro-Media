import { memo } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/helpers';
import { SITE } from '@/utils/constants';

const PricingCard = memo(function PricingCard({ pkg }) {
  const formattedPrice =
    typeof pkg.price === 'number'
      ? `₹${pkg.price.toLocaleString('en-IN')}`
      : pkg.price;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-between p-6 sm:p-7 rounded-sm border transition-all duration-300',
        pkg.highlight
          ? 'bg-ink-soft border-ember/60 shadow-lg shadow-ember/5 lg:-mt-2 lg:mb-2'
          : 'bg-ink-soft/40 border-ink-line hover:border-ember/40 hover:bg-ink-soft/70',
      )}
    >
      {/* Accent edge highlight */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-[3px] transition-colors duration-300',
          pkg.highlight ? 'bg-ember' : 'bg-transparent group-hover:bg-ember/50',
        )}
      />

      <div>
        {/* Header & Badge */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl text-bone sm:text-2xl font-medium">{pkg.name}</h3>
          {pkg.highlight && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink bg-ember px-2.5 py-0.5 rounded-full font-semibold">
              Most Popular
            </span>
          )}
        </div>

        {pkg.tagline && (
          <p className="mt-2 text-xs text-bone-muted leading-relaxed">{pkg.tagline}</p>
        )}

        {/* Price */}
        <div className="mt-6 flex items-baseline gap-1.5 border-b border-ink-line/40 pb-6">
          <span className="font-display text-3xl font-semibold leading-none text-bone sm:text-4xl">
            {formattedPrice}
          </span>
          {pkg.period && (
            <span className="font-mono text-[10px] uppercase tracking-wide text-bone-faint">
              /{pkg.period}
            </span>
          )}
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-xs text-bone-muted leading-relaxed">
              <Check size={14} className="shrink-0 text-ember mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Button
        href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
        variant={pkg.highlight ? 'primary' : 'outline'}
        className="mt-8 justify-center w-full text-xs py-3"
      >
        {pkg.isCustom ? 'Contact For Quote' : `Book ${pkg.name}`}
      </Button>
    </article>
  );
});

export default PricingCard;