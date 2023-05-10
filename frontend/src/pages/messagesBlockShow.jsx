import { useSelector } from 'react-redux';

const MessagesBlockShow = (props) => {
  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  return (
    <>
      <div className="col-12 h-75">
        {props.messages.map((message) => {
          if (message.channelId !== currentChannel) {
            return null;
          }

          return (
            <div key={message.id}>
              {message.username}: {message.body}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessagesBlockShow;
