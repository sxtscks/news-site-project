import React, { ReactElement } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './MainLayout.module.scss';

export interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { className, header, toolbar, content, sidebar } = props;

  return (
    <div className={classnames(classes.MainLayout, {}, [className])}>
      <div className={classes.sidebar}>{sidebar}</div>
      <div className={classes.content}>{content}</div>
      <div className={classes.rightBar}>
        <div className={classes.header}>{header}</div>
        <div className={classes.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
};
