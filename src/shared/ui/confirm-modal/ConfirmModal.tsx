'use client';

import { Button } from '@shared/ui/button/Button';
import { Modal } from '@shared/ui/modal/Modal';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onCancel}
    >
      {message && <p className="text-gray-300 mb-6">{message}</p>}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="ghost"
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
