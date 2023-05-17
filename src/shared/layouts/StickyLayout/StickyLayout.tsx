import React, { memo, ReactElement } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './StickyLayout.module.scss';

export interface StickyLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyLayout = memo((props: StickyLayoutProps) => {
  const { className, left, right, content } = props;

  return (
    <div className={classnames(classes.StickyLayout, {}, [className])}>
      {right && <div className={classes.left}>{left}</div>}
      <div className={classes.content}>{content}</div>
      {left && <div className={classes.right}>{right}</div>}
    </div>
  );
});
