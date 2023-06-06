import { 
  createSlice, 
  // current,
  } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

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
        // console.log(current(state));
      },
      addMessage(state, { payload }) {
        const { body, id } = payload;
        state.entities[id] = body;
        if (!state.ids.includes(id)) {
          state.ids.push(id);
        }
        // console.log(current(state));
      }
    },
    extraReducers: (builder) => {
      builder.addCase(channelsActions.removeChannel, (state, action) => {
        const { channelId } = action.payload;
        const updatesMessages = Object.entries(state.entities).reduce((acc, [ id, message ]) => {
          if (message.channelId !== channelId) {
            acc[id] = message;
          }
          return acc;
        }, {});
        // console.log(updatesMessages);
        state.entities = updatesMessages;  
        state.ids = Object.keys(updatesMessages).filter((id) => id !== channelId);
        // console.log(current(state));
      })
    },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;