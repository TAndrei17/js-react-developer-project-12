// import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/channelSlice.js';

import ChannelsBlock from './components/channels_block.jsx';
import MessagesBlock from './components/messages_block.jsx';
import Header from './components/header.jsx';
import { socket } from '../App.js';

const Mainpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // { id: 6, name: "new channel", removable: true }
  socket.on('newChannel', (payload) => {
    dispatch(
      channelsActions.addChannel({
        body: payload,
        id: `channel${payload.id}`,
      })
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
      })
    );
    dispatch(currChannelActions.setChannel(1));
  });

  // { id: 7, name: "new name channel", removable: true }
  socket.on('renameChannel', (payload) => {
    dispatch(
      channelsActions.addChannel({
        body: payload,
        id: `channel${payload.id}`,
      })
    );
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    navigate('/login');
    localStorage.clear();
  };

  return (
    <>
      <Header>
        <div className="col-auto h3">
          <button className="btn btn-primary" onClick={handleOnClick}>
            Выйти
          </button>
        </div>
      </Header>
      <div className="container vh-100">
        <div className="row h-75">
          <ChannelsBlock />
          <MessagesBlock />
        </div>
      </div>
    </>
  );
};

export { Mainpage };
