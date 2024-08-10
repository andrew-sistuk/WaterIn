import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addWaterNote = createAsyncThunk('addWaterNote', async (payload, thunkAPI) => {
  const { volume, drinkTime, token } = payload;
  try {
    const response = await axios.post(
      '/water',
      { volume, drinkTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.data;
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
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteWaterNote = createAsyncThunk('deleteWaterNote', async (payload, thunkAPI) => {
  const { modalId, token } = payload;
  try {
    const response = await axios.delete(`/water/${modalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
