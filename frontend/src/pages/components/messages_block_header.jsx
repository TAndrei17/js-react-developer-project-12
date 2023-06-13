import { useTranslation } from 'react-i18next';

const MessagesBlockHeader = (props) => {
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });
  const { id, channels, messages } = props;

  /* eslint no-param-reassign: */
  const getCurrentChannelName = channels.reduce((acc, channel) => {
    if (channel.id === id) {
      acc = channel.name;
    }
    return acc;
  }, '');

  const showCurrentChannel = `# ${getCurrentChannelName}`;

  const getMessagesNumber = messages.filter(
    (message) => message.channelId === id,
  );

  const showMessagesNumber = `${t('message', {
    count: getMessagesNumber.length,
  })}`;

  return (
    <div className="col-12 h-auto py-2 text-primary shadow">
      <span className="h6">{showCurrentChannel}</span>
      <br />
      <span>{showMessagesNumber}</span>
    </div>
  );
};

export default MessagesBlockHeader;
