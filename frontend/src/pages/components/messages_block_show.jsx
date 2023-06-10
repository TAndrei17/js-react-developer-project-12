import { useSelector } from 'react-redux';
// import { useContext } from 'react';
// mport StatusContext from '../../context/index.js';

const MessagesBlockShow = (props) => {
  // const { statusState } = useContext(StatusContext);
  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  return (
    <>
      <div
        id="messages-box"
        className="col-12 h-75 py-2 chat-messages overflow-auto">
        {props.messages.map((message) => {
          /* const isMyMessage = message.username === statusState.user;

          const divStyle = {
            display: 'inline-block',
            backgroundColor: isMyMessage ? '#FFF373' : '#eee',
          }; 
          
          style={divStyle}*/

          if (message.channelId !== currentChannel) {
            return null;
          }

          return (
            <div key={message.id} className="text-break mb-2 py-2 px-2">
              <b>{message.username}</b>: {message.body}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessagesBlockShow;
