import { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, profile } = useContext(AuthContext);

  if (admin && profile.role !== 'admin') return <Redirect to='/' />

  return isAuthenticated ? (
    <Route {...rest} render={() => <Component />} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { next: pathname } }} />
  );
};

export default ProtectedRoute;
