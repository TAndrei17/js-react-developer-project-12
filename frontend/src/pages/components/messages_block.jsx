import { useSelector } from 'react-redux';

import MessagesBlockBody from './messages_block_body.jsx';
import MessagesBlockHeader from './messages_block_header.jsx';
import MessagesBlockFooter from './messages_block_footer.jsx';

const MessagesBlock = () => {
  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel,
  );

  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id],
    );
    return getChannels;
  });

  const messages = useSelector((state) => {
    const getMessages = state.messagesReducer.ids.map(
      (id) => state.messagesReducer.entities[id],
    );
    return getMessages;
  });

  return (
    <div className="col-8 border border-1 h-100 m-0">
      <div className="row h-100 pb-3 w-auto">
        <MessagesBlockHeader id={currentChannel} channels={channels} messages={messages} />
        <MessagesBlockBody id={currentChannel} messages={messages} />
        <MessagesBlockFooter id={currentChannel} />
      </div>
    </div>
  );
};

export default MessagesBlock;
