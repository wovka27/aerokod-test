import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { FilterState } from '@entities/filter/model/filter.types';
import { SearchFilterType } from '@entities/task/model/task.types';

const initialState: FilterState = {
  type: SearchFilterType.NAME,
  value: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    clearFilter: () => initialState,
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
