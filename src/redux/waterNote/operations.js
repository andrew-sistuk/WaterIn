import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addWaterNote = createAsyncThunk('addWaterNote', async (payload, thunkAPI) => {
  try {
    const response = await axios.post('https://waterin-server.onrender.com/water', payload.data, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editWaterNote = createAsyncThunk('editWaterNote', async (payload, thunkAPI) => {
  const newWaterNote = { volume: payload.data.volume, drinkTime: payload.data.drinkTime };
  try {
    const response = await axios.patch(
      `https://waterin-server.onrender.com/water/${payload.data._id}`,
      newWaterNote,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteWaterNote = createAsyncThunk('deleteWaterNote', async (payload, thunkAPI) => {
  try {
    const response = await axios.delete(
      `https://waterin-server.onrender.com/water/${payload.data._id}`,

      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});