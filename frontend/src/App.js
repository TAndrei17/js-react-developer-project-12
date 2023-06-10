import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'react-toastify/dist/ReactToastify.min.css';
// import logo from './logo.svg';
// import './App.css';

import { Mainpage } from './pages/main_page.jsx';
import { Loginpage } from './pages/login_page.jsx';
import { Signuppage } from './pages/signup_page.jsx';
import { Notfoundpage } from './pages/not_found_page.jsx';

import StatusProvider from './context/status_provider.js';
// import { statusState } from './context/index.js'

import RequireAuth from './hoc/RequireAuth.jsx';

import store from './slices/index.js';
import { io } from 'socket.io-client';

// for deploy on Railway
// export const socket = io('https://js-react-developer-project-12-production-1e82.up.railway.app/');

// for work on local machine
export const socket = io("ws://localhost:3000");

const rollbarConfig = {
  accessToken: '05b61881b3fa407493a725bbe6a1f084',
  environment: 'production',
};

function App() {

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <StatusProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={
                <RequireAuth>
                  <Mainpage />
                </RequireAuth>
              } />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/signup" element={<Signuppage />} /> 
              <Route path="*" element={<Notfoundpage />} />
            </Routes>
          </Provider>
        </StatusProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default App;
// export { statusState };
