import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/channelSlice.js';
import { socket } from '../App.js';

import ChannelsBlock from './components/channels_block.jsx';
import MessagesBlock from './components/messages_block.jsx';
import Header from './components/header.jsx';
import ButtonsLng from './components/buttons_languages.jsx';
import StatusContext from '../context/index.js';

const Mainpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });

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

  const { setInactive, removeUser } = useContext(StatusContext);

  const handleOnClick = (e) => {
    e.preventDefault();
    navigate('/login');
    localStorage.clear();
    removeUser();
    setInactive();
  };

  return (
    <>
      <ToastContainer />
      <Header>
        <div className="col-auto h3">
          <ButtonsLng />
          <button className="btn btn-primary" onClick={handleOnClick}>
            {t('logoutButton')}
          </button>
        </div>
      </Header>
      <div className="container h-75 my-4 shadow">
        <div className="row h-100">
          <ChannelsBlock />
          <MessagesBlock />
        </div>
      </div>
    </>
  );
};

export { Mainpage };
