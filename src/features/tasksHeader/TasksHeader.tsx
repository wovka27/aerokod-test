'use client';

import { useState } from 'react';

import StatList from '@entities/stat-list/ui/StatList';
import CreateTaskForm from '@features/createTaskForm/CreateTaskForm';
import FilterTasks from '@features/filterTasks/FilterTasks';
import { Button } from '@shared/ui/button/Button';

const TasksHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="items-center justify-between flex flex-wrap gap-5">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Мои задачи</h1>
          <p className="text-gray-400">Отслеживайте время выполнения ваших задач</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Создать задачу
        </Button>
      </div>

      <StatList />
      <FilterTasks />
      <CreateTaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TasksHeader;
