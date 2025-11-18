import clsx from 'clsx';

import type { ITask } from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';

interface Props {
  task: ITask;
  size?: 'sm' | 'md';
}

export const TaskCardStatusBadge: React.FC<Props> = ({ task, size = 'md' }) => {
  const className = clsx(
    'font-medium rounded-full border',
    size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm',
    statusClasses[task.status]
  );

  return (
    <Badge
      className={className}
      text={statusText[task.status]}
    />
  );
};

const Badge: React.FC<{ className: string; text: string }> = ({ className, text }) => {
  return <span className={className}>{text}</span>;
};

const statusClasses: Record<TaskStatus, string> = {
  [TaskStatus.COMPLETED]: 'bg-green-500/20 text-green-400 border-green-500/30',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse',
  [TaskStatus.OVERDUE]: 'bg-red-500/20 text-red-400 border-red-500/30',
  [TaskStatus.PENDING]: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const statusText: Record<TaskStatus, string> = {
  [TaskStatus.COMPLETED]: 'Завершена',
  [TaskStatus.IN_PROGRESS]: 'Выполняется',
  [TaskStatus.OVERDUE]: 'Просрочена',
  [TaskStatus.PENDING]: 'Ожидает',
};
