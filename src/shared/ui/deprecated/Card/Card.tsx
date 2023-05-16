import React, { HTMLAttributes, memo, ReactNode } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullWidth?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    theme = CardTheme.NORMAL,
    fullWidth,
    ...otherProps
  } = props;

  return (
    <div
      className={classnames(classes.Card, { [classes.fullWidth]: fullWidth }, [
        className,
        classes[theme],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
