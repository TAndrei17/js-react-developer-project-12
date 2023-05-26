import { useSelector, useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../../slices/channelSlice.js';
import cn from 'classnames';

import RemovableChannel from './removable_channel.jsx';
import NoRemovableChannel from './no_removable_channel.jsx';

const ChannelsList = (props) => {
  const dispatch = useDispatch();

  const currentChannel = useSelector(
    (state) => state.channelReducer.currentChannel
  );

  const onClickChooseChannel = (event) => {
    event.preventDefault();
    const { target } = event;
    // console.log(target);
    dispatch(currChannelActions.setChannel(Number(target.id)));
  };

  return (
    <>
      <ul
        id="channels-box"
        className="nav nav-pills nav-fill px-2 mb-2 d-block overflow-auto"
        onClick={onClickChooseChannel}>
        {props.channels.map((channel) => {
          const setClasses1 = cn('btn', 'rounded-0', 'w-100', 'text-start', {
            active: channel.id === currentChannel,
            'btn-primary': channel.id === currentChannel,
          });
          const setClasses2 = cn(
            'btn',
            'dropdown-toggle',
            'dropdown-toggle-split',
            {
              'btn-primary': channel.id === currentChannel,
            }
          );

          if (channel.id === currentChannel && channel.removable === false) {
            return (
              <li key={channel.id} className="col nav-item w-100">
                <NoRemovableChannel
                  id={channel.id}
                  name={channel.name}
                  classes1={setClasses1}
                  classes2={setClasses2}
                />
              </li>
            );
          }

          if (channel.id === currentChannel && channel.removable === true) {
            return (
              <li key={channel.id} className="col nav-item w-100">
                <RemovableChannel
                  id={channel.id}
                  name={channel.name}
                  classes1={setClasses1}
                  classes2={setClasses2}
                />
              </li>
            );
          }
          if (channel.removable === true) {
            return (
              <li key={channel.id} className="col nav-item w-100">
                <RemovableChannel
                  id={channel.id}
                  name={channel.name}
                  classes1={setClasses1}
                  classes2={setClasses2}
                />
              </li>
            );
          }

          return (
            <li key={channel.id} className="col nav-item w-100">
              <NoRemovableChannel
                id={channel.id}
                name={channel.name}
                classes1={setClasses1}
                classes2={setClasses2}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChannelsList;
