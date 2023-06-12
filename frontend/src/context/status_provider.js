import { useState } from 'react';

import StatusContext, { statusState } from './index.js';

/* eslint-disable */
const StatusProvider = ({ children }) => {
  const { authorization, login, lng } = statusState;

  const [access, setAccess] = useState(authorization);
  const accessYes = () => setAccess(statusState.authorization = true);
  const accessNo = () => setAccess(statusState.authorization = false);

  const [session, setSession] = useState(login);
  const setActive = () => setSession(statusState.login = 'active');
  const setInactive = () => setSession(statusState.login = 'inactive');

  const [language, setLanguage] = useState(lng);
  const setRu = () => setLanguage(statusState.lng = 'ru');
  const setEn = () => setLanguage(statusState.lng = 'en');
  const setSp = () => setLanguage(statusState.lng = 'sp');

  const contextStatus = {
    statusState,
    access,
    accessYes,
    accessNo,
    session,
    setActive,
    setInactive,
    language,
    setRu,
    setEn,
    setSp,
  };

  return (
    <StatusContext.Provider value={contextStatus}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
