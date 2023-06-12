import { useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../../slices/channelSlice.js';

const NoRemovableChannel = (props) => {
  const dispatch = useDispatch();

  const onClickChooseChannel = (event) => {
    event.preventDefault();
    const { target } = event;
    dispatch(currChannelActions.setChannel(Number(target.id)));
  };

  const { id, classes1, name } = props;

  return (
    <>
      <button
        id={id}
        type="button"
        className={classes1}
        name={name}
        onClick={onClickChooseChannel}>
        <span className="me-1">#</span>
        {name}
      </button>
    </>
  );
};

export default NoRemovableChannel;
