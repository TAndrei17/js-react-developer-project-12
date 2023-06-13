import axios from 'axios';

const getData = async () => {
  const { data } = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });

  const normalizeData = {
    allChannels: {},
    allMessages: {},
    data: data.currentChannelId,
  };

  data.channels.forEach((channel) => {
    const { allChannels } = normalizeData;
    const nameProperty = `channel${channel.id}`;
    allChannels[nameProperty] = channel;
  });

  data.messages.forEach((message) => {
    const { allMessages } = normalizeData;
    const nameProperty = `message${message.id}`;
    allMessages[nameProperty] = message;
  });

  return normalizeData;
};

export default getData;
