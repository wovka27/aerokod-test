'use client';

import { notFound } from 'next/navigation';

import { useGetTaskByIdQuery } from '@entities/task/api/task.api';
import { TaskDetail } from '@entities/task/ui/TaskDetail';
import { TaskDetailSkeleton } from '@entities/task/ui/TaskDetailSkeleton';

interface Props {
  taskId: string;
}

export const TaskDetailClient = ({ taskId }: Props) => {
  const { data: task, isLoading, isError } = useGetTaskByIdQuery(taskId);

  if (isLoading) return <TaskDetailSkeleton />;
  if (isError || !task) notFound();

  return <TaskDetail taskId={task.id} />;
};
