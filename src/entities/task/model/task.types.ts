export const enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
}

export const enum SearchFilterType {
  NAME = 'name',
  DESCRIPTION = 'description',
}

export interface ITask {
  id: string;
  name: string;
  description: string;
  estimatedTime: number | string;
  spentTime: number;
  status: TaskStatus;
  startedAt?: number;
  createdAt: number;
}

export interface CreateTaskDto extends Pick<ITask, 'name' | 'description'> {
  estimatedTime: number | string;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;
