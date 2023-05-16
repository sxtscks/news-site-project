import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink/AppLink';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import classes from './SidebarItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

export interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const { path, text, Icon: ItemIcon, authOnly } = item;

  const isAuth = useSelector(getUserAuthData);

  if (authOnly && !isAuth) return null;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink
          to={path}
          className={classes.linkWrapper}
          activeClassName={classes.active}
        >
          <div
            className={
              !collapsed
                ? classes.linkItemRedesigned
                : classes.linkItemRedesignedCollapsed
            }
          >
            <Icon Svg={ItemIcon} className={!collapsed ? classes.icon : ''} />
            {!collapsed && <span>{t(text)}</span>}
          </div>
        </AppLink>
      }
      off={
        <AppLinkDeprecated theme={AppLinkTheme.SECONDARY} to={path}>
          <div className={classes.linkItem}>
            <ItemIcon className={classes.icon} />
            {!collapsed && <span>{t(text)}</span>}
          </div>
        </AppLinkDeprecated>
      }
    />
  );
});
