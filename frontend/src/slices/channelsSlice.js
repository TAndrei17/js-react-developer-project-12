import { createSlice, current } from '@reduxjs/toolkit';

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
        console.log(current(state));
      },
      addChannel(state, { payload }) {
        const { body, id } = payload;
        state.entities[id] = body;
        if (!state.ids.includes(id)) {
          state.ids.push(id);
        }
        console.log(current(state));
      },
      removeChannel(state, {payload}) {
        const { id } = payload;
        delete state.entities[id];
        state.ids = state.ids.filter((channelId) => channelId !== id);
        console.log(current(state));
      },
    },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;

