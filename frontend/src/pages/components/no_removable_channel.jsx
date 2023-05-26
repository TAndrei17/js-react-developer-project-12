import { useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../../slices/channelSlice.js';

const NoRemovableChannel = (props) => {
  const dispatch = useDispatch();

  const onClickChooseChannel = (event) => {
    event.preventDefault();
    const { target } = event;
    // console.log(target);
    dispatch(currChannelActions.setChannel(Number(target.id)));
  };

  return (
    <>
      <button
        id={props.id}
        type="button"
        className={props.classes1}
        name={props.name}
        onClick={onClickChooseChannel}>
        <span className="me-1">#</span>
        {props.name}
      </button>
    </>
  );
};

export default NoRemovableChannel;
