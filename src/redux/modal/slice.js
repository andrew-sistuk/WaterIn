import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: null, // 'setting' або 'logout' або 'delete'
    initialData: {},
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
      state.initialData = action.payload.data || {};
    },
    closeModal: state => {
      state.isOpen = false;
      state.modalType = null;
      state.initialData = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
