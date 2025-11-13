import { useEffect, useState } from 'react';

import { useGetTaskByIdQuery } from '@entities/task/api/task.api';
import type { ITask } from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';

interface TaskTimerState {
  currentTime: number;
  isOverdue: boolean;
}

export const useTaskTimer = (id: string): TaskTimerState => {
  const { data: task = {} as ITask } = useGetTaskByIdQuery(id);
  const [currentTime, setCurrentTime] = useState<number>(task?.spentTime ?? 0);
  const [isOverdue, setIsOverdue] = useState<boolean>(false);

  useEffect(() => {
    if (!task) {
      setCurrentTime(0);
      setIsOverdue(false);
      return;
    }

    if (task.status !== TaskStatus.IN_PROGRESS || !task.startedAt) {
      setCurrentTime(task.spentTime);
      setIsOverdue(task.spentTime >= +task.estimatedTime);
      return;
    }

    const startTimestamp = task.startedAt;
    const spentBefore = task.spentTime;

    const updateTime = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTimestamp) / 1000);
      const total = spentBefore + elapsedSeconds;
      setCurrentTime(total);
      setIsOverdue(total >= +task.estimatedTime);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [task?.id, task?.startedAt, task?.status, task?.spentTime, task?.estimatedTime]);

  return { currentTime, isOverdue };
};
