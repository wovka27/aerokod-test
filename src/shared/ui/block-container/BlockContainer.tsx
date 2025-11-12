import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

const BlockContainer: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={clsx('bg-gray-900 border border-gray-800 rounded-xl p-4', className)}>{children}</div>;
};

export default BlockContainer;
