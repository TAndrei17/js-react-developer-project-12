import { useDispatch } from 'react-redux';
import { actions as currChannelActions } from '../../slices/channelSlice.js';
import { useTranslation } from 'react-i18next';

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

  return (
    <>
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
          <span className="visually-hidden">{t('switchList')}</span>
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
    </>
  );
};

export default RemovableChannel;
