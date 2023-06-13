import React, { useEffect, useRef } from 'react';

const MessagesBlockBody = (props) => {
  const { id, messages } = props;
  const messageRef = useRef(null);

  const currentMessages = messages.filter(
    (message) => message.channelId === id,
  );
  const lastMessage = currentMessages[currentMessages.length - 1];

  useEffect(() => {
    if (lastMessage) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });

  return (
    <div className="col-12 h-75 overflow-auto">
      <div id="messages-box" className="col-12 h-100 py-2 overflow-auto">
        {currentMessages.map((message) => {
          const isMyMessage = message.username === localStorage.username;

          const divStyle = {
            display: 'inline-block',
            backgroundColor: isMyMessage ? '#FFF373' : '#eee',
          };

          return (
            <div key={message.id} ref={messageRef}>
              <div className="mb-2 py-2 px-2 rounded" style={divStyle}>
                <span>
                  <strong>
                    {message.username}
                    :
                    {' '}
                  </strong>
                  {message.body}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesBlockBody;
