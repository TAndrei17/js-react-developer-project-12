import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: {},
    ids: [],
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      addChannels(state, { payload }) {
        const { entities, ids } = payload;
        state.entities = entities;
        state.ids = ids;
      },
    },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;

