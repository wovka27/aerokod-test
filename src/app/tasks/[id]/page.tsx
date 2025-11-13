import { Suspense } from 'react';

import { TaskDetailClient } from '@entities/task/ui/TaskDetailClient';
import { TaskDetailSkeleton } from '@entities/task/ui/TaskDetailSkeleton';

interface PageProps {
  params: { id: string };
}

export default function TaskDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<TaskDetailSkeleton />}>
      <TaskDetailClient taskId={params.id} />
    </Suspense>
  );
}
