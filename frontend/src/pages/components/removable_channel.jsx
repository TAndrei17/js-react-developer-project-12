import { useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../../slices/channelSlice.js';

import DeleteChannel from '../modalWindows/channel_delete';
import ChangeChannel from '../modalWindows/channel.change';

const RemovableChannel = (props) => {
  const dispatch = useDispatch();

  const onClickChooseChannel = (event) => {
    event.preventDefault();
    const { target } = event;
    // console.log(target);
    dispatch(currChannelActions.setChannel(Number(target.id)));
  };

  return (
    <div className="btn-group d-flex" role="group">
      <button
        id={props.id}
        type="button"
        className={props.classes1}
        name={props.name}
        onClick={onClickChooseChannel}>
        <span className="me-1">#</span>
        {props.name}
      </button>

      <button
        id={props.id}
        type="button"
        className={props.classes2}
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <span className="visually-hidden">
          Переключатель выпадающего списка
        </span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <DeleteChannel id={props.id} />
        </li>
        <li>
          <ChangeChannel id={props.id} name={props.name} />
        </li>
      </ul>
    </div>
  );
};

export default RemovableChannel;
