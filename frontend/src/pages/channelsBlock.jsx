import { useSelector } from 'react-redux';

import CreateNewChannel from './modalWindows/channel_create.jsx';
import ChannelsList from './components/channels_list.jsx';

const ChannelsBlock = () => {
  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  return (
    <div className="col-3 border border-primary rounded">
      <div className="row mt-2 mb-2">
        <div className="col-10 h5 text-primary mt-2 mb-2">
          <strong>Каналы</strong>
        </div>
        <CreateNewChannel className="col" />
      </div>
      <div className="row h-100 overflow-auto">
        <ChannelsList channels={channels} />
      </div>
    </div>
  );
};

export default ChannelsBlock;
