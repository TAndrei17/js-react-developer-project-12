import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const auth = localStorage.hasOwnProperty('token');

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
