import React, { HTMLAttributes, memo, ReactNode } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined'
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
  const {
    className, children, theme = CardTheme.NORMAL, ...otherProps
  } = props;

  return (
    <div
      className={classnames(classes.Card, {}, [className, classes[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
