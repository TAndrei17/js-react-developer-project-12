import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Mainpage } from './pages/mainpage';
import { Loginpage } from './pages/loginpage';
import { Notfoundpage } from './pages/notfoundpage';
import StatusContext from './context/index.js';

const statusState = {
  statusSession: 'inactive',
  // statusTwo: 'active',
};

const StatusProvider = ({children}) => {
  const { statusSession } = statusState;
  const [status, setStatus] = useState(statusSession);
  const setValid = () => setStatus(statusState.statusSession = 'active');
  const setInValid = () => setStatus(statusState.statusSession = 'inactive');

  return (
    <StatusContext.Provider value={{ statusState, status, setValid, setInValid }}>
      {children}
    </StatusContext.Provider>
  );
};


function App() {
    
  return (
    <StatusProvider>
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="*" element={<Notfoundpage />} />
    </Routes>
    </StatusProvider>
  );
}

export default App;
