import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchDates, addDate, deleteDates, patchDates } from './operations';
import { logout } from '../auth/operations';
import { selectDatesFilter } from '../filters/selectors';

const handlePending = state => {
  state.error = null;
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const datesSlice = createSlice({
  name: 'dates',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchDates.pending, handlePending)
      .addCase(fetchDates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDates.rejected, handleRejected)

      .addCase(addDate.pending, handlePending)
      .addCase(addDate.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addDate.rejected, handleRejected)

      .addCase(deleteDates.pending, handlePending)
      .addCase(deleteDates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(({ id }) => id !== action.payload.id);
      })
      .addCase(deleteDates.rejected, handleRejected)

      .addCase(logout.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })

      .addCase(patchDates.fulfilled, (state, action) => {
        state.change = false;
        const index = state.items.findIndex(({ id }) => id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      });
  },
});

export default datesSlice.reducer;
export const selectItems = state => state.dates.items;

export const selectFiltered = createSelector(
  [selectItems, selectDatesFilter],
  (contacts, filter) => {
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) || number.includes(filter)
    );
  }
);
