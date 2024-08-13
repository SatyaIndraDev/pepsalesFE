import { configureStore } from '@reduxjs/toolkit';
import lanesReducer from './lanesSlice';
import blockDetailReducer from './blockDetailSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    lanes: lanesReducer,
    blockDetail: blockDetailReducer,
    filters: filterReducer,
  },
});
