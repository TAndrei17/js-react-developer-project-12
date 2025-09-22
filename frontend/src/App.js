import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'react-toastify/dist/ReactToastify.min.css';

import MainPage from './pages/main_page.jsx';
import LoginPage from './pages/login_page.jsx';
import SignUpPage from './pages/signup_page.jsx';
import NotFoundPage from './pages/not_found_page.jsx';

import StatusProvider from './context/status_provider.js';
import RequireAuth from './hoc/RequireAuth.jsx';
import store from './slices/index.js';

// export const socket = io();
const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ENV || 'production',
};

/* eslint arrow-body-style: ["error", "as-needed"] */
/* eslint-env es6 */

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary errorMessage="Error in React render">
      <StatusProvider>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={(
                <RequireAuth>
                  <MainPage />
                </RequireAuth>
      )}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Provider>
      </StatusProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
