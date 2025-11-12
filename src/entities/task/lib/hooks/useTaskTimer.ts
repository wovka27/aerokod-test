import { useEffect, useState } from 'react';

import type { ITask } from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';

interface TaskTimerState {
  currentTime: number;
  isOverdue: boolean;
}

export const useTaskTimer = (task: ITask | null): TaskTimerState => {
  const [currentTime, setCurrentTime] = useState<number>(task?.spentTime ?? 0);
  const [isOverdue, setIsOverdue] = useState<boolean>(false);

  useEffect(() => {
    if (!task || task.status !== TaskStatus.IN_PROGRESS || !task.startedAt) {
      setCurrentTime(task?.spentTime ?? 0);
      setIsOverdue(task?.status === TaskStatus.OVERDUE);
      return;
    }

    const updateTime = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - task.startedAt!) / 1_000);
      const total = task.spentTime + elapsedSeconds;
      setCurrentTime(total);
      setIsOverdue(total >= +task.estimatedTime);
    };

    updateTime();

    const interval = setInterval(updateTime, 1_000);
    return () => clearInterval(interval);
  }, [task]);

  return { currentTime, isOverdue };
};
