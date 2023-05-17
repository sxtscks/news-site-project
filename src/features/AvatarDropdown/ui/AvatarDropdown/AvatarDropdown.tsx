import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

export interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userAuthData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const shouldShowAdminPanel = isAdmin || isManager;

  if (!userAuthData) {
    return null;
  }

  const items = [
    ...(shouldShowAdminPanel
      ? [
          {
            content: t('Админка'),
            href: RoutePath.adminPanel,
          },
        ]
      : []),
    {
      content: t('Профиль'),
      href: generatePath(RoutePath.profile, { id: userAuthData.id }),
    },
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ];

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Dropdown
          direction="bottomLeft"
          className={classnames('', {}, [className])}
          items={items}
          trigger={<Avatar size={40} src={userAuthData.avatar} />}
        />
      }
      off={
        <DropdownDeprecated
          direction="bottomLeft"
          className={classnames('', {}, [className])}
          items={items}
          trigger={<AvatarDeprecated size={30} src={userAuthData.avatar} />}
        />
      }
    />
  );
});
