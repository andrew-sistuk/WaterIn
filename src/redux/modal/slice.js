import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: null, // 'setting' або 'logout' або 'delete'
    modalId: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: state => {
      state.isOpen = false;
      state.modalType = null;
    },
    dataModalId: (state, action) => {
      state.modalId = action.payload;
    },
  },
});

export const { openModal, closeModal, dataModalId } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
