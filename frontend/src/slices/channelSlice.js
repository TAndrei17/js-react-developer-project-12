import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentChannel: '',
};

const channelSlice = createSlice({
    name: 'currentChannel',
    initialState,
    reducers: {
      setChannel(state, { payload }) {
        state.currentChannel = payload;
      },
    },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;
