'use client';

import { useRouter } from 'next/navigation';

import { useGetTaskByIdQuery } from '@entities/task/api/task.api';
import { TaskCard } from '@entities/task/ui/TaskCard';
import { Button } from '@shared/ui/button/Button';

interface TaskDetailProps {
  taskId: string;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ taskId }) => {
  const router = useRouter();

  const { data: task } = useGetTaskByIdQuery(taskId);

  if (!task) return null;

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        Back
      </Button>

      <TaskCard
        task={task}
        className="p-8"
      >
        <div className="space-y-8">
          <TaskCard.Header>
            <TaskCard.Title variant="detail" />
            <div className="flex gap-2">
              <TaskCard.Edit />
              <TaskCard.Delete variant="detail" />
            </div>
          </TaskCard.Header>
          <div>
            <label className="text-sm text-gray-400">Описание</label>
            <TaskCard.Description />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Оценочное время</label>
            <TaskCard.EstimatedTime />
          </div>
          <TaskCard.Progress variant="detail">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Затрачено:</span>
              <TaskCard.SpentTime />
            </div>
            <TaskCard.ProgressBar />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <TaskCard.Percent />
              <TaskCard.EstimatedTime />
            </div>
          </TaskCard.Progress>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Статус:</span>
            <TaskCard.Badge />
          </div>
          <div className="pt-6 border-t border-gray-800">
            <TaskCard.Actions>
              <TaskCard.Start />
              <TaskCard.Stop />
              <TaskCard.Complete />
            </TaskCard.Actions>
          </div>
        </div>
      </TaskCard>
    </div>
  );
};
