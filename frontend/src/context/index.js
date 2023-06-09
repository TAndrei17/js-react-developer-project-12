import { createContext } from 'react';

const StatusContext = createContext({
    statusState: {},
});

const statusState = {
    authorization: true,
    login: 'inactive',
    lng: 'ru',
    user: '',
  };

export default StatusContext;
export { statusState };