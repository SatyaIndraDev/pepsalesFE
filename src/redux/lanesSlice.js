import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://pepsales-backend-hjst.onrender.com/lanes';

export const fetchLanes = createAsyncThunk('lanes/fetchLanes', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const moveBlockToServer = createAsyncThunk('lanes/moveBlockToServer', async ({ blockId, sourceLaneId, targetLaneId }, { getState }) => {
  const state = getState();
  const sourceLane = state.lanes.lanes.find(lane => lane.id === sourceLaneId);
  const block = sourceLane.blocks.find(b => b.id === blockId);

  const newHistory = [...block.history, { from: sourceLaneId, to: targetLaneId, date: new Date() }];
  const updatedBlock = { ...block, history: newHistory };

  await fetch(`${API_URL}/${targetLaneId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks: [...state.lanes.lanes.find(lane => lane.id === targetLaneId).blocks, updatedBlock] }),
  });

  await fetch(`${API_URL}/${sourceLaneId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks: sourceLane.blocks.filter(b => b.id !== blockId) }),
  });

  return { blockId, sourceLaneId, targetLaneId, updatedBlock };
});

const lanesSlice = createSlice({
  name: 'lanes',
  initialState: {
    lanes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLanes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lanes = action.payload;
      })
      .addCase(fetchLanes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(moveBlockToServer.fulfilled, (state, action) => {
        const { blockId, sourceLaneId, targetLaneId, updatedBlock } = action.payload;
        const sourceLane = state.lanes.find(lane => lane.id === sourceLaneId);
        const targetLane = state.lanes.find(lane => lane.id === targetLaneId);

        sourceLane.blocks = sourceLane.blocks.filter(b => b.id !== blockId);
        targetLane.blocks.push(updatedBlock);
      });
  },
});

export default lanesSlice.reducer;
