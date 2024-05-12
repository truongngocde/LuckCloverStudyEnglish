import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import userInfoReducer from './slices/useInfoSlice';
import voiceReducer from './slices/voiceSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    userInfo: userInfoReducer,
    voice: voiceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
