import React, { FC } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => (
  <div className={classnames(classes.navbar, {}, [className])}>
    <div className={classes.linkWrapper} />
  </div>
);
