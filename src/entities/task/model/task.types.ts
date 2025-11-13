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

export interface TaskCardProps {
  task: ITask;
  children: React.ReactNode;
}

export interface TaskCardContextType {
  task: ITask;
  currentTime?: number;
  isOverdue?: boolean;
  openEdit: () => void;
}

export interface TaskCardProgressProps {
  variant?: 'card' | 'detail';
}

export interface SpentTimeProps {
  currentTime?: number;
  isOverdue?: boolean;
}

export interface PercentProps {
  currentTime?: number;
}

export interface ProgressBarProps {
  currentTime?: number;
  isOverdue?: boolean;
}

export interface TitleProps {
  variant?: 'card' | 'detail';
}

export type TaskCardType = React.FC<TaskCardProps & { className?: string }> & {
  Header: React.FC<React.PropsWithChildren>;
  Title: React.FC<TitleProps>;
  Badge: React.FC;
  SpentTime: React.FC<SpentTimeProps>;
  Percent: React.FC<PercentProps>;
  EstimatedTime: React.FC;
  ProgressBar: React.FC<ProgressBarProps>;
  Description: React.FC;
  Progress: React.FC<React.PropsWithChildren<TaskCardProgressProps>>;
  Actions: React.FC<React.PropsWithChildren>;
  Edit: React.FC;
  Delete: React.FC;
  Start: React.FC;
  Stop: React.FC;
  Complete: React.FC;
};
