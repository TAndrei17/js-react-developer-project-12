import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/channelSlice.js';
import getData from '../api/get_data_axios.js';
import IncomeSockets from '../api/get_data_socket.jsx';

import ChannelsBlock from './components/channels_block.jsx';
import MessagesBlock from './components/messages_block.jsx';
import Header from './components/header_mainpage.jsx';
import ButtonsLng from './components/buttons_languages.jsx';
import StatusContext from '../context/index.js';

const MainPage = () => {
  const { setInactive } = useContext(StatusContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });

  useEffect(() => {
    const fetchData = async () => {
      const normalizeData = await getData();

      dispatch(
        channelsActions.addChannels({
          entities: normalizeData.allChannels,
          ids: Object.keys(normalizeData.allChannels),
        }),
      );

      dispatch(
        messagesActions.addMessages({
          entities: normalizeData.allMessages,
          ids: Object.keys(normalizeData.allMessages),
        }),
      );

      dispatch(currChannelActions.setChannel(normalizeData.data));
    };

    fetchData();
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    navigate('/login');
    localStorage.clear();
    setInactive();
  };

  return (
    <IncomeSockets>
      <ToastContainer />
      <Header>
        <div className="col-auto h3">
          <ButtonsLng />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOnClick}
          >
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
    </IncomeSockets>
  );
};

export default MainPage;
