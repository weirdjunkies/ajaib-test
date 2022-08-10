import { configureStore } from '@reduxjs/toolkit';
import ajaibReducer from '../Reducer/ajaibReducer';

export const store = configureStore({
  reducer: {
    ajaibReducer: ajaibReducer
  },
});
