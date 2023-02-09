import React, { FC, useState } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button } from 'shared/ui/Button/Button';
import classes from './Sidebar.module.scss';

export interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classnames(classes.sidebar, { [classes.collapsed]: collapsed }, [className])}
    >
      <Button onClick={onToggle}>toggle</Button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  );
};
