import { cn } from '@/utils/helpers';

const Container = ({ as: Tag = 'div', className = '', children, ...props }) => (
  <Tag className={cn('mx-auto w-full max-w-[1600px] px-gutter', className)} {...props}>
    {children}
  </Tag>
);

export default Container;
