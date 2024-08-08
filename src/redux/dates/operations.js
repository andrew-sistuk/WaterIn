import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operations';

axios.defaults.baseURL = 'https://waterin-server.onrender.com';

export const fetchDates = createAsyncThunk('dates/fetchDates/', async (dateMonth, thunkAPI) => {
  try {
    const response = await api.get(`/water/month/${dateMonth}`);

    return response.data.data.waterNotes;
  } catch (error) {
    console.log('catch (error)', dateMonth);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addDate = createAsyncThunk('datres/addDates', async (newDates, thunkAPI) => {
  try {
    const response = await api.post('/dates', newDates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteDates = createAsyncThunk('dates/deleteDates', async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/dates/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const patchDates = createAsyncThunk('dates/patchDates', async ({ id, change }, thunkAPI) => {
  try {
    const response = await api.patch(`/dates/${id}`, change);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
