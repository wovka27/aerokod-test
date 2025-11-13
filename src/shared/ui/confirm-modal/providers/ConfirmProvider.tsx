'use client';

import { createContext, useContext, useState } from 'react';

import ConfirmModal from '@shared/ui/confirm-modal/ConfirmModal';
import type { ConfirmContextType, ConfirmOptions } from '@shared/ui/confirm-modal/model/confirm.types';

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<(ConfirmOptions & { resolve?: (value: boolean) => void }) | null>(null);

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        ...options,
        resolve,
      });
    });
  };

  const handleConfirm = async () => {
    if (state?.onConfirm) {
      await state.onConfirm();
    }
    state?.resolve?.(true);
    setState(null);
  };

  const handleCancel = () => {
    state?.onCancel?.();
    state?.resolve?.(false);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <ConfirmModal
          isOpen={!!state}
          title={state.title || 'Подтверждение'}
          message={state.message}
          confirmText={state.confirmText || 'ОК'}
          cancelText={state.cancelText || 'Отмена'}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ((options: ConfirmOptions) => Promise<boolean>) => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useConfirm must be used within ConfirmProvider');
  return context.confirm;
};
