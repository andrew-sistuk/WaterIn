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