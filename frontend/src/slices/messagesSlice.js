import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: {},
    ids: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      addMessages(state, { payload }) {
        const { entities, ids } = payload;
        state.entities = entities;
        state.ids = ids;
      },
    },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;