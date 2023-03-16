import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}
export enum AppRouter {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'articleDetails',
  NOT_FOUND = 'notFound'
}

export const RoutePath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: '/',
  [AppRouter.ABOUT]: '/about',
  [AppRouter.PROFILE]: '/profile',
  [AppRouter.ARTICLES]: '/articles',
  [AppRouter.ARTICLE_DETAILS]: '/articles/:id',
  [AppRouter.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRouter, AppRoutesProps> = {
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
    authOnly: true,
  },
  [AppRouter.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_DETAILS]: {
    path: RoutePath.articleDetails,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRouter.NOT_FOUND]: {
    path: RoutePath.notFound,
    element: <NotFoundPage />,
  },
};
