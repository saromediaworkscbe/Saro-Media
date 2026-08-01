import { cn } from '@/utils/helpers';

/** 12-column layout primitive. Children place themselves with col-span utilities. */
const Grid = ({ className = '', children, ...props }) => (
  <div className={cn('grid grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-6', className)} {...props}>
    {children}
  </div>
);

export default Grid;
