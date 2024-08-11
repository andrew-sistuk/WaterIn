import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken } from './slice';

export const api = axios.create({
  baseURL: 'https://waterin-server.onrender.com',
  // baseURL: 'http://localhost:3000',
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
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
});

////////////////////////////////////////////////////
export const refreshFunction = createAsyncThunk('users/refresh-user', async (_, thunkAPI) => {
  try {
    const response = await api.post('/users/refresh-user');
    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

//////////////////////////////////////////
const logoutUser = async () => {
  await logout()
  window.location.reload();
}

api.interceptors.response.use(
  (response) => {
    if(response.status === 409) {
      console.log('start logout')
    }
    
    return response;
  },
  (error) => {
    if (error.response.status === 409){
      logoutUser()
    }
    return Promise.reject(error);
  }
)
/////////////////////////////////////////////////
export const refresh = async () => {
  try {
    const response = await api.post('/users/refresh');
    setAuthHeader(response.data.data.accessToken)
    return response.data.data.accessToken
  } catch (error) {
    console.log(error.message);
  }
 }
//////////////////////////////////////////////////

export const getUser = createAsyncThunk('users/', async (userId, thunkAPI) => {
  try {
    const response = await api.get(`/users/${userId}`);
    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const patchUser = createAsyncThunk(
//   'users/patch',
//   async ({ testId, userPatch }, thunkAPI) => {
//     try {
//       const response = await api.patch(`/users/${testId}`, userPatch);
//       setAuthHeader(response.data.data.accessToken);

//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const patchUser = createAsyncThunk('users/patch', async ({ Id, userPatch }, thunkAPI) => {
  try {
    const formData = new FormData();

    formData.append('email', userPatch.email);
    formData.append('name', userPatch.name);
    formData.append('sportHours', userPatch.sportHours);
    formData.append('weight', userPatch.weight);
    formData.append('waterRate', userPatch.waterRate);
    formData.append('gender', userPatch.gender);
    formData.append('photo', userPatch.photo);

    const response = await api.patch(`/users/${Id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setAuthHeader(response.data.data.accessToken);

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
