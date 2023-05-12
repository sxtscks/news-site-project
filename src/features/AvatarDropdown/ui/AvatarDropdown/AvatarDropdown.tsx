import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Dropdown } from '@/shared/ui/Popups';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';

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

  return (
    <Dropdown
      direction="bottomLeft"
      className={classnames('', {}, [className])}
      items={[
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
      ]}
      trigger={<Avatar size={30} src={userAuthData.avatar} />}
    />
  );
});
