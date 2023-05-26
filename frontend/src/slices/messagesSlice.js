import { createSlice, current } from '@reduxjs/toolkit';
// import { actions as channelsActions } from './slices/channelsSlice.js';



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
        console.log(current(state));
      },
      addMessage(state, { payload }) {
        const { body, id } = payload;
        state.entities[id] = body;
        if (!state.ids.includes(id)) {
          state.ids.push(id);
        }
        console.log(current(state));
      }
    },
    // extraReducers - нужно удалить все сообщения удаленного канала
    // т.к. не использую адаптер, нужно вытаскивать ключ/значение и фильтовать
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;