import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentChannel: '',
};

const channelSlice = createSlice({
    name: 'currentChannel',
    initialState,
    reducers: {
      setChannel(state, { payload }) {
        state.currentChannel = payload;
        console.log(current(state));
      },
    },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;
