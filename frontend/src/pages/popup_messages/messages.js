import { toast } from 'react-toastify';
import i18next from '../../i18next.js';

const notifyCreateSuccess = () => toast.success(i18next.t('popupNotifications.channelCreated'));

const notifyCreateError = () => toast.error(i18next.t('popupNotifications.channelNoCreated'));

const notifyRenameSuccess = () => toast.success(i18next.t('popupNotifications.channelRenamed'));

const notifyRenameError = () => toast.error(i18next.t('popupNotifications.channelNoRenamed'));

const notifyRemoveSuccess = () => toast.success(i18next.t('popupNotifications.channelRemoved'));

const notifyRemovedError = () => toast.error(i18next.t('popupNotifications.channelNoRemoved'));

const notifyNoConnection = () => toast.error(i18next.t('popupNotifications.notConnected'));


export { 
  notifyCreateSuccess, 
  notifyCreateError, 
  notifyRenameSuccess, 
  notifyRenameError,
  notifyRemoveSuccess, 
  notifyRemovedError,
  notifyNoConnection,
};