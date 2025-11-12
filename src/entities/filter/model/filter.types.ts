import type { SearchFilterType } from '@entities/task/model/task.types';

export interface FilterState {
  type: SearchFilterType;
  value: string;
}