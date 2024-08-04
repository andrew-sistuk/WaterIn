import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://660b09f1ccda4cbc75dc4e14.mockapi.io';

export const fetchDates = createAsyncThunk('dates/fetchDates', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/dates');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchDatesId = createAsyncThunk('dates/fetchDatesId', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/dates/${id}`);
    console.log('відповідь', response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addDate = createAsyncThunk('datres/addDates', async (newDates, thunkAPI) => {
  try {
    const response = await axios.post('/dates', newDates);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteDates = createAsyncThunk('dates/deleteDates', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`/dates/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const patchDates = createAsyncThunk('dates/patchDates', async ({ id, change }, thunkAPI) => {
  try {
    const response = await axios.patch(`/dates/${id}`, change);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
