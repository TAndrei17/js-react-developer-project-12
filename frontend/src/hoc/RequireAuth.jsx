import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const auth = Object.prototype.hasOwnProperty.call(localStorage, 'token');

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
