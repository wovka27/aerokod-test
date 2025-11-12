import { configureStore } from '@reduxjs/toolkit';

import { taskApi } from '@entities/task/api/task.api';
import { createPersistedState } from '@shared/lib/store/persist/storage';

import { rootReducer } from './rootReducer';

export const makeStore = () => {
  type TempRootState = ReturnType<typeof rootReducer>;

  const isServer = typeof window === 'undefined';
  const persisted = !isServer
    ? createPersistedState<TempRootState>({
        key: 'app-store',
        whitelist: [],
      })
    : null;

  const preloadedState = !isServer ? persisted?.get() || undefined : undefined;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const base = getDefaultMiddleware().concat(taskApi.middleware);
      if (persisted?.middleware) return base.concat(persisted.middleware);
      return base;
    },
  });

  return store;
};

export const rootStore = makeStore();

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
