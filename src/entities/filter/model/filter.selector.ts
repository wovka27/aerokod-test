import type { FilterState } from '@entities/filter/model/filter.types';
import type { RootState } from '@shared/lib/store';

export const filterSelector = (state: RootState): FilterState => {
  return state.filter;
};
