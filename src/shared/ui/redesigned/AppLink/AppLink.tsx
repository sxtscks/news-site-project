import React, { memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    className,
    to,
    children,
    variant = 'primary',
    activeClassName = '',
    ...otherProps
  } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        classnames(classes.link, { [activeClassName]: isActive }, [
          className,
          classes[variant],
        ])
      }
      to={to}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
