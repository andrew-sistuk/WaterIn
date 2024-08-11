import { createSlice } from '@reduxjs/toolkit';

import { register, login, logout, refreshUser, getUser } from '../auth/operations';

const handlePending = state => {
  state.error = null;
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      id: null,
      photo: null,
      sportHours: null,
      weight: null,
      waterRate: null,
      gender: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          id: action.payload.data.userId,
          photo: action.payload.data.photo,
          sportHours: action.payload.data.sportHours,
          weight: action.payload.data.weight,
          waterRate: action.payload.data.waterRate,
          gender: action.payload.data.gender,
        };

        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.user.userId,
        };
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = {
          name: null,
          email: null,
          id: null,
          photo: null,
          sportHours: null,
          weight: null,
          waterRate: null,
          gender: null,
        };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = {
          name: null,
          email: null,
          id: null,
          photo: null,
          sportHours: null,
          weight: null,
          waterRate: null,
          gender: null,
        };
        state.loading = false;
        state.error = action.payload;
        (state.token = null), state.isLoggedIn;
        state.isLoggedIn = null;
        localStorage.setItem('accessToken', '');
      })

      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          name: action.payload.user.name,
          email: action.payload.user.email,
          id: action.payload.user._id,
          photo: action.payload.user.photo,
          sportHours: action.payload.user.sportHours,
          weight: action.payload.user.weight,
          waterRate: action.payload.user.waterRate,
          gender: action.payload.user.gender,
        };
      })
      .addCase(getUser.rejected, handleRejected)

      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
