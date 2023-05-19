import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  AppRouteByPathPattern,
  AppRouter,
} from '@/app/providers/router/lib/routeConfig';

export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<AppRouter>(AppRouter.MAIN);

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
}
