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
      userId: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user.userId;
        state.token = action.payload.data.accessToken;
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
        (state.token = null), state.isLoggedIn;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          id: action.payload.id,
          photo: action.payload.photo,
          sportHours: action.payload.sportHours,
          weight: action.payload.weight,
          waterRate: action.payload.waterRate,
          gender: action.payload.gender,
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

export default authSlice.reducer;
