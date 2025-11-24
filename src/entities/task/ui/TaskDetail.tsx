'use client';

import type { ITask } from '@entities/task/model/task.types';
import { TaskCard } from '@entities/task/ui/TaskCard';
import BackButton from '@features/backButton/BackButton';

interface TaskDetailProps {
  task: ITask;
}

export const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <BackButton />

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
