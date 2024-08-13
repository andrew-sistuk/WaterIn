import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operations';
axios.defaults.baseURL = 'https://waterin-server.onrender.com';

export const fetchDatesId = createAsyncThunk('dates/fetchDate', async (dateDay, thunkAPI) => {
  try {
    const response = await api.get(`/water/day/${dateDay}`);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
// =============================================
export const addWaterNote = createAsyncThunk('addWaterNote', async (payload, thunkAPI) => {
  const { volume, drinkTime, lastDay } = payload;
  const createdAt = lastDay + 10800000;

  try {
    const response = await api.post('/water', { volume, drinkTime, createdAt });

    return await response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editWaterNote = createAsyncThunk('editWaterNote', async (payload, thunkAPI) => {
  const { volume, drinkTime, _id } = payload;
  try {
    const response = await api.patch(`/water/${_id}`, { volume, drinkTime });

    return await response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteWaterNote = createAsyncThunk('deleteWaterNote', async ({ _id }, thunkAPI) => {
  try {
    const response = await api.delete(`/water/${_id}`);
    return await response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
