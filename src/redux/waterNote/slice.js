import { createSlice } from '@reduxjs/toolkit';
import { addWaterNote, deleteWaterNote, editWaterNote } from './operations';

const waterNoteSlice = createSlice({
  name: 'waterNote',
  initialState: {
    loading: false,
    isSuccess: false,
    isRejected: false,
  },

  extraReducers: builder =>
    builder
      .addCase(addWaterNote.pending, state => {
        state.loading = true;
        state.isSuccess = false;
        state.isRejected = false;
      })
      .addCase(addWaterNote.fulfilled, state => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(addWaterNote.rejected, state => {
        state.loading = false;
        state.isRejected = true;
      })
      .addCase(editWaterNote.pending, state => {
        state.loading = true;
        state.isSuccess = false;
        state.isRejected = false;
      })
      .addCase(editWaterNote.fulfilled, state => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(editWaterNote.rejected, state => {
        state.loading = false;
        state.isRejected = true;
      })
      .addCase(deleteWaterNote.pending, state => {
        state.loading = true;
        state.isSuccess = false;
        state.isRejected = false;
      })
      .addCase(deleteWaterNote.fulfilled, state => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteWaterNote.rejected, state => {
        state.loading = false;
        state.isRejected = true;
      }),
});

export default waterNoteSlice.reducer;
