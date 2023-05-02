import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';



// the function creates app's state (from differents slice-reducers)

const store = configureStore({
    reducer: {
      channelReducer,
      channelsReducer,
      messagesReducer,
    },
  });

  export default store;