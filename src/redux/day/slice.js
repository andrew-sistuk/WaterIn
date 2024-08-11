import { createSlice } from '@reduxjs/toolkit';
import { fetchDatesId, addWaterNote, editWaterNote, deleteWaterNote } from './operations';

const handlePending = state => {
  state.error = null;
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const daySlice = createSlice({
  name: 'day',
  initialState: {
    items: [],
    loading: false,
    error: null,
    isSuccess: false,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchDatesId.pending, handlePending)
      .addCase(fetchDatesId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDatesId.rejected, handleRejected)
      .addCase(addWaterNote.pending, state => {
        state.loading = true;
        state.isSuccess = false;
        state.error = false;
      })
      .addCase(addWaterNote.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.items.push(action.payload);
      })
      .addCase(addWaterNote.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editWaterNote.pending, state => {
        state.loading = true;
        state.isSuccess = false;
        state.error = false;
      })
      .addCase(editWaterNote.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.items = state.items.map(water =>
          water._id === action.payload._id ? action.payload : water
        );
      })
      .addCase(editWaterNote.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteWaterNote.pending, state => {
        state.loading = true;
        state.isSuccess = false;
        state.error = false;
      })
      .addCase(deleteWaterNote.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.items = state.items.filter(water => water._id !== action.payload._id);
      })
      .addCase(deleteWaterNote.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default daySlice.reducer;
export const selectItems = state => state.dates.items;
