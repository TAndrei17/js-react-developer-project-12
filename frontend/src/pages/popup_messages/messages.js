import { toast } from 'react-toastify';
import i18next from '../../i18next.js';

const notifyCreateSuccess = () => toast.success(i18next.t('popupNotifications.channelCreated'));

const notifyRenameSuccess = () => toast.success(i18next.t('popupNotifications.channelRenamed'));

const notifyRemoveSuccess = () => toast.success(i18next.t('popupNotifications.channelRemoved'));

const notifyNoConnection = () => toast.error(i18next.t('popupNotifications.notConnected'));

export {
  notifyCreateSuccess,
  notifyRenameSuccess,
  notifyRemoveSuccess,
  notifyNoConnection,
};
