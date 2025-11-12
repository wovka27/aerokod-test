'use client';

import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { Button } from '@shared/ui/button/Button';
import { closeConfirmModal } from '@shared/ui/confirm-modal/model/confirm.slice';
import { Modal } from '@shared/ui/modal/Modal';

const ConfirmModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, title, message, onConfirm, onCancel } = useAppSelector((state) => state.confirmModal);

  const handleCancel = () => {
    onCancel?.();
    dispatch(closeConfirmModal());
  };

  const handleConfirm = () => {
    onConfirm?.();
    dispatch(closeConfirmModal());
  };

  return (
    <Modal
      title={title!}
      isOpen={isOpen}
      onClose={() => dispatch(closeConfirmModal())}
    >
      <h3 className="text-gray-300 text-lg mb-6">{message}</h3>
      <div className="grid grid-cols-2 gap-6">
        <Button
          variant="ghost"
          onClick={handleCancel}
        >
          Отмена
        </Button>
        <Button onClick={handleConfirm}>Oк</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
