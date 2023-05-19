import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { LangSwitcher } from '@/widgets/LangSwitcher';
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { useGetSidebarItems } from '../../model/selectors/getSidebarItems';
import classes from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useGetSidebarItems();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <aside
          data-testid="sidebar"
          className={classnames(
            classes.sidebarRedesigned,
            { [classes.collapsedRedesigned]: collapsed },
            [className]
          )}
        >
          <AppLogo size={collapsed ? 30 : 50} className={classes.appLogo} />
          <VStack role="navigation" gap="8" className={classes.linksWrapper}>
            {sidebarItemsList.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </VStack>
          <Icon
            className={classes.button}
            dataTestId="sidebar-toggle"
            Svg={ArrowIcon}
            onClick={onToggle}
            clickable
          />
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid="sidebar"
          className={classnames(
            classes.sidebar,
            { [classes.collapsed]: collapsed },
            [className]
          )}
        >
          <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={classes.button}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role="navigation" gap="8" className={classes.linksWrapper}>
            {sidebarItemsList.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} />
            ))}
          </VStack>
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </aside>
      }
    />
  );
});
