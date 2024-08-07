import { createSlice } from '@reduxjs/toolkit';
import { fetchDatesId } from './operations';

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
  },

  extraReducers: builder => {
    builder
      .addCase(fetchDatesId.pending, handlePending)
      .addCase(fetchDatesId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDatesId.rejected, handleRejected);
  },
});

export default daySlice.reducer;
export const selectItems = state => state.dates.items;
