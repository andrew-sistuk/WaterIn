import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: null, // 'setting' або 'logout' або 'delete'
    modalId: null,
    modalInfo:null
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: state => {
      state.isOpen = false;
      state.modalType = null;
      state.modalId = null;
      state.modalInfo = null;
    },
    dataModalId: (state, action) => {
      state.modalId = action.payload;
    },
    dataInfo: (state, action) => {
      state.modalInfo = action.payload
    }
  },
});

export const { openModal, closeModal, dataModalId,dataInfo } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;