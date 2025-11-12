import { useState } from 'react';

import clsx from 'clsx';

import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useStartTaskMutation,
  useStopTaskMutation,
} from '@entities/task/api/task.api';
import { useTaskTimer } from '@entities/task/lib/hooks/useTaskTimer';
import type { ITask } from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';
import EditTaskForm from '@features/editTaskForm/EditTaskForm';
import { time } from '@shared/lib/utils/formatTime';
import { Button } from '@shared/ui/button/Button';
import { Card } from '@shared/ui/card/Card';
import { useConfirm } from '@shared/ui/confirm-modal/hooks/useConfirm';

interface TaskCardProps {
  task: ITask;
  isActive: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, isActive }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Card className="p-6 hover:border-gray-700 transition-all flex flex-col justify-between">
      <TaskCardHeader task={task} />
      <div>
        <TaskCardProgress
          task={task}
          isActive={isActive}
        />
        <TaskCardActions
          task={task}
          onEdit={() => setIsEditModalOpen(true)}
        />
      </div>
      <EditTaskForm
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </Card>
  );
};

const TaskCardProgress: React.FC<TaskCardProps> = ({ task, isActive }) => {
  const { currentTime, isOverdue } = useTaskTimer(isActive ? task : null);

  const displayTime = isActive ? currentTime : task.spentTime;
  const progressPercentage = Math.min((displayTime / +task.estimatedTime) * 100, 100);

  const timeValue = `${time.toHhMm(displayTime)}/${time.toHhMm(+task.estimatedTime)}`;
  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Прогресс:</span>
        <span className={clsx('font-medium', isOverdue ? 'text-red-400' : 'text-blue-400')}>{timeValue}</span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-300', isOverdue ? 'bg-red-500' : 'bg-blue-500')}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

const TaskCardHeader: React.FC<{ task: ITask }> = ({ task }) => {
  const statusBadge = getStatusBadge(task);
  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between gap-5">
        <h3 className="text-lg font-semibold text-white mb-2">{task.name}</h3>
        <div className="ml-4">{statusBadge}</div>
      </div>
      <p className="text-gray-400 text-sm">{task.description}</p>
    </div>
  );
};

const TaskCardActions: React.FC<{ task: ITask; onEdit: () => void }> = ({ task, onEdit }) => {
  const [startTask] = useStartTaskMutation();
  const [stopTask] = useStopTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { open } = useConfirm();

  const handleStart = async () => {
    await startTask(task.id);
  };

  const handleStop = async () => {
    await stopTask(task.id);
  };

  const handleComplete = async () => {
    await completeTask(task.id);
  };

  const handleDelete = async () => {
    open({
      message: 'Подтверждаете удаление?',
      onConfirm: async () => {
        await deleteTask(task.id);
      },
    });
  };

  return (
    <div className="flex gap-2 items-center">
      {task.status === TaskStatus.PENDING && (
        <Button
          variant="primary"
          size="sm"
          onClick={handleStart}
          className="flex-1"
        >
          Начать
        </Button>
      )}

      {task.status === TaskStatus.IN_PROGRESS && (
        <>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleStop}
            className="flex-1"
          >
            Остановить
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleComplete}
            className="flex-1"
          >
            Завершить
          </Button>
        </>
      )}

      {task.status === TaskStatus.OVERDUE && (
        <Button
          variant="success"
          size="sm"
          onClick={handleComplete}
          className="flex-1"
        >
          Завершить
        </Button>
      )}

      {task.status !== TaskStatus.IN_PROGRESS && task.status !== TaskStatus.COMPLETED && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Button>
      )}

      {task.status !== TaskStatus.IN_PROGRESS && (
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};

const getStatusBadge = (task: ITask) => {
  switch (task.status) {
    case TaskStatus.COMPLETED:
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          Завершена
        </span>
      );
    case TaskStatus.IN_PROGRESS:
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse">
          Выполняется
        </span>
      );
    case TaskStatus.OVERDUE:
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          Просрочена
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
          Ожидает
        </span>
      );
  }
};
