import { filterSelector } from '@entities/filter/model/filter.selector';
import { useGetFilteredTasksQuery, useGetTasksQuery } from '@entities/task/api/task.api';
import { TaskCardSkeleton } from '@entities/task/ui/TaskCardSkeleton';
import TaskListItem from '@entities/task/ui/TaskListItem';
import { useAppSelector } from '@shared/lib/hooks/redux';

export const TaskList: React.FC = () => {
  const filter = useAppSelector(filterSelector);

  const { allTasks, isAllLoading } = useGetTasksQuery(undefined, {
    skip: !!filter.value,
    selectFromResult: ({ data, isLoading }) => ({
      allTasks: data ?? [],
      isAllLoading: isLoading,
    }),
  });

  const { filteredTasks, isFilteredLoading } = useGetFilteredTasksQuery(filter, {
    skip: !filter.value,
    selectFromResult: ({ data, isLoading }) => ({
      filteredTasks: data ?? [],
      isFilteredLoading: isLoading,
    }),
  });

  const tasks = filter.value ? filteredTasks : allTasks;
  const isLoading = filter.value ? isFilteredLoading : isAllLoading;

  if (isLoading) return <TaskListSkeleton />;

  if (!tasks.length) return <div className="flex items-center justify-center min-h-[30vh]">Список пуст...</div>;

  return (
    <div className="grid gap-5 md:grid-cols-3 grid-cols-1">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

const TaskListSkeleton: React.FC = () => {
  return (
    <div className="grid gap-5 md:grid-cols-3 grid-cols-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </div>
  );
};
