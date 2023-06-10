import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import StatusContext from '../../context/index.js';

import { Formik, Form, Field } from 'formik';

import MessagesBlockShow from './messages_block_show.jsx';
import { socket } from '../../App.js';
import { notifyNoConnection } from '../popup_messages/messages.js';
import { textFilter, getLanguage } from '../filter_text/index.js';

const MessagesBlock = () => {
  const { statusState } = useContext(StatusContext);
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });
  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  const getCurrentChannelName = channels.reduce((acc, channel) => {
    if (channel.id === currentChannel) {
      acc = channel.name;
    }
    return acc;
  }, '');

  const showCurrentChannel = `# ${getCurrentChannelName}`;

  const messages = useSelector((state) => {
    const getMessages = state.messagesReducer.ids.map(
      (id) => state.messagesReducer.entities[id]
    );
    return getMessages;
  });

  const getMessagesNumber = messages.filter(
    (message) => message.channelId === currentChannel
  );

  const showMessagesNumber = `${t('message', {
    count: getMessagesNumber.length,
  })}`;

  return (
    <>
      <div className="col-8 border border-1 h-100 m-0">
        <div className="row h-100 pb-3 w-auto">
          <div className="col-12 h-auto py-2 text-primary shadow">
            <span className="h6">{showCurrentChannel}</span>
            <br />
            <span>{showMessagesNumber}</span>
          </div>
          <MessagesBlockShow messages={messages} />
          <Formik
            initialValues={{ body: '' }}
            onSubmit={(values, { resetForm }) => {
              const { body } = values;
              textFilter.loadDictionary(getLanguage(body));
              const cleanValues = textFilter.clean(body);
              // console.log(statusState.user);
              const newMessage = Object.assign(
                { channelId: currentChannel, username: statusState.user },
                { body: cleanValues }
              );
              // console.log(newMessage);
              socket.emit('newMessage', newMessage, (response) => {
                // console.log(response.status);
                if (response.status !== 'ok') {
                  notifyNoConnection();
                }
              });
              resetForm();
            }}>
            {({ isSubmitting }) => (
              <div className="col-12 m-0">
                <Form noValidate>
                  <div className="input-group has-validation">
                    <Field
                      name="body"
                      id="newMessage"
                      type="text"
                      className="form-control border-primary"
                      placeholder={t('messageField')}
                      aria-label={t('ariaLabel')}
                    />
                    <label htmlFor="newMessage" className="visually-hidden">
                      {t('ariaLabel')}
                    </label>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      id="buttonSendMessage"
                      disabled={isSubmitting}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                      </svg>
                      <label className="visually-hidden">
                        {t('messageSend')}
                      </label>
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default MessagesBlock;
