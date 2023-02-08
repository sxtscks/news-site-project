import React, {FC, useState} from 'react';
import {classnames} from "shared/lib/classnames/classnames";
import classes from "./Sidebar.module.scss";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
import {LangSwitcher} from "widgets/LangSwitcher";

export interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({className}) => {

  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <div
      className={classnames(classes.sidebar, {[classes.collapsed]: collapsed}, [className])}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  )
}