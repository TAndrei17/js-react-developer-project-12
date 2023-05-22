import { useSelector, useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../slices/channelSlice.js';
import CreateNewChannel from './modalWindows/newchannel.jsx';
import cn from 'classnames';

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

  const onClickChooseChannel = (event) => {
    event.preventDefault();
    const { target } = event;
    dispatch(currChannelActions.setChannel(Number(target.id)));
  };

  let controlState = false;
  // ерунда какая-то - найди упражение на замену класса
  const stateControl = () => {
    return controlState === false
      ? (controlState = true)
      : (controlState = false);
  };

  const classShow = cn('dropdown-menu', {
    show: controlState,
  });

  // aria-expanded="false" должно меняться на true тоже
  const showChannels = channels.map((channel) => {
    if (channel.id === currentChannel) {
      return (
        <li key={channel.id} className="nav-item active w-100">
          <div className="d-flex dropdown btn-group" role="group">
            <button
              type="button"
              id={channel.id}
              name={channel.name}
              className="w-100 rounded-0 text-start btn btn-primary">
              <span className="me-1">#</span>
              {channel.name}
            </button>

            <button
              type="button"
              className="btn btn-primary dropdown-toggle dropdown-toggle-split"
              id="dropdownMenuReference"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-reference="parent"
              onClick={() => stateControl()}>
              <span class="visually-hidden">
                Переключатель выпадающего списка
              </span>
            </button>
            <ul className={classShow}>
              <li>
                <button className="dropdown-item">Удалить</button>
              </li>
              <li>
                <button className="dropdown-item">Изменить</button>
              </li>
            </ul>
          </div>
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
        <CreateNewChannel />
        <ul
          id="channels-box"
          onClick={onClickChooseChannel}
          className="nav nav-pills nav-fill px-2 mb-2 overflow-auto h-100 d-block">
          {showChannels}
        </ul>
      </div>
    </div>
  );
};

export default ChannelsBlock;
