import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ConfirmModalState {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const initialState: ConfirmModalState = {
  isOpen: false,
  title: 'Подтверждение',
  message: '',
  onConfirm: undefined,
  onCancel: undefined,
};

const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    openConfirmModal: (state, action: PayloadAction<Omit<ConfirmModalState, 'isOpen'>>) => {
      Object.assign(state, { ...action.payload, isOpen: true });
    },
    closeConfirmModal: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { openConfirmModal, closeConfirmModal } = confirmModalSlice.actions;
export const confirmModalReducer = confirmModalSlice.reducer;
