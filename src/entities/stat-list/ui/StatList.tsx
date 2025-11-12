'use client';

import { useGetTasksQuery } from '@entities/task/api/task.api';
import { type ITask, TaskStatus } from '@entities/task/model/task.types';
import BlockContainer from '@shared/ui/block-container/BlockContainer';

interface IStatProps {
  label: string;
  value: number;
  className?: string;
}

const Stat: React.FC<IStatProps> = ({ value, label, className }) => {
  return (
    <BlockContainer className={className}>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-400">{value}</p>
    </BlockContainer>
  );
};

const StatList: React.FC = () => {
  const { data: list = [], isLoading } = useGetTasksQuery();

  if (isLoading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Stat
            className="animate-pulse"
            value={0}
            key={i}
            label={'Название'}
          />
        ))}
      </div>
    );

  const statList = [
    { label: 'Всего', value: list.length },
    { label: 'Завершено', value: getStatusCount(list, TaskStatus.COMPLETED) },
    { label: 'Просрочено', value: getStatusCount(list, TaskStatus.OVERDUE) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statList.map((item) => (
        <Stat
          {...item}
          key={item.label}
        />
      ))}
    </div>
  );
};

export default StatList;

const getStatusCount = (tasks: ITask[], status: TaskStatus) => {
  return tasks.filter((task) => task.status === status).length;
};
