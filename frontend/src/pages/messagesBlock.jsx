import { useSelector } from 'react-redux';

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

  const getCurrentName = channels.map((channel) => {
    if (channel.id === currentChannel) {
      return `#${channel.name}`;
    }
    return null;
  });

  const messages = useSelector((state) => {
    const getMessages = state.messagesReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getMessages;
  });

  const getMessagesNumber = messages.filter(
    (message) => message.channelId === currentChannel
  );

  const showMessagesNumber = `${getMessagesNumber.length} сообщений`;
  const showMessages = messages.forEach((message) => {
    return (
      <div key={message.id}>
        {message.username}: {message.body}
      </div>
    );
  });

  return (
    <div className="col-9 border border-primary rounded">
      <div className="row h-100">
        <div className="col-12 mt-2 mb-2 text-primary">
          {getCurrentName}
          <br />
          {showMessagesNumber}
        </div>
        <div className="col-12 h-75 m-auto text-primary">{showMessages}</div>
        <div className="col-12">
          <form>
            <div class="input-group mb-3">
              <input
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
                type="button"
                id="button-addon2">
                Послать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesBlock;
