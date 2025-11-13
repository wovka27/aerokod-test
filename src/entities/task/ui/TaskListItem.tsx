import React from 'react';

import type { ITask } from '@entities/task/model/task.types';
import { TaskCard } from '@entities/task/ui/TaskCard';

interface TaskListItemProps {
  task: ITask;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  return (
    <TaskCard
      key={task.id}
      task={task}
    >
      <TaskCard.Header>
        <TaskCard.Title variant="card" />
        <TaskCard.Badge />
      </TaskCard.Header>

      <TaskCard.Description />

      <TaskCard.Progress variant="card">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Затрачено:</span>
          <div className="flex gap-1">
            <TaskCard.SpentTime />
            <span className="text-blue-500">/</span>
            <TaskCard.EstimatedTime />
          </div>
        </div>
        <TaskCard.ProgressBar />
      </TaskCard.Progress>

      <TaskCard.Actions>
        <TaskCard.Start />
        <TaskCard.Stop />
        <TaskCard.Complete />
        <TaskCard.Edit />
        <TaskCard.Delete />
      </TaskCard.Actions>
    </TaskCard>
  );
};

export default React.memo(TaskListItem);
