import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/channelSlice.js';

import ChannelsBlock from './channelsBlock.jsx';
import MessagesBlock from './messagesBlock.jsx';

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
        channels: {},
        messages: {},
      };

      data.channels.forEach((channel) => {
        const { channels } = normalizeData;
        const nameProperty = `channel${channel.id}`;
        channels[nameProperty] = channel;
      });

      data.messages.forEach((message) => {
        const { messages } = normalizeData;
        const nameProperty = `message${message.id}`;
        messages[nameProperty] = message;
      });

      dispatch(
        channelsActions.addChannels({
          entities: normalizeData.channels,
          ids: Object.keys(normalizeData.channels),
        })
      );

      dispatch(
        messagesActions.addMessages({
          entities: normalizeData.messages,
          ids: Object.keys(normalizeData.messages),
        })
      );

      dispatch(currChannelActions.setChannel(data.currentChannelId));
    };

    fetchData();
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
