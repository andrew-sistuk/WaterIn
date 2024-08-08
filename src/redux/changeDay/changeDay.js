import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const changeDaySlice = createSlice({
  name: 'changeDay',
  initialState: {
    items: new Date().getTime(),
  },
  reducers: {
    addDay(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addDay } = changeDaySlice.actions;

export default changeDaySlice.reducer;

const selectChangeDay = state => state.changeDay;

export const selectItemsDay = createSelector([selectChangeDay], changeDay => changeDay.items);
