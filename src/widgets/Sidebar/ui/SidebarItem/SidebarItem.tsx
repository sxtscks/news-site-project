import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import classes from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/Items';

export interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const { path, text, Icon } = item;

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
