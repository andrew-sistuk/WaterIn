import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setToken } from './slice';
import CryptoJS from 'crypto-js';

export const api = axios.create({
  baseURL: 'https://waterin-server.onrender.com',
  withCredentials: true, // Додає cookie до кожного запиту
});

export const setAuthHeader = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk('users/register', async (newUser, thunkAPI) => {
  try {
    const hash = CryptoJS.SHA256(newUser.password).toString(CryptoJS.enc.Hex);

    const response = await api.post('/users/register', { ...newUser, password: hash });
    setAuthHeader(response.data.data.accessToken);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('users/login', async (userInfo, thunkAPI) => {
  try {
    const hash = CryptoJS.SHA256(userInfo.password).toString(CryptoJS.enc.Hex);
    const response = await api.post('/users/login', { ...userInfo, password: hash });
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
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const response = await api.post('/users/refresh-user', {});
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (refreshError) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue('Session expired. Please log in again.');
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedUserId = reduxState.auth.user.id;
      return savedUserId !== null;
    },
  }
);

export const getUser = createAsyncThunk('users/', async (userId, thunkAPI) => {
  try {
    const response = await api.get(`/users/${userId}`);
    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const patchUser = createAsyncThunk('users/patch', async ({ Id, userPatch }, thunkAPI) => {
  try {
    const response = await api.patch(`/users/${Id}`, userPatch, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logInWithGoogle = createAsyncThunk(
  'users/googleLogin',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.get('/users/confirm-google-auth', credentials);
      setAuthHeader(res.data.token);
      toast.success(res.data.message);

      const profileRes = await axios.get('/users/profile');

      return { ...res.data, user: profileRes.data };
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setupAxiosInterceptors = store => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { refreshToken } = store.getState().auth;
          const { data } = await axios.post('/users/refresh', { refreshToken });

          setAuthHeader(data.token);
          store.dispatch(setToken({ token: data.token, refreshToken: data.refreshToken }));
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};

export const getRefreshToken = async (dispatch, token, refreshToken) => {
  try {
    const response = await axios.post(
      '/users/refresh',
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { token: newToken, refreshToken: newRefreshToken } = response.data;
    dispatch(setToken({ token: newToken, refreshToken: newRefreshToken }));
  } catch (error) {
    console.error('Error fetching refresh token:', error);
  }
};
