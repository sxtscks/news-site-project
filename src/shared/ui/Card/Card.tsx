import React, { HTMLAttributes, memo, ReactNode } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode
}

export const Card = memo((props: CardProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      className={classnames(classes.Card, {}, [className])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
