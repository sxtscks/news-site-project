import { createSelector } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import AboutIcon from '@/shared/assets/icons/about.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
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
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          path: generatePath(RoutePath.profile, { id: userData.id }),
          text: 'Профиль',
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          text: 'Статьи',
          Icon: ProfileIcon,
          authOnly: true,
        },
      );
    }
    return sidebarItemsList;
  },
);
