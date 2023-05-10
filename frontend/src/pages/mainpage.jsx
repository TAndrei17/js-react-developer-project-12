import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/channelSlice.js';

import ChannelsBlock from './channelsBlock.jsx';
import MessagesBlock from './messagesBlock.jsx';
import { socket } from '../App.js';

const Mainpage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      const normalizeData = {
        allChannels: {},
        allMessages: {},
      };

      data.channels.forEach((channel) => {
        const { allChannels } = normalizeData;
        const nameProperty = `channel${channel.id}`;
        allChannels[nameProperty] = channel;
      });

      data.messages.forEach((message) => {
        const { allMessages } = normalizeData;
        const nameProperty = `message${message.id}`;
        allMessages[nameProperty] = message;
      });

      dispatch(
        channelsActions.addChannels({
          entities: normalizeData.allChannels,
          ids: Object.keys(normalizeData.allChannels),
        })
      );

      dispatch(
        messagesActions.addMessages({
          entities: normalizeData.allMessages,
          ids: Object.keys(normalizeData.allMessages),
        })
      );

      dispatch(currChannelActions.setChannel(data.currentChannelId));
    };

    fetchData();
  });

  // body = { body: "new message", channelId: 7, id: 8, username: "admin" }
  // id = "message8"
  socket.on('newMessage', (payload) => {
    dispatch(
      messagesActions.addMessage({
        body: payload,
        id: `message${payload.id}`,
      })
    );
  });

  return (
    <div className="container vh-100">
      <div className="row mb-3 mt-3">
        <h1 className="col-auto me-auto h3 text-primary">Мелеграм-Чат</h1>
        <div className="col-auto h3">
          <Link to="/loginpage" className="btn btn-primary">
            Выйти
          </Link>
        </div>
      </div>
      <div className="row h-75">
        <ChannelsBlock />
        <MessagesBlock />
      </div>
    </div>
  );
};

export { Mainpage };
