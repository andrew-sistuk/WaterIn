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

// код для тестування і перевірки роботи поки не готовий увесь функціонал

//  |
//  |
// \|/
//  '

// HomePage

// const data = {
//   volume: 250,
//   drinkTime: '12:30',
// };

// const dataAdd = {
//   data,
//   token: '6dnRGQB2oY2ZideJEP3Ou6h/v3HzGWX4ies/CLgz',
// };

// const dataEdit = {
//   data: {
//     volume: 150,
//     drinkTime: '10:30',
//     _id: '66b0cce75d5d61cd25a0ad79',
//   },
//   token: '6dnRGQB2oY2ZideJEP3Ou6h/v3HzGWX4ies/CLgz',
// };

// const dataDelete = {
//   data: {
//     _id: '66b0cce75d5d61cd25a0ad79',
//   },
//   token: '6dnRGQB2oY2ZideJEP3Ou6h/v3HzGWX4ies/CLgz',
// };

// const dispatch = useDispatch();

// const add = async () => {
//   const test1 = await dispatch(addWaterNote(dataAdd));

//   console.log(test1);
// };
// const update = async () => {
//   const test1 = await dispatch(editWaterNote(dataEdit));

//   console.log(test1);
// };
// const del = async () => {
//   const test1 = await dispatch(deleteWaterNote(dataDelete));

//   console.log(test1);
// };

// <button onClick={add}>Add</button>
// <button onClick={update}>Update</button>
// <button onClick={del}>Delete</button>
