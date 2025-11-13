'use client';

import { createContext, useContext, useState } from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useStartTaskMutation,
  useStopTaskMutation,
} from '@entities/task/api/task.api';
import { useTaskTimer } from '@entities/task/lib/hooks/useTaskTimer';
import type {
  TaskCardContextType,
  TaskCardProgressProps,
  TaskCardType,
  TitleProps,
} from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';
import { TaskCardStatusBadge } from '@entities/task/ui/TaskCardStatusBadge';
import EditTaskForm from '@features/editTaskForm/EditTaskForm';
import { time } from '@shared/lib/utils/formatTime';
import { Button } from '@shared/ui/button/Button';
import { Card } from '@shared/ui/card/Card';
import { useConfirm } from '@shared/ui/confirm-modal/providers/ConfirmProvider';
import { EditIcon, PlayIcon, TrashIcon } from '@shared/ui/icons';

const TaskCard: TaskCardType = ({ task, children, className = 'p-6 hover:border-gray-700 transition-all' }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { currentTime, isOverdue } = useTaskTimer(task.id);

  const value = {
    task,
    currentTime,
    isOverdue,
    openEdit: () => setIsEditModalOpen(true),
  };

  return (
    <TaskCardContext.Provider value={value}>
      <Card className={className}>{children}</Card>
      <EditTaskForm
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </TaskCardContext.Provider>
  );
};

const TaskCardContext = createContext<TaskCardContextType | undefined>(undefined);

const useTaskCard = () => {
  const context = useContext(TaskCardContext);
  if (!context) throw new Error('Компоненты TaskCard.* должны использоваться в TaskCard');
  return context;
};

const Header: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex items-start justify-between gap-4 mb-4">{children}</div>
);

const Title: React.FC<TitleProps> = ({ variant }) => {
  const { task } = useTaskCard();

  if (variant === 'detail') {
    return <h2 className="text-2xl font-semibold text-white">{task.name}</h2>;
  }

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="text-lg font-semibold text-white hover:underline"
    >
      {task.name}
    </Link>
  );
};

const Badge: React.FC = () => {
  const { task } = useTaskCard();
  return (
    <TaskCardStatusBadge
      task={task}
      size="sm"
    />
  );
};

const Description: React.FC = () => {
  const { task } = useTaskCard();
  return <p className="text-gray-400 text-sm">{task.description || '—'}</p>;
};

const EstimatedTime: React.FC = () => {
  const { task } = useTaskCard();
  return <span className={clsx('font-medium', 'text-blue-400')}>{time.toHhMm(+task.estimatedTime)}</span>;
};

const SpentTime: React.FC = () => {
  const { task, currentTime, isOverdue } = useTaskCard();
  const displayTime = currentTime ?? task.spentTime;

  return (
    <span className={clsx('font-medium', isOverdue ? 'text-red-400' : 'text-blue-400')}>
      {time.toHhMm(displayTime)}
    </span>
  );
};

const Percent: React.FC = () => {
  const { task, currentTime } = useTaskCard();
  const displayTime = currentTime ?? task.spentTime;
  const progress = Math.min((displayTime / +task.estimatedTime) * 100, 100);

  return <span>{Math.round(progress)}%</span>;
};

const ProgressBar: React.FC = () => {
  const { task, currentTime, isOverdue } = useTaskCard();
  const displayTime = currentTime ?? task.spentTime;
  const progress = Math.min((displayTime / +task.estimatedTime) * 100, 100);

  return (
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div
        className={clsx('h-full transition-all duration-1000 ease-linear', isOverdue ? 'bg-red-500' : 'bg-blue-500')}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Progress: React.FC<PropsWithChildren<TaskCardProgressProps>> = ({ variant = 'card', children }) => {
  if (children) return <div className={variant === 'card' ? 'space-y-3 mb-4' : 'space-y-3'}>{children}</div>;

  return (
    <div className={variant === 'card' ? 'space-y-3 mb-4' : 'space-y-3'}>
      <div className={clsx('flex justify-between', variant === 'card' ? 'text-sm' : 'text-base')}>
        <span className="text-gray-400">Затрачено:</span>
        <div className="flex gap-1">
          <SpentTime />
          <span className="'text-blue-400'">/</span>
          <EstimatedTime />
        </div>
      </div>

      <ProgressBar />

      {variant === 'detail' && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <Percent />
          <EstimatedTime />
        </div>
      )}
    </div>
  );
};

const Actions: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex gap-2 items-center justify-end">{children}</div>
);

const Edit: React.FC = () => {
  const { task, openEdit } = useTaskCard();

  if (task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.COMPLETED) return null;

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={openEdit}
    >
      <EditIcon />
    </Button>
  );
};

const Delete: React.FC = () => {
  const { task } = useTaskCard();
  const [deleteTask] = useDeleteTaskMutation();
  const confirm = useConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Удаление',
      message: 'Удалить задачу?',
      confirmText: 'Удалить',
      onConfirm: async () => {
        await deleteTask(task.id).unwrap();
      },
    });

    if (!confirmed) return;
  };

  if (task.status === TaskStatus.IN_PROGRESS) return null;

  return (
    <Button
      size="sm"
      variant="danger"
      onClick={handleDelete}
    >
      <TrashIcon />
    </Button>
  );
};

const Start: React.FC = () => {
  const { task } = useTaskCard();
  const [startTask] = useStartTaskMutation();

  if (task.status !== TaskStatus.PENDING) return null;

  return (
    <Button
      size="sm"
      variant="primary"
      onClick={() => startTask(task.id)}
    >
      <PlayIcon />
    </Button>
  );
};

const Stop: React.FC = () => {
  const { task } = useTaskCard();
  const [stopTask] = useStopTaskMutation();

  if (task.status !== TaskStatus.IN_PROGRESS) return null;

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => stopTask(task.id)}
    >
      Остановить
    </Button>
  );
};

const Complete: React.FC = () => {
  const { task } = useTaskCard();
  const [completeTask] = useCompleteTaskMutation();

  if (![TaskStatus.IN_PROGRESS, TaskStatus.OVERDUE].includes(task.status)) return null;

  return (
    <Button
      size="sm"
      variant="success"
      onClick={() => completeTask(task.id)}
    >
      Завершить
    </Button>
  );
};

TaskCard.Header = Header;
TaskCard.Title = Title;
TaskCard.Badge = Badge;
TaskCard.Description = Description;
TaskCard.Progress = Progress;
TaskCard.Actions = Actions;
TaskCard.EstimatedTime = EstimatedTime;
TaskCard.SpentTime = SpentTime;
TaskCard.Percent = Percent;
TaskCard.ProgressBar = ProgressBar;
TaskCard.Progress = Progress;
TaskCard.Edit = Edit;
TaskCard.Delete = Delete;
TaskCard.Start = Start;
TaskCard.Stop = Stop;
TaskCard.Complete = Complete;

export { TaskCard };
