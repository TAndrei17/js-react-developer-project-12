import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as currChannelActions } from '../../slices/channelSlice.js';

import DeleteChannel from '../modal_windows/channel_delete.jsx';
import ChangeChannel from '../modal_windows/channel_change.jsx';

const RemovableChannel = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'modalWindows' });

  const onClickChooseChannel = (event) => {
    event.preventDefault();
    const { target } = event;
    dispatch(currChannelActions.setChannel(Number(target.id)));
  };

  const {
    id,
    classes1,
    classes2,
    name,
  } = props;

  return (
    <div className="btn-group d-flex" role="group">
      <button
        id={id}
        type="button"
        className={classes1}
        name={name}
        onClick={onClickChooseChannel}
      >
        <span className="me-1">#</span>
        {name}
      </button>

      <button
        id={id}
        type="button"
        className={classes2}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden">{t('switchList')}</span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <DeleteChannel id={id} />
        </li>
        <li>
          <ChangeChannel id={id} name={name} />
        </li>
      </ul>
    </div>
  );
};

export default RemovableChannel;
