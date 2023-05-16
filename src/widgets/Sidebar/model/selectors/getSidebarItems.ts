import { createSelector } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import HomeIconDeprecated from '@/shared/assets/icons/main.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      text: 'Главная страница',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => HomeIconDeprecated,
        on: () => MainIcon,
      }),
    },
    {
      path: RoutePath.about,
      text: 'О сайте',
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: generatePath(RoutePath.profile, { id: userData.id }),
        text: 'Профиль',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: 'Статьи',
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ArticleIcon,
        }),
        authOnly: true,
      }
    );
  }
  return sidebarItemsList;
});
