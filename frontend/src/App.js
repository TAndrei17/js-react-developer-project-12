import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
// import logo from './logo.svg';
// import './App.css';

import { Mainpage } from './pages/mainpage';
import { Loginpage } from './pages/loginpage';
import { Notfoundpage } from './pages/notfoundpage';
import RequireAuth from './hoc/RequireAuth.jsx';
import StatusContext from './context/index.js';
import store from './slices/index.js';
import { io } from 'socket.io-client';


const statusState = {
  authorization: true,
  login: 'inactive',
};

const StatusProvider = ({children}) => {
  const { authorization, login } = statusState;
  const [session, setSession] = useState(login);
  const setActive = () => setSession(statusState.login = 'active');
  const setInactive = () => setSession(statusState.login = 'inactive');
  const [access, setAccess] = useState(authorization);
  const accessYes = () => setAccess(statusState.authorization = true);
  const accessNo = () => setAccess(statusState.authorization = false);
  const contextStatus = { statusState, session, setActive, setInactive, access, accessYes, accessNo };

  return (
    <StatusContext.Provider value={contextStatus}>
      {children}
    </StatusContext.Provider>
  );
};

export const socket = io("ws://localhost:3000");

function App() {

  return (
    <StatusProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Mainpage />
            </RequireAuth>
          } />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
      </Provider>
    </StatusProvider>
  );
}

export default App;
