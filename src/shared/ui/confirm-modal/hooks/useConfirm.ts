import { useAppDispatch } from '@shared/lib/hooks/redux';
import type { ConfirmModalState } from '@shared/ui/confirm-modal/model/confirm.slice';
import { openConfirmModal } from '@shared/ui/confirm-modal/model/confirm.slice';

export const useConfirm = () => {
  const dispatch = useAppDispatch();

  return {
    open: (options: Omit<ConfirmModalState, 'isOpen'>) => dispatch(openConfirmModal(options)),
  };
};
