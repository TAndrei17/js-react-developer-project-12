// import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/channelSlice.js';
// import store from '../slices/index.js';

// export const incomeSocketContext = createContext({});

const IncomeSockets = ({ children }) => {
  const dispatch = useDispatch();

  // body = { body: "new message", channelId: 7, id: 8, username: "admin" }
  // id = "message8"
  socket.on('newMessage', (payload) => {
    dispatch(
      messagesActions.addMessage({
        body: payload,
        id: `message${payload.id}`,
      }),
    );
  });

  // { id: 6, name: "new channel", removable: true }
  socket.on('newChannel', (payload) => {
    dispatch(
      channelsActions.addChannel({
        body: payload,
        id: `channel${payload.id}`,
      }),
    );
  });

  socket.on('newChannel', (payload) => {
    dispatch(currChannelActions.setChannel(payload.id));
  });

  // { id: 6 }
  socket.on('removeChannel', (payload) => {
    dispatch(
      channelsActions.removeChannel({
        id: `channel${payload.id}`,
        channelId: payload.id,
      }),
    );
    dispatch(currChannelActions.setChannel(1));
  });

  // { id: 7, name: "new name channel", removable: true }
  socket.on('renameChannel', (payload) => {
    dispatch(
      channelsActions.addChannel({
        body: payload,
        id: `channel${payload.id}`,
      }),
    );
  });

  return children;
};

export default IncomeSockets;
