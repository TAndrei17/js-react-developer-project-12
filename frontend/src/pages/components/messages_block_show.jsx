import { useSelector } from 'react-redux';

const MessagesBlockShow = (props) => {
  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  return (
    <div id="messages-box" className="col-12 h-75 py-2 overflow-auto">
      {props.messages.map((message) => {
        const isMyMessage = message.username === localStorage.username;

        const divStyle = {
          display: 'inline-block',
          backgroundColor: isMyMessage ? '#FFF373' : '#eee',
        };

        if (message.channelId !== currentChannel) {
          return null;
        }

        return (
          <div key={message.id}>
            <div className="mb-2 py-2 px-2 rounded" style={divStyle}>
              <span>
                <strong>{message.username}:</strong> {message.body}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesBlockShow;
