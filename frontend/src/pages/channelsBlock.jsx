import { useSelector } from 'react-redux';

const ChannelsBlock = () => {
  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );
  // console.log(currentChannel);

  const showChannels = channels.map((channel) => {
    if (channel.id === currentChannel) {
      return (
        <div key={channel.id} className="col-12">
          <strong>{`#${channel.name}`}</strong>
        </div>
      );
    }
    return <div key={channel.id} className="col-12">{`#${channel.name}`}</div>;
  });

  return (
    <div className="col-4 text-primary border border-primary">
      <div className="row">
        <div className="col-10 mt-2 mb-2">
          <strong>Каналы</strong>
        </div>
        <button className="col m-2 p-0 btn btn-primary text-center">+</button>
        {showChannels}
      </div>
    </div>
  );
};

export default ChannelsBlock;
