import React from 'react';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const sidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная страница',
    Icon: HomeIcon,
  },
  {
    path: RoutePath.about,
    text: 'О сайте',
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    Icon: ProfileIcon,
  },
];
