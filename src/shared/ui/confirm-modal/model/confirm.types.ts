export type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
};

export type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};
