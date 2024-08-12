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
  const { volume, drinkTime, token, lastDay } = payload;
  const createdAt = lastDay + 43200000;

  try {
    const response = await axios.post(
      '/water',
      { volume, drinkTime, createdAt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editWaterNote = createAsyncThunk('editWaterNote', async (payload, thunkAPI) => {
  const { volume, drinkTime, _id, token } = payload;
  try {
    const response = await axios.patch(
      `/water/${_id}`,
      { volume, drinkTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteWaterNote = createAsyncThunk(
  'deleteWaterNote',
  async ({ _id, token }, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
