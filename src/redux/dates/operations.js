import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://waterin-server.onrender.com';

export const fetchDates = createAsyncThunk('dates/fetchDates/', async (dateMonth, thunkAPI) => {
  try {
    const response = await axios.get(`/water/month/${dateMonth}`);

    console.log('responsDate', response.data.data.waterNotes);
    return response.data.data.waterNotes;
  } catch (error) {
    console.log('catch (error)', dateMonth);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchDatesId = createAsyncThunk('dates/fetchDate', async (dateDay, thunkAPI) => {
  console.log('fetchDatesId', dateDay, new Date(dateDay));
  try {
    const response = await axios.get(`/water/day/${dateDay}`);

    console.log('Відповідь з бекенду', response.data.data);
    return response.data.data;
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
