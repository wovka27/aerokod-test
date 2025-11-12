import { combineReducers } from '@reduxjs/toolkit';

import filterReducer from '@entities/filter/model/filter.slice';
import { taskApi } from '@entities/task/api/task.api';
import { confirmModalReducer } from '@shared/ui/confirm-modal/model/confirm.slice';

export const rootReducer = combineReducers({
  [taskApi.reducerPath]: taskApi.reducer,
  filter: filterReducer,
  confirmModal: confirmModalReducer,
});
