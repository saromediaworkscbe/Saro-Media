import { memo } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/helpers';

export const Stars = ({ count, className = '' }) => (
  <div className={cn('flex gap-1', className)} aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? 'fill-ember text-ember' : 'text-ink-line'}
        aria-hidden
      />
    ))}
  </div>
);

const ReviewCard = memo(function ReviewCard({ review, className = '' }) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col justify-between border border-ink-line bg-ink-soft p-8',
        className,
      )}
    >
      <div>
        <Stars count={review.rating} />
        <blockquote className="mt-6 font-display text-lg leading-relaxed text-bone md:text-xl">
          “{review.quote}”
        </blockquote>
      </div>
      <figcaption className="mt-8 border-t border-ink-line pt-6">
        <p className="text-bone">{review.name}</p>
        <p className="mt-1 text-sm text-bone-muted">{review.role}</p>
        <p className="mt-3 font-mono text-label uppercase text-bone-faint">
          Project — {review.project}
        </p>
      </figcaption>
    </figure>
  );
});

export default ReviewCard;
