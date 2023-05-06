import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouteLogin = () => {
  const [userState] = useContext(UserContext);

  if (!userState.isLogin) {
    return <Navigate to={'/auth'} />;
  }

  return <Outlet />;
};

export const PrivateRouteUser = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.roles === 'admin') {
    return <Navigate to={'/'} />;
  }

  return <Outlet />;
};

export const PrivateRouteAdmin = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.roles !== 'admin') {
    return <Navigate to={'/auth'} />;
  }

  return <Outlet />;
};
