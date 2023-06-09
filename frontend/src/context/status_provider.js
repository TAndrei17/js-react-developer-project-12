import { useState } from 'react';

import StatusContext from './index.js';
import { statusState } from './index.js';

const StatusProvider = ({children}) => {
    const { authorization, login, lng, user } = statusState;
  
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

    const [activeUser, setUser] = useState(user);
    const setNewUser = () => setUser(statusState.user = localStorage.username);
    const removeUser = () => setUser(statusState.user = '');
    
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
      activeUser,
      setNewUser,
      removeUser,
    };
  
    return (
      <StatusContext.Provider value={contextStatus}>
        {children}
      </StatusContext.Provider>
    );
  };

  export default StatusProvider;
  