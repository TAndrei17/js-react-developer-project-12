import { useSelector } from 'react-redux';

const ChannelsBlock = () => {
  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  const showChannels = channels.map((channel) => {
    if (channel.id === currentChannel) {
      return (
        <li key={channel.id} className="col-12">
          <span>
            <strong>#{channel.name}</strong>
          </span>
        </li>
      );
    }
    return (
      <li key={channel.id} className="col-12">
        <span>#{channel.name}</span>
      </li>
    );
  });

  return (
    <div className="col-3 text-primary border border-primary rounded">
      <div className="row">
        <div className="col-10 mt-2 mb-2">
          <strong>Каналы</strong>
        </div>
        <button className="col m-2 p-0 btn btn-primary text-center">+</button>
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {showChannels}
        </ul>
      </div>
    </div>
  );
};

export default ChannelsBlock;
