export interface PersistConfig<S> {
  key: string;
  storage?: Storage;
  whitelist?: (keyof S)[];
  migrate?: (state: unknown) => S;
}

export const createPersistedState = <S>(config: PersistConfig<S>) => {
  const { key, storage = typeof window !== 'undefined' ? window.localStorage : undefined, whitelist, migrate } = config;

  const isBrowser = typeof window !== 'undefined';

  const get = (): S | null => {
    if (!isBrowser || !storage) return null;
    try {
      const raw = storage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return migrate ? migrate(parsed) : (parsed as S);
    } catch {
      return null;
    }
  };

  const set = (state: S): void => {
    if (!isBrowser || !storage) return;
    try {
      const stateToSave = whitelist
        ? Object.fromEntries(
            Object.entries(state as Record<string, unknown>).filter(([k]) => whitelist.includes(k as keyof S))
          )
        : state;
      storage.setItem(key, JSON.stringify(stateToSave));
    } catch {
      //
    }
  };

  const middleware = (store: { getState(): S }) => (next: (action: unknown) => unknown) => (action: any) => {
    const result = next(action);
    const type = typeof action?.type === 'string' ? action.type : '';
    if (type && !type.startsWith('@@redux/') && !type.startsWith('api/')) {
      const state = store.getState();
      set(state);
    }
    return result;
  };

  return { get, set, middleware };
};
