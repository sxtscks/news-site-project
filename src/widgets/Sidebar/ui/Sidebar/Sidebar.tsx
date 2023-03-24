import React, { memo, useState } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import classes from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

export interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <menu
      data-testid="sidebar"
      className={
        classnames(
          classes.sidebar,
          { [classes.collapsed]: collapsed },
          [className],
        )
      }
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
      <div className={classes.linksWrapper}>
        {sidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </div>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </menu>
  );
});
