import React, {FC} from 'react';
import {classnames} from "shared/lib/classnames/classnames";
import classes from './Navbar.module.scss'
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({className}) => {
  return (
    <div className={classnames(classes.navbar, {}, [className])}>
      <div className={classes.linkWrapper}>
        <AppLink theme={AppLinkTheme.SECONDARY} to='/'>Главная</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to='/about'>О сайте</AppLink>
      </div>
    </div>
  )
}