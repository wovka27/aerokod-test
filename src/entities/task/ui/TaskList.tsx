import { filterSelector } from '@entities/filter/model/filter.selector';
import { useGetFilteredTasksQuery, useGetTasksQuery } from '@entities/task/api/task.api';
import { TaskCardSkeleton } from '@entities/task/ui/TaskCardSkeleton';
import TaskListItem from '@entities/task/ui/TaskListItem';
import { useAppSelector } from '@shared/lib/hooks/redux';
import { ListRenderer } from '@shared/ui/list-renderer/ListRenderer';

export const TaskList: React.FC = () => {
  const filter = useAppSelector(filterSelector);
  const hasFilter = Boolean(filter.value);

  const allQuery = useGetTasksQuery(undefined, {
    skip: hasFilter,
  });

  const filteredQuery = useGetFilteredTasksQuery(filter, {
    skip: !hasFilter,
  });

  const tasks = hasFilter ? (filteredQuery.data ?? []) : (allQuery.data ?? []);
  const isLoading = hasFilter ? filteredQuery.isLoading : allQuery.isLoading;

  if (isLoading) return <TaskListSkeleton />;

  if (!tasks.length) return <ListEmpty />;

  return (
    <div className="grid gap-5 md:grid-cols-3 grid-cols-1">
      <ListRenderer
        component={TaskListItem}
        items={tasks}
        getKey={(item) => item.id}
        extraProps={(task) => ({ task })}
      />
    </div>
  );
};

const TaskListSkeleton: React.FC = () => (
  <div className="grid gap-5 md:grid-cols-3 grid-cols-1">
    <ListRenderer
      component={TaskCardSkeleton}
      items={Array.from({ length: 6 })}
      getKey={(_, index) => index}
    />
  </div>
);

const ListEmpty = () => <div className="flex items-center justify-center min-h-[30vh]">Список пуст...</div>;
