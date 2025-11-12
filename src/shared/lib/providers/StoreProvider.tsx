'use client';

import { Provider } from 'react-redux';

import { rootStore } from '@shared/lib/store';

interface Props {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={rootStore}>{children}</Provider>;
};
