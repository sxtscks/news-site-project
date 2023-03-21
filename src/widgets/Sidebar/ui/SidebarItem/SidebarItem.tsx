import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';
import classes from './SidebarItem.module.scss';

export interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const {
    path, text, Icon, authOnly,
  } = item;

  const isAuth = useSelector(getUserAuthData);

  if (authOnly && !isAuth) return null;

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={path}
    >
      <div className={classes.linkItem}>
        <Icon className={classes.icon} />
        {!collapsed
            && (
              <span>
                {t(text)}
              </span>
            )}
      </div>
    </AppLink>
  );
});
