import { useSelector } from 'react-redux';
import { socket } from '../App.js';
import { Formik, Form, Field } from 'formik';

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

  const showCurrentChannel = `#${getCurrentChannelName}`;

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

  const showMessages = messages.map((message) => {
    if (message.channelId !== currentChannel) {
      return null;
    }

    return (
      <div key={message.id}>
        {message.username}: {message.body}
      </div>
    );
  });

  return (
    <div className="col-9 border border-primary rounded">
      <div className="row h-100">
        <div className="col-12 mt-1 mb-1 text-primary">
          {showCurrentChannel}
          <br />
          {showMessagesNumber}
        </div>
        <div className="col-12 h-75">{showMessages}</div>
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
                  Послать
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
