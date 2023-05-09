import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../slices/channelSlice.js';

const ChannelsBlock = () => {
  const dispatch = useDispatch();

  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  const channelsList = useRef(null);
  const onChannelClick = (event) => {
    event.preventDefault();
    const { target } = event;
    console.log(target.id);
    dispatch(currChannelActions.setChannel(target.id));
  };

  const showChannels = channels.map((channel) => {
    if (channel.id === currentChannel) {
      return (
        <li key={channel.id} className="nav-item w-100">
          <button
            type="button"
            id={channel.id}
            name={channel.name}
            className="w-100 rounded-0 text-start btn btn-primary">
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      );
    }
    return (
      <li key={channel.id} className="nav-item w-100">
        <button
          type="button"
          id={channel.id}
          name={channel.name}
          className="w-100 rounded-0 text-start btn">
          <span className="me-1">#</span>
          {channel.name}
        </button>
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
        <ul
          id="channels-box"
          ref={channelsList}
          onClick={onChannelClick}
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {showChannels}
        </ul>
      </div>
    </div>
  );
};

export default ChannelsBlock;
