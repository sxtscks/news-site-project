import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';

export enum AppRouter {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOT_FOUND = 'notFound'
}

export const RoutePath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: '/',
  [AppRouter.ABOUT]: '/about',
  [AppRouter.PROFILE]: '/profile',
  [AppRouter.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRouter, RouteProps> = {
  [AppRouter.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRouter.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [AppRouter.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
  },
  [AppRouter.NOT_FOUND]: {
    path: RoutePath.notFound,
    element: <NotFoundPage />,
  },
};
