import { useEffect } from 'react';

import { CloseIcon } from '@shared/ui/icons';
import type { ModalProps } from '@shared/ui/modal/model/modal.types';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay onClose={onClose} />
      <ModalContentContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalClose onClose={onClose} />
        </ModalHeader>
        <div className="p-6">{children}</div>
      </ModalContentContainer>
    </ModalContainer>
  );
};

type ChildrenType = React.FC<Pick<ModalProps, 'children'>>;
type CloseType = React.FC<Pick<ModalProps, 'onClose'>>;

const ModalContainer: React.FC<Omit<ModalProps, 'title'>> = ({ children, onClose, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">{children}</div>;
};

const ModalOverlay: CloseType = ({ onClose }) => {
  return (
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    />
  );
};
const ModalClose: CloseType = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="text-gray-400 hover:text-white transition-colors"
    >
      <CloseIcon />
    </button>
  );
};

const ModalContentContainer: ChildrenType = ({ children }) => {
  return (
    <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
      {children}
    </div>
  );
};
const ModalTitle: ChildrenType = ({ children }) => {
  return <h2 className="text-xl font-semibold text-white">{children}</h2>;
};
const ModalHeader: ChildrenType = ({ children }) => {
  return (
    <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      {children}
    </div>
  );
};
