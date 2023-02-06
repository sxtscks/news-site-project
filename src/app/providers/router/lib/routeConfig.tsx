import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {AboutPage} from "pages/AboutPage";

export enum AppRouter {
  MAIN = 'main',
  ABOUT = 'about'
}

export const RoutePath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: '/',
  [AppRouter.ABOUT]: '/about'
}

export const routeConfig: Record<AppRouter, RouteProps> = {
  [AppRouter.MAIN]: {
    path: RoutePath.main,
    element: <MainPage/>
  },
  [AppRouter.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage/>
  },
}