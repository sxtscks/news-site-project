import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles, UserRole } from 'entities/User';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface RequireAuthProps {
  children: JSX.Element,
  roles?: UserRole[];
}

export const RequireAuth = (props: RequireAuthProps) => {
  const { children, roles } = props;
  const auth = useSelector(getUserAuthData);
  const userRoles = useSelector(getUserRoles);
  const location = useLocation();

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some(((role) => userRoles?.includes((role))));
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }

  return children;
};
