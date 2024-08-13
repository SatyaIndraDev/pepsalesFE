import { createSlice } from '@reduxjs/toolkit';

const blockDetailSlice = createSlice({
  name: 'blockDetail',
  initialState: null,
  reducers: {
    setBlockDetail: (state, action) => action.payload,
    clearBlockDetail: () => null,
  },
});

export const { setBlockDetail, clearBlockDetail } = blockDetailSlice.actions;

export default blockDetailSlice.reducer;
