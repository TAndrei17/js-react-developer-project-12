import { useSelector } from 'react-redux';
import { socket } from '../../App.js';
import { Formik, Form, Field } from 'formik';
import MessagesBlockShow from './messages_block_show.jsx';

const MessagesBlock = () => {
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

  const showMessagesNumber = `Сообщений: ${getMessagesNumber.length}`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => <MessagesBlockShow messages={messages} />, [currentChannel]);

  return (
    <div className="col-9 border border-primary rounded">
      <div className="row h-100">
        <div className="col-12 mt-1 mb-1 text-primary">
          <span className="h6">{showCurrentChannel}</span>
          <br />
          <span>{showMessagesNumber}</span>
        </div>
        <MessagesBlockShow messages={messages} />
        <Formik
          initialValues={{ body: '' }}
          onSubmit={(values, { resetForm }) => {
            const newMessage = Object.assign(
              { channelId: currentChannel, username: localStorage.username },
              values
            );
            socket.emit('newMessage', newMessage, (response) => {
              console.log(response.status);
            });
            resetForm();
          }}>
          <div className="col-12">
            <Form>
              <div className="input-group mb-3">
                <Field
                  autoFocus
                  name="body"
                  type="text"
                  className="form-control border-primary text-primary"
                  placeholder="Введите сообщение..."
                  aria-label="Новое сообщение"
                  aria-describedby="button-addon2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Привет, мир!"
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  id="button-addon2">
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
                  <span className="visually-hidden">Отправить</span>
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default MessagesBlock;
