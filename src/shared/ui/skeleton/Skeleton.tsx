import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, height = 'h-4', width = 'w-full', rounded = 'md' }) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return <div className={clsx('animate-pulse bg-gray-700', height, width, roundedClasses[rounded], className)} />;
};
