import { ReactElement } from 'react';
import { AppRouter } from '@/app/providers/router/lib/routeConfig';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export const useAppToolbar = () => {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRouter, ReactElement | undefined> =
    {
      [AppRouter.ARTICLES]: <ScrollToolbar />,
      [AppRouter.ARTICLE_DETAILS]: <ScrollToolbar />,
      [AppRouter.MAIN]: undefined,
      [AppRouter.ABOUT]: undefined,
    };

  return toolbarByAppRoute[appRoute];
};
