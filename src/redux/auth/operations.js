import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: 'https://waterin-server.onrender.com',
  withCredentials: true, // Додає cookie до кожного запиту
});
// axios.defaults.baseURL = 'https://waterin-server.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk('users/register', async (newUser, thunkAPI) => {
  try {
    const response = await api.post('/users/register', newUser);
    setAuthHeader(response.data.data.accessToken);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('users/login', async (userInfo, thunkAPI) => {
  try {
    const response = await api.post('/users/login', userInfo);
    setAuthHeader(response.data.data.accessToken);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUser = createAsyncThunk('users/', async (userId, thunkAPI) => {
  try {
    const response = await api.get('/users', userId);
    setAuthHeader(response.data.accessToken);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'users/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const token = reduxState.auth.token;
    try {
      setAuthHeader(token);
      const response = await api.post('/users/refresh');

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;

      return token !== null;
    },
  }
);
