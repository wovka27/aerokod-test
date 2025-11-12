import { combineReducers } from '@reduxjs/toolkit';

import filterReducer from '@entities/filter/model/filter.slice';
import { taskApi } from '@entities/task/api/task.api';

export const rootReducer = combineReducers({
  [taskApi.reducerPath]: taskApi.reducer,
  filter: filterReducer,
});
