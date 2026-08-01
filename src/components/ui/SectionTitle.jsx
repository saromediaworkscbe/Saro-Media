import Reveal from '@/components/ui/Reveal';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import { cn } from '@/utils/helpers';

/**
 * Standard section opener: mono eyebrow + animated display heading.
 * The eyebrow is real information (section index / name), not decoration.
 */
const SectionTitle = ({ eyebrow, title, as = 'h2', align = 'left', className = '' }) => (
  <header className={cn(align === 'center' && 'text-center', className)}>
    {eyebrow && (
      <Reveal>
        <p className="mb-4 font-mono text-label uppercase text-ember">{eyebrow}</p>
      </Reveal>
    )}
    <AnimatedHeading as={as} className="text-display-sm font-display font-medium text-bone">
      {title}
    </AnimatedHeading>
  </header>
);

export default SectionTitle;
