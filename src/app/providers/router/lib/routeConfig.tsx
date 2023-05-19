import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { SettingsPage } from '@/pages/SettingsPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
export enum AppRouter {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'articleDetails',
  ARTICLE_CREATE = 'articleCreate',
  ARTICLE_EDIT = 'articleEdit',
  ADMIN_PANEL = 'adminPanel',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'notFound',
  SETTINGS = 'settings',
}

export const RoutePath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: '/',
  [AppRouter.ABOUT]: '/about',
  [AppRouter.PROFILE]: '/profile/:id',
  [AppRouter.ARTICLES]: '/articles',
  [AppRouter.ARTICLE_DETAILS]: '/articles/:id',
  [AppRouter.ARTICLE_CREATE]: '/articles/new',
  [AppRouter.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRouter.ADMIN_PANEL]: '/adminPanel',
  [AppRouter.SETTINGS]: '/settings',
  [AppRouter.FORBIDDEN]: '/forbidden',
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
  [AppRouter.ARTICLE_EDIT]: {
    path: RoutePath.articleEdit,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRouter.SETTINGS]: {
    path: RoutePath.settings,
    element: <SettingsPage />,
    authOnly: true,
  },
  [AppRouter.ADMIN_PANEL]: {
    path: RoutePath.adminPanel,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },
  [AppRouter.FORBIDDEN]: {
    path: RoutePath.forbidden,
    element: <ForbiddenPage />,
  },
  [AppRouter.ARTICLE_CREATE]: {
    path: RoutePath.articleCreate,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRouter.NOT_FOUND]: {
    path: RoutePath.notFound,
    element: <NotFoundPage />,
  },
};

export const AppRouteByPathPattern: Record<string, AppRouter> = {
  [RoutePath.main]: AppRouter.MAIN,
  [RoutePath.about]: AppRouter.ABOUT,
  [RoutePath.profile]: AppRouter.PROFILE,
  [RoutePath.articles]: AppRouter.ARTICLES,
  [RoutePath.articleDetails]: AppRouter.ARTICLE_DETAILS,
  [RoutePath.articleEdit]: AppRouter.ARTICLE_EDIT,
  [RoutePath.settings]: AppRouter.SETTINGS,
  [RoutePath.adminPanel]: AppRouter.ADMIN_PANEL,
  [RoutePath.forbidden]: AppRouter.FORBIDDEN,
  [RoutePath.articleCreate]: AppRouter.ARTICLE_CREATE,
};
