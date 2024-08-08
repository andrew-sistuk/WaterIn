import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './auth/slice';
import datesSlice from './dates/slice';
import filtersSlice from './filters/slice';
import { modalReducer } from './modal/slice.js';
import waterNoteSlice from './waterNote/slice';
import { setupAxiosInterceptors } from './auth/operations';
import daySlice from './day/slice';
import changeDayReducer from './changeDay/changeDay.js';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const authPersistReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
  reducer: {
    dates: datesSlice,
    auth: authPersistReducer,
    filter: filtersSlice,
    modal: modalReducer,
    waterNote: waterNoteSlice,
    day: daySlice,
    changeDay: changeDayReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);
export const persistor = persistStore(store);
export default store;
