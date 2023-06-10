import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CreateNewChannel from '../modal_windows/channel_create.jsx';
import ChannelsList from './channels_list.jsx';

const ChannelsBlock = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });
  const channels = useSelector((state) => {
    const getChannels = state.channelsReducer.ids.map(
      (id) => state.channelsReducer.entities[id]
    );
    return getChannels;
  });

  return (
    <>
      <div className="col-4 h-100 border border-1">
        <div className="row row-cols-3 h-auto mb-3 pt-1 pb-2">
          <h2 className="col-auto me-auto my-auto">
            <strong className="h5 text-primary p-0">{t('channels')}</strong>
          </h2>
          <CreateNewChannel className="col" />
        </div>
        <div className="row h-75">
          <ChannelsList channels={channels} className="overflow-auto" />
        </div>
      </div>
    </>
  );
};

export default ChannelsBlock;
