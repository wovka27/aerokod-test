import clsx from 'clsx';

import type { ITask } from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';

interface Props {
  task: ITask;
  size?: 'sm' | 'md';
}

export const TaskCardStatusBadge: React.FC<Props> = ({ task, size = 'md' }) => {
  const base = clsx('font-medium rounded-full border', size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm');

  switch (task.status) {
    case TaskStatus.COMPLETED:
      return <span className={`${base} bg-green-500/20 text-green-400 border-green-500/30`}>Завершена</span>;
    case TaskStatus.IN_PROGRESS:
      return (
        <span className={`${base} bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse`}>Выполняется</span>
      );
    case TaskStatus.OVERDUE:
      return <span className={`${base} bg-red-500/20 text-red-400 border-red-500/30`}>Просрочена</span>;
    default:
      return <span className={`${base} bg-gray-500/20 text-gray-400 border-gray-500/30`}>Ожидает</span>;
  }
};
