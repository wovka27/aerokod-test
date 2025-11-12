'use client';

import { TaskList } from '@entities/task/ui/TaskList';
import TasksHeader from '@features/tasksHeader/TasksHeader';

export const Tasks: React.FC = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col gap-y-10">
      <TasksHeader />
      <TaskList />
    </div>
  );
};
